import { useRecoilState } from "recoil"
import { modeatom } from "../store/mode"

export default function Header(){

    const [mode, setMode] = useRecoilState<string>(modeatom)

    return(<div className={`h-72px w-full  flex justify-center ${mode === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <div className="w-11/12 flex items-center justify-between">
            <img src="icon2.png" alt="KoinX" className="h-24px w-96px"/>
            <button onClick={()=>{
                mode === 'light' ? setMode('dark') : setMode('light')
            }}>{mode === 'light' ? <img src="dark.png" /> : <img src="light.png"/> }</button>
        </div>
    </div>)
}