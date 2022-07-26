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
import contracts from '../src/constants/contracts';
import * as abi from '../src/constants/interfaces/Jackpot.json';
import {useContract, useSigner, useAccount, useEnsName, useNetwork} from 'wagmi';



//needs to be refactored
//hooks should be done here and passed as props for more specific rendering
const Jackpot: NextPage = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const contract = useContract({
        addressOrName: contracts[4].Jackpot, 
        contractInterface: abi.result,
        signerOrProvider: signer,
    });

    const {data} = useAccount()
    return(
        <div className={styles.jackpotcontainer}>
            <SpinWheel 
                chainInfo={useNetwork()}
                address={data?.address}
                ens={useEnsName({address: data?.address})} 
                contract={contract}
            />
            <div className={styles.jackpotrecent}>
                <JackpotRecent 
                    chainInfo={useNetwork()}
                    contract={contract}
                    />
            </div>
        </div>
    )

};

export default Jackpot