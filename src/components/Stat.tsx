import styles from '../../styles/Home.module.css';
export const Stat = (props) => {
    const symbol = props.chainInfo.activeChain?.nativeCurrency?.symbol;
    return(
        <h3 className={styles.tvp}>TVP: {0} {symbol}</h3>
    );
}