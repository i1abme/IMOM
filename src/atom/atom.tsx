import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface SocialType {
  userName: string;
  email: string;
  gender: string;
  birth: string;
  phoneNumber: string;
  socialType: string;
}

const { persistAtom } = recoilPersist();

export const loginCheck = atom({
  key: "loginCheck",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
export const tagFetchState = atom({
  key: "tagFetchState",
  default: false,
});

export const saveState = atom({
  key: "saveState",
  default: "",
});

export const socialData = atom<SocialType | null>({
  key: "socialData",
  default: null,
});

export const userChildName = atom({
  key: "userChildName",
  default: "우리",
});
