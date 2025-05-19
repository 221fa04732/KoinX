import { useRecoilValue } from "recoil";
import { modeatom } from "../store/mode";

const HarvestCardLoader = (props :{
    cngColour : boolean
}) => {
  const mode = useRecoilValue(modeatom); 

  const containerClasses = `${
    !props.cngColour ? "bg-blue-500": 
    mode === "light"
      ? "bg-white text-black"
      : "bg-gray-800 text-white"
  } grid grid-cols-3 items-center p-3 rounded-md mt-2 mb-4 font-medium gap-y-1 animate-pulse h-[225px]`;

  return (
    <div className={containerClasses}>
      <div className="col-span-3 h-6 rounded w-1/4 mb-1"></div>

      <div></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-20"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-20"></div>

      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-20"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-14"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-14"></div>

      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-20"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-14"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-14"></div>

      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-32"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-14"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-300 rounded w-14"></div>

      <div className="col-span-3 pt-2 h-6 bg-gray-300 dark:bg-gray-300 rounded w-1/2"></div>
      <div className="col-span-3 h-5 bg-gray-300 dark:bg-gray-300 rounded w-2/3"></div>
    </div>
  );
};

export default HarvestCardLoader;
