import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import {useAccount, useEnsName, useNetwork} from 'wagmi';
import dynamic from 'next/dynamic'
const Stat = dynamic(
    () => import('../src/components/Stat').then(mod => mod.Stat),
    { ssr: false }
);
const Stats: NextPage = () => {
    return (
        <div className={styles.stats}>
            <Stat chainInfo={useNetwork()}/>
        </div>
    );
};

export default Stats