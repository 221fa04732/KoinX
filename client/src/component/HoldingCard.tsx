import axios from 'axios'
import { Holdatom } from '../store/Hold'
import { useRecoilState } from 'recoil'
import { useEffect, useState } from 'react'
import { config } from '../config'
import { HoaldingLoader } from './HoldingLoader'
import Coin from './CoinCard'

type CoinHolding = {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: {
    balance: number;
    gain: number;
  };
  ltcg: {
    balance: number;
    gain: number;
  };
};

export default function Holding(){

    const [hold, setHold] = useRecoilState<boolean>(Holdatom)
    const [holdingData, setHoldingData]= useState<CoinHolding[]>([])

    useEffect(()=>{
        setHold(true)
        const upcommingData = async()=>{
            try{
                const response = await axios.get(`${config.BACKEND_URL}/holding`)
    
                if(response){
                    setHoldingData(response.data.response)
                }
            }
            catch(e){
                console.log("An error occured")
            }
            finally{
                setHold(false)
            }
        }

        upcommingData();

    }, [])


    if(hold){
        return(<HoaldingLoader />)
    }

    return (<div className='overflow-x-scroll'>
        <Coin holdingData={holdingData} />
    </div>)
        
}