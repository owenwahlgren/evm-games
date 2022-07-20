/*
    Make Wheel recognize client window with dynamic rendering 
*/
import dynamic from "next/dynamic";
const Wheel = dynamic(
    () => import('react-custom-roulette').then(mod => mod.Wheel),
    { ssr: false }
);
import { useState } from "react";
import { useTimer } from 'react-timer-hook';

export const SpinWheel = (props) => {
    
    //for test
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10); // 15 seconds timer
    //

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
      } = useTimer({ expiryTimestamp: time, autoStart: true, onExpire: () =>  setMustSpin(true)});
      
    const [data, setData] = useState([{option: undefined, style: {textColor: "#666699"}}])
    const [depositAmount, setDepositAmount] = useState(0);
    const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
        setDepositAmount(parseInt(result) || 0);
    };

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);


    /*Send ether to jackpot contract, update state*/
    const deposit = () => {
        setPrizeNumber(prizeNumber + depositAmount)
        if (data[0].option == undefined) {
            setData([{option: props.ens.data || props.address.substring(0,9)}])
        } else {
            setData([...data, {option: props.ens.data || props.address.substring(0,9)}]);
        }
    }

    return (
        <div>
            <h3>Jackpot Total: {prizeNumber} {props.chainInfo.activeChain?.nativeCurrency?.symbol}</h3>
            <div style={{fontSize: "2em"}}>
                <span>{minutes}</span>:<span>{seconds}s</span>
            </div>
             <>
            <Wheel
            radiusLineWidth={1}
            outerBorderWidth={0}
            mustStartSpinning={mustSpin}
            prizeNumber={0} //this sets the winner of the spin
            fontSize={16}
            data={data}
            radiusLineColor={"black"}
            backgroundColors={['#666699', '#3385ff', '#66ff99', '#ff5c33']}
            textColors={['#ffffff']}
            onStopSpinning={undefined} //when spin is complete check winner and prompt for claim
            />
        </>
        <div>
            <input
                type="text"
                placeholder={props.chainInfo.activeChain?.nativeCurrency?.symbol}
                onChange={handleChange}
            />
            <button onClick={deposit}>Deposit</button>
        </div>
        </div>
    )
}