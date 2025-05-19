import { useRecoilValue } from "recoil"
import { modeatom } from "../store/mode"

export default function Guid(){

    const mode = useRecoilValue(modeatom)

    return (<div className="flex items-center py-4">
        <div className={`${mode === "light" ? "text-black" : "text-white"} text-2xl font-bold`}>Tax Harvesting</div>
        <div className="text-blue-600 underline pl-4 cursor-pointer">How it works?</div>
    </div>)
}