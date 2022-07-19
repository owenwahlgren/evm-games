import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../../styles/Home.module.css';
export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navlinks}>
                <ul>
                    <li className={styles.navitem}>
                        <a href="/">Home</a>
                    </li>
                    <li className={styles.navitem}>
                        <a>Play</a>
                        <ul>
                            <li><a href="/jackpot">Jackpot</a></li>
                            <li><a href="/coinflip">Coinflip</a></li>
                            <li><a href="/blackjack">Blackjack</a></li>
                            <li><a href="/connectfour">Connect-four</a></li>
                        </ul>
                    </li>
                    <li className={styles.navitem}>
                        <a href="/stats">Stats</a>
                    </li>
                </ul>
            </div>
            <ConnectButton/>
        </div>
    )
}