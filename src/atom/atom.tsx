import { atom } from "recoil";

interface SocialType {
  userName: string;
  email: string;
  gender: string;
  birth: string;
  phoneNumber: string;
  socialType: string;
}

export const tagFetchState = atom({
  key: "tagFetchState",
  default: false,
});

export const saveState = atom({
  key: "saveState",
  default: "",
});

export const loginCheck = atom({
  key: "loginCheck",
  default: () => {
    const storedToken = window.localStorage.getItem("token");
    return storedToken ? true : false;
  },
});

export const socialData = atom<SocialType | null>({
  key: "socialData",
  default: null,
});
