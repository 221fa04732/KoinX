import { useRecoilValue } from "recoil"
import { modeatom } from "../store/mode"
import Holding from "./HoldingCard"
import Harvest from "./HarvestCardComp"
import Guid from "./GuideComp"
import Disclaimer from "./DisclimerComp"


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
              
                    <Harvest cngColour={true} name={"Pre Harvesting"}/>
                
                    <Harvest cngColour={false} name={"After Harvesting"}/>
                
            </div>
            <div className={`${mode === 'light' ? "bg-white" : "bg-gray-800"} w-full shadow-lg rounded-md mb-6`}>
                <Holding />
            </div>
        </div>
    </div>)
}