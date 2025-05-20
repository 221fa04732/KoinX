import { useState, useMemo } from "react";
import { modeatom } from "../store/mode";
import { useRecoilState, useRecoilValue } from "recoil";
import { harvestdataAtom } from "../store/HarvestData";

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

type HarvestData = {
  "short-term": {
    profit: number;
    loss: number;
  };
  "long-term": {
    profit: number;
    loss: number;
  }
};

export default function Coin({ data }: { data: CoinHolding[] }) {


  const [hasMore, setHasMOre] = useState<boolean>(true)
  let holdingData : CoinHolding[] = []
  if(hasMore){
    holdingData.push(...data.slice(0,5))
  }
  else{
    holdingData = data;
  }

  const mode = useRecoilValue(modeatom); 
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(new Set());
  const allCoins = useMemo(() => holdingData.map((item) => item.coin), [holdingData]);
  const [harvestData, setHarvestData] = useRecoilState<HarvestData>(harvestdataAtom)
  

  const allSelected = useMemo(
    () => allCoins.length > 0 && allCoins.every((coin) => selectedCoins.has(coin)),
    [allCoins, selectedCoins]
  );

  const toggleAll = () => {
    setSelectedCoins(() => {
      if (allSelected) return new Set();
      return new Set(allCoins);
    });
  };

  const toggleSelection = (coin: string) => {
    setSelectedCoins((prev) => {
      const newSet = new Set(prev);
      newSet.has(coin) ? newSet.delete(coin) : newSet.add(coin);
      return newSet;
    });
  };

  const getGainColor = (gain: number) =>
    gain >= 0 ? "text-green-600" : "text-red-600";

  const isDark = mode === "dark";

  return (
    <div className="w-full overflow-x-auto custom-scrollbar px-4">
      <div className="min-w-[1024px] w-full flex flex-col divide-y"
        style={{ borderColor: isDark ? "#374151" : "#D1D5DB" }} >
      <div className={`${mode==='light' ? "text-black" : "text-white"} pt-2 pb-3 font-bold text-xl`}>Holdings</div>
        <div
          className={`flex items-center px-4 py-3 font-semibold text-sm rounded-md border ${isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-700"}`}>
          <div className="flex items-center gap-3 flex-[2] min-w-[200px]">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={()=>{
                toggleAll()
                
                if(!allSelected){
                  
                  let sortTermLoss= 0;
                  let sortTermProfit = 0;
                  let longTermLoss = 0;
                  let longTermProfit = 0;

                  holdingData.map((item : CoinHolding)=>{
                    sortTermLoss += item.stcg.balance
                    sortTermProfit += item.stcg.gain
                    longTermLoss += item.ltcg.balance
                    longTermProfit += item.ltcg.gain
                  })
                      setHarvestData({
                        "short-term":{
                          "profit": sortTermProfit,
                          "loss" : sortTermLoss
                        },
                        "long-term" : {
                          "profit" : longTermProfit,
                          "loss" : longTermLoss
                        }
                      })
                    }
                    else{
                      setHarvestData({
                        "short-term":{
                          "profit": 0,
                          "loss" : 0
                        },
                        "long-term":{
                          "profit" : 0,
                          "loss" : 0
                        }
                      })
                    }
                }}
              className={`h-4 w-4 ${isDark ? "accent-blue-400" : "accent-blue-600"}`}
              aria-label="Select All"
            />
            <span>Asset</span>
          </div>
          <div className="flex-1 text-right">Holding / Market Rate</div>
          <div className="flex-1 text-right">Total Value</div>
          <div className="flex-1 text-right">STCG</div>
          <div className="flex-1 text-right">LTCG</div>
          <div className="flex-1 text-right">Amount to Sell</div>
        </div>

        {holdingData.length === 0 ? <div className="w-full h-24 flex justify-center items-center text-red-500">
          <div className="">
            Server Error!
          </div>
        </div> : 
        holdingData.map((item) => {
          const isSelected = selectedCoins.has(item.coin);
          const sellPrice = item.totalHolding * item.currentPrice;

          return (
            <div
              key={item.coin+item.coinName}
              className={`flex items-center px-4 py-4 transition ${isDark ? "hover:bg-blue-950" : "hover:bg-blue-100"}`}>
              <div className="flex items-center gap-3 flex-[2] min-w-[200px]">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={isSelected}
                  onChange={() => {
                    toggleSelection(item.coin) 
                    if(isSelected){
                      setHarvestData({
                        "short-term":{
                          "profit": harvestData["short-term"].profit - item.stcg.gain,
                          "loss" : harvestData["short-term"].loss - item.stcg.balance
                        },
                        "long-term" : {
                          "profit" : harvestData["long-term"].profit - item.ltcg.gain,
                          "loss" : harvestData["long-term"].loss - item.ltcg.balance,
                        }
                      })
                    }
                    else{
                      setHarvestData({
                        "short-term":{
                          "profit": item.stcg.gain + harvestData["short-term"].profit,
                          "loss" : item.stcg.balance + harvestData["short-term"].loss
                        },
                        "long-term":{
                          "profit" : item.ltcg.gain + harvestData["long-term"].profit,
                          "loss" : item.ltcg.balance + harvestData["long-term"].loss,
                        }
                      })
                    }
                  }}
                  aria-label={`Select ${item.coinName}`}/>
                <img
                  src={item.logo}
                  alt={`${item.coinName} logo`}
                  className="w-6 h-6 rounded-full"/>
                <div>
                  <div className={`text-sm font-semibold ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                    {item.coinName}
                  </div>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.coin}</div>
                </div>
              </div>

              <div className={`flex-1 text-right text-sm flex flex-col items-end ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                <div>{item.totalHolding.toFixed(2)} {item.coin}</div>
                <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  ${item.currentPrice.toFixed(2)}
                </div>
              </div>

              <div className={`flex-1 text-right text-sm font-medium ${isDark ? "text-gray-100" : "text-gray-900"}`}>
                ${(item.totalHolding * item.currentPrice).toFixed(2)}
              </div>

              <div className="flex-1 text-right text-sm">
                <div className={`${getGainColor(item.stcg.gain)} font-semibold`}>
                  {item.stcg.gain.toFixed(2)}%
                </div>
                <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  ${item.stcg.balance.toFixed(2)}
                </div>
              </div>

              <div className="flex-1 text-right text-sm">
                <div className={`${getGainColor(item.ltcg.gain)} font-semibold`}>
                  {item.ltcg.gain.toFixed(2)}%
                </div>
                <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  ${item.ltcg.balance.toFixed(2)}
                </div>
              </div>

              <div className={`flex-1 text-right font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                {isSelected ? `${sellPrice.toFixed(2)} ${item.coin}` : "-"}
              </div>
            </div>
          );
        })}
        <div className="w-full flex justify-start">
          <button className="underline ml-3 text-blue-600 text-sm mt-1 mb-2" onClick={()=>{
            setHasMOre(!hasMore)
          }}>{hasMore ? "View All": "Hide"}</button>
        </div>
      </div>
    </div>
  );
}
