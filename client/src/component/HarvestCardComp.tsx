import { useRecoilValue } from "recoil"
import { modeatom } from "../store/mode"

type data = {
    "short-term": {
        profit: string;
        loss: string;
        netGain: string;
    };
    "long-term": {
        profit: string;
        loss: string;
        netGain: string;
    };
    RealisedCG: string;
    save: {
        status: boolean;
        amount: string;
    };
}

export default function Harvest(props : {
    data : data,
    cngColour : boolean,
    name : string
}){

    const mode = useRecoilValue(modeatom)

    return(<div className={`${!props.cngColour ? "bg-blue-500 text-white" : mode === "light" ? "bg-white text-black" : "bg-gray-800 text-white" } grid grid-cols-3 items-center p-3 rounded-md mt-2 mb-4 font-medium gap-y-1`}>
        <div className="col-span-3 text-xl font-bold">{props.name}</div>
        <div></div>
        <div className="text-base ">Short-term</div>
        <div className="text-base ">Long-term</div>
        <div className="">Profits</div>
        <div>{props.data["short-term"].profit}</div>
        <div>{props.data["long-term"].profit}</div>
        <div>Losses</div>
        <div>{props.data["short-term"].loss}</div>
        <div>{props.data["long-term"].loss}</div>
        <div>Net Capital Gains</div>
        <div>{props.data["short-term"].netGain}</div>
        <div>{props.data["long-term"].netGain}</div>
        <div className="col-span-3 pt-3 font-bold text-xl">Effective Capital Gain:{props.data.RealisedCG}</div>
        {props.data.save.status ? <div className="col-span-3">🎉 You are going to save upto {props.data.save.amount}</div> : <div></div>}
    </div>)
}