/*
    Make Wheel recognize client window with dynamic rendering 
*/
import { useState } from "react";
import dynamic from "next/dynamic";
const Wheel = dynamic(
    () => import('react-custom-roulette').then(mod => mod.Wheel),
    { ssr: false }
);
import {useNetwork} from 'wagmi';

export const SpinWheel = (props) => {
    const [data, setData] = useState([{option: undefined, style: {textColor: "#666699"}}])
    const [depositAmount, setDepositAmount] = useState(0);
    const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, '');
        setDepositAmount(parseInt(result) || 0);
    };

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);


    /*Send ether to jackpot contract*/
    const deposit = () => {
        setPrizeNumber(prizeNumber + depositAmount)
        if (data[0].option == undefined) {
            setData([{option: props.ens.data || props.address.substring(0,9)}])
        } else {
            setData([...data, {option: props.ens.data || props.address.substring(0,9)}]);
        }
        setMustSpin(true)
    }

    return (
        <div>
            <h2>Jackpot Total: {prizeNumber} {props.chainInfo.activeChain?.nativeCurrency?.symbol}</h2>
             <>
            <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={0} //this sets the winner of the spin
            fontSize={16}
            data={data}
            radiusLineColor={"#666699"}
            backgroundColors={['#666699', '#3385ff']}
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