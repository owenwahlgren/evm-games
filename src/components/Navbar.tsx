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
                            <li><a href="/jackpot"><i class="bi bi-cash-stack"></i> Jackpot</a></li>
                            <li><a href="/coinflip"><i class="bi bi-coin"></i> Coinflip</a></li>
                            <li><a href="/blackjack"><i class="bi bi-suit-club-fill"></i> Blackjack</a></li>
                            <li><a href="/connectfour"><i class="bi bi-4-square"></i> Connect Four</a></li>
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