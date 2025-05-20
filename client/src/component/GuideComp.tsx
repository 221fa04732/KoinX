import { useRecoilValue } from "recoil"
import { modeatom } from "../store/mode"

export default function Guid() {
    const mode = useRecoilValue(modeatom)

    return (
        <div className="flex items-center py-4 relative">
            <div className={`${mode === "light" ? "text-black" : "text-white"} text-2xl font-bold`}>
                Tax Harvesting
            </div>

            <div className="flex flex-col justify-start items-center relative group">
                <div className="text-blue-600 underline pl-4 cursor-pointer">
                    How it works?
                </div>

                <div className={`absolute top-full mt-2 z-20 hidden group-hover:block ${mode === "light" ? "bg-gray-800 text-white" : "bg-white text-black"} p-4 shadow-lg rounded w-96`}>
                    Hii My name is Mrityunjay Kumar, I am a passoniate software developer currently purshing B.Tech in computer science and engineering. <span className="text-blue-600 underline">Know More</span>
                </div>
            </div>
        </div>
    )
}
