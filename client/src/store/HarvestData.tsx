import { atom } from "recoil";

type Data = {
  "short-term": {
    profit: number;
    loss: number;
  };
  "long-term": {
    profit: number;
    loss: number;
  }
};

export const harvestdataAtom = atom<Data>({
  key: "harvestdataAtom",
  default: {
    "short-term": {
      profit: 0,
      loss: 0,
    },
    "long-term": {
      profit: 0,
      loss: 0,
    },
  },
});
