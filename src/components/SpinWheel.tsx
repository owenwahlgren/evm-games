/*
    Make Wheel recognize client window with dynamic rendering 
*/
// import dynamic from "next/dynamic";
// const Wheel = dynamic(
//     () => import('react-custom-roulette').then(mod => mod.Wheel),
//     { ssr: false }
// );
import { Wheel } from "react-custom-roulette";
import { useState, useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import { BigNumber, Contract } from "ethers";
import { useEnsName } from 'wagmi'
import { utils } from "ethers";
import { parse } from "node:path/win32";


export const SpinWheel = (props) => {
    const [waitingSpin, setWaitingSpin] = useState(false);
    const [time, setTime] = useState(new Date())
    const [gameId, setGameId] = useState(0);
    const [gameInfo, setGameInfo] = useState({
        amount: BigNumber,
        timeBegin: BigNumber,
        timeEnd: BigNumber,
        active: Boolean,
        winner: String
    })
    const [jackpotData, setData] = useState([{option: undefined}])

    useEffect((): void => {
        async function fetchId(contract: Contract): Promise<void> {
            const id = parseInt(await contract.currGameId());
            if (gameId != id) { setGameId(id)}
        }
        if (!props.contract.provider) { return; }
        fetchId(props.contract);
    }, [props.contract, gameId]);

    useEffect((): void => {
        async function fetchGameInfo(contract: Contract): Promise<void> {
            const currInfo = await contract.history(gameId);
            if(gameInfo.timeEnd != currInfo.timeEnd) {
                const newTime = new Date(currInfo.timeEnd * 1000);
                if (newTime <= new Date(Date.now())) {setWaitingSpin(true)}
                setTime(new Date(currInfo.timeEnd * 1000));
                setGameInfo(currInfo);
            }
            
        }
        if (!props.contract.provider) { return; }
        fetchGameInfo(props.contract);
    }, [props.contract, gameInfo, gameId]);

    useEffect((): void => {
        async function fetchDeposits(contract: Contract): Promise<void> {
            const amountTickets = parseInt(await contract.totalTickets());
            let players = []
            for(let i = 0; i < amountTickets; i++) {
                const address = await contract.jackpotTickets(i);
                players.push({option: address.substring(0,9)})
            }
            if (players.length != jackpotData.length) {setData(players)}
        }
        if (!props.contract.provider) { return; }
        fetchDeposits(props.contract);
    }, [props.contract, jackpotData]);
   

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
      } = useTimer({ expiryTimestamp: time, autoStart: false});
      
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
            <h3>{gameInfo.amount / 10e17} {props.chainInfo.activeChain?.nativeCurrency?.symbol}</h3>
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