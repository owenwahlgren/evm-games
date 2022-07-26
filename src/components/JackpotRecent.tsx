import styles from '../../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { Contract } from 'ethers';
export const JackpotRecent = (props) => {
    const symbol = props.chainInfo.activeChain?.nativeCurrency?.symbol

    const [players, setPlayers] = useState({})
    const [totalTickets, setTotalTickets] = useState(0);
    useEffect(() => {
        async function fetchJackpotRecent(contract: Contract) {
            let currPlayers = {};
            const currTotalTickets = contract.totalTickets();
            if (currTotalTickets > totalTickets) {setTotalTickets(currTotalTickets);}
            for(let i = 0; i < totalTickets; i++) {
                const address = await contract.jackpotTickets(i);
                if (currPlayers[address] != undefined) {
                    currPlayers[address] += 1;
                } else {currPlayers[address] = 1;}
            }

            if (currPlayers != players) {setPlayers(currPlayers);}

        }

        // fetchJackpotRecent(props.contract);
    }, [props.contract, players, totalTickets])


    return (
        <table>
            <tr className={styles.jackpotrecentheader}>
                <th>Address</th>
                <th>Amount</th>
            </tr>
            <tr>
                <td>0x5DBECd1c34ac99288E5403856b7CAD4F5B48994A</td>
                <td>.5 {symbol}</td>
            </tr>
            <tr>
                <td>0x0Ba5887ad7Cf939A3eD4F45EE4aB63813b3f855a</td>
                <td>.2 {symbol}</td>
            </tr>
        </table>
    );
}