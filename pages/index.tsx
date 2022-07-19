import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
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
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made by owen.eth
        </a>
      </footer>
    </div>
  );
};

export default Home;
