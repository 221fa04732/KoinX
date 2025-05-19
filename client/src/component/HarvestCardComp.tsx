import { useRecoilState, useRecoilValue } from "recoil"
import { modeatom } from "../store/mode"
import HarvestCardLoader from "./HarvestLoader"
import { harvestatom } from "../store/harvest"
import { useEffect, useState } from "react" 
import { config } from "../config"
import axios from "axios"
import { harvestdataAtom } from "../store/HarvestData"


type CapitalGainsData = {
  capitalGains: {
    stcg: {
      profits: number;
      losses: number;
    };
    ltcg: {
      profits: number;
      losses: number;
    };
  };
};


export default function Harvest(props : {
    cngColour : boolean,
    name : string
}){

    const mode = useRecoilValue(modeatom)
    const [harvest, setHarvest]= useRecoilState<boolean>(harvestatom)
    const [harvestData, setHarvestData] = useState<CapitalGainsData>({
        capitalGains: {
            stcg: {
                profits: 0,
                losses: 0,
            },
            ltcg: {
                profits: 0,
                losses: 0,
            },
        },
    })
    const harvestData2 = useRecoilValue(harvestdataAtom)

    useEffect(()=>{
        setHarvest(true)
        const upcommingData = async()=>{
            try{
                const response = await axios.get(`${config.BACKEND_URL}/capitalGain`)
    
                if(response){
                    setHarvestData(response.data.response)
                }
            }
            catch(e){
                console.log("An error occured")
            }
            finally{
                setHarvest(false)
            }
        }

        upcommingData();

    }, [])


    if(harvest){
        return(<HarvestCardLoader cngColour={props.cngColour} />)
    }

    const sortTermProfit = (harvestData.capitalGains.stcg.profits + harvestData2["short-term"].profit);
    const sortTermLoss = harvestData.capitalGains.stcg.losses + harvestData2["short-term"].loss;
    const longTermProfit = harvestData.capitalGains.ltcg.profits + harvestData2["long-term"].profit;
    const longTermLoss = harvestData.capitalGains.ltcg.losses + harvestData2["long-term"].loss;

    return(<div className={`${!props.cngColour ? "bg-blue-500 text-white" : mode === "light" ? "bg-white text-black" : "bg-gray-800 text-white" } grid grid-cols-3 items-center p-3 rounded-md mt-2 mb-4 font-medium gap-y-1`}>
        <div className="col-span-3 text-xl font-bold">{props.name}</div>
        <div></div>
        <div className="text-base ">Short-term</div>
        <div className="text-base ">Long-term</div>
        <div className="">Profits</div>
        <div>$ {sortTermProfit.toFixed(2)}</div>
        <div>$ {longTermProfit.toFixed(2)}</div>
        <div>Losses</div>
        <div>-$ {sortTermLoss.toFixed(2)}</div>
        <div>-$ {longTermLoss.toFixed(2)}</div>
        <div>Net Capital Gains</div>
        <div>$ {(sortTermProfit - sortTermLoss).toFixed(2)}</div>
        <div>$ {(longTermProfit - longTermLoss).toFixed(2)}</div>
        <div className="col-span-3 pt-3 font-bold text-xl">Effective Capital Gain:$ {(sortTermProfit - sortTermLoss + longTermProfit - longTermLoss).toFixed(2)}</div>
        {props.name === "After Harvesting" ? <div className="col-span-3">🎉 You are going to save upto $ 862</div> : <div></div>}
    </div>)
}