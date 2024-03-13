import { atom } from "recoil";

export const tagFetchState = atom({
  key: "tagFetchState",
  default: false,
});

export const saveState = atom({
  key: "saveState",
  default: "",
});
