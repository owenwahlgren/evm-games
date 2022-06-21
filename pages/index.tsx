import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactSmartScroller } from 'react-smart-scroller'
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const domains = ['games', 'gg'];


  return (
    <div className={styles.container}>
      <Head>
        <title>evm.games</title>
        <meta
          name="description"
          content="P2P Smart Contract games on EVM blockchains"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
        evm.
         <div className={styles.scrollingbox}>
          <ul>
            <li>games</li>
            <li>gg</li>
            <li>games</li>
            <li>gg</li>
            <li>games</li>
          </ul>
         </div>
        </div>
        <ConnectButton />
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
