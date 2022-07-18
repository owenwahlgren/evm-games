import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../../styles/Home.module.css';
export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navlinks}>
                <ul>
                    <li className={styles.navitem}>
                        <a>Home</a>
                    </li>
                    <li className={styles.navitem}>
                        <a>Games</a>
                        <ul>
                            <li><a href="#">Coin flip</a></li>
                            <li><a href="#">Blackjack</a></li>
                            <li><a href="#">Connect-four</a></li>
                        </ul>
                    </li>
                    <li className={styles.navitem}>
                        <a>Account</a>
                    </li>
                </ul>
            </div>
            <ConnectButton/>
        </div>
    )
}