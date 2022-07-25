/*
    Make Wheel recognize client window with dynamic rendering 
*/
import dynamic from "next/dynamic";
const Wheel = dynamic(
    () => import('react-custom-roulette').then(mod => mod.Wheel),
    { ssr: false }
);
import { useState, useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import { Contract } from "ethers";
import { useEnsName } from 'wagmi'
import { utils } from "ethers";


export const SpinWheel = (props) => {
   
    const [waitingSpin, setWaitingSpin] = useState(false);
    const [time, setTime] = useState(new Date())
    const [prizeNumber, setPrizeNumber] = useState(0.0);
    const [gameId, setGameId] = useState(0);
    const [jackpotData, setData] = useState([{option: undefined, style: {textColor: "#666699"}}])

    useEffect((): void => {
        if (!props.contract) {
            return;
        }
        async function fetchJackpot(contract: Contract) {
            // try {
                const id = await contract.currGameId();
                if(gameId != id) {setGameId(parseInt(id));}

                const gameInfo = await contract.history(id);
                const newTime = new Date(gameInfo.timeEnd * 1000);
                if(newTime <= new Date(Date.now())) {setWaitingSpin(true)}
                if (time != newTime) {setTime(newTime);}
                

                const newAmount = parseFloat(gameInfo.amount) / 10e17;
                if (prizeNumber != newAmount) { setPrizeNumber(newAmount);}
   
                let players = []
                let ticketCount = parseInt(await contract.totalTickets());
                for (let i = 0; i < ticketCount; i++ ) {
                    const address = await contract.jackpotTickets(i);
                    // const ensData = useEnsName({address: player})
                    players.push({option: address.substring(0, 9)});
                }
                if (players.length > 0) {
                    setData(players);
                }
            // }
            // catch(error){}
        }
        fetchJackpot(props.contract);
    }, [props.contract, jackpotData, time, prizeNumber]);
   

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp: time, autoStart: false, onExpire: () =>  setMustSpin(true)});
      
    const [depositAmount, setDepositAmount] = useState(0.0);
    const handleChange = (event) => {
        setDepositAmount(parseFloat(event.target.value));
    };

    const [mustSpin, setMustSpin] = useState(false);

    const deposit = async () => {
        await props.contract.deposit({value: utils.parseEther(depositAmount.toString())});
    }

    const spin = async () => {
        await props.contract.spin();
    }

    return (
        <div>
            <h3>game id: {gameId}</h3>
            <h3>{prizeNumber} {props.chainInfo.activeChain?.nativeCurrency?.symbol}</h3>
            <div style={{fontSize: "2em"}}>
                <span>{minutes}</span>:<span>{seconds}s</span>
            </div>
            {waitingSpin == true && <button onClick={spin}>waiting for spin!</button> }
             <>
                <Wheel
                radiusLineWidth={1}
                outerBorderWidth={0}
                mustStartSpinning={mustSpin}
                prizeNumber={0} //this sets the winner of the spin
                fontSize={16}
                data={jackpotData}
                radiusLineColor={"black"}
                backgroundColors={['#666699', '#3385ff', '#66ff99', '#ff5c33']}
                textColors={['#ffffff']}
                onStopSpinning={undefined} //when spin is complete check winner and prompt for claim
                />
            </>
            <div>
                <input
                    type="number" 
                    step="0.01"
                    placeholder={props.chainInfo.activeChain?.nativeCurrency?.symbol}
                    onChange={handleChange}
                />
                <button onClick={deposit}>Deposit</button>
            </div>
        </div>
    )
}