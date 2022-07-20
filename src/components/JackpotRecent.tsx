import styles from '../../styles/Home.module.css';
export const JackpotRecent = (props) => {
    const symbol = props.chainInfo.activeChain?.nativeCurrency?.symbol
    const data = {};
    const fetchData = () => {

    };

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