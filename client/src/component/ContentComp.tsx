import { useRecoilValue } from "recoil"
import { modeatom } from "../store/mode"
import Holding from "./HoldingCard"
import Harvest from "./HarvestCardComp"
import Guid from "./GuideComp"
import Disclaimer from "./DisclimerComp"

const preharvest = {
  "short-term": {
    "profit": "$ 1,540",
    "loss": "$ 1,200",
    "netGain": "$ 340"
  },
  "long-term": {
    "profit": "-$ 743",
    "loss": "-$ 650",
    "netGain": "-$ 93"
  },
  "RealisedCG": "$ 1,337",
  "save": {
    "status" : false,
    "amount" : ""
  }
};

const postharvest = {
  "short-term": {
    "profit": "$ 1,540",
    "loss": "$ 1,200",
    "netGain": "$ 340"
  },
  "long-term": {
    "profit": "-$ 2,343",
    "loss": "-$ 3,650",
    "netGain": "$ 1,307"
  },
  "RealisedCG": "$ 2,343",
  "save": {
    "status" : true,
    "amount" : "$ 862"
  }
};


export default function Content(){

    const mode = useRecoilValue(modeatom)

    return(<div className={`${mode === 'light' ? "bg-blue-50" : "bg-black"} flex flex-col items-center`}>
        <div className="w-11/12 ">
            <div>
                <Guid />
            </div>
            <div>
                <Disclaimer />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              
                    <Harvest data={preharvest} cngColour={true} name={"Pre Harvesting"}/>
                
                    <Harvest data={postharvest} cngColour={false} name={"After Harvesting"}/>
                
            </div>
            <div className={`${mode === 'light' ? "bg-white" : "bg-gray-800"} w-full shadow-lg rounded-b-md mb-6`}>
                <Holding />
            </div>
        </div>
    </div>)
}