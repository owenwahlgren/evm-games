// import type { NextPage } from 'next';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic'
const SpinWheel = dynamic(
    () => import('../src/components/SpinWheel').then(mod => mod.SpinWheel),
    { ssr: false }
);

const JackpotRecent = dynamic(
    () => import('../src/components/JackpotRecent').then(mod => mod.JackpotRecent),
    { ssr: false }
);
import styles from '../styles/Home.module.css';
import {useAccount, useEnsName, useNetwork} from 'wagmi';


const Jackpot: NextPage = () => {
    const {data} = useAccount()
    return(
        <div className={styles.jackpotcontainer}>
            <SpinWheel 
                chainInfo={useNetwork()}
                address={data?.address}
                ens={useEnsName({address: data?.address})}
            />
            <div className={styles.jackpotrecent}>
                <JackpotRecent chainInfo={useNetwork()}/>
            </div>
        </div>
    )

};

export default Jackpot