import { Prices, ReservationInfo } from "./product";
import { User } from "./user";

export type PriceInfoData = {
  adult: {
    count: number;
    price: number;
    totalPrice: number;
  };
  child: {
    count: number;
    price: number;
    totalPrice: number;
  };
  infant: {
    count: number;
    price: number;
    totalPrice: number;
  };
  totalPay: number;
  totalCount: number;
};

export type ReservationBoxProps = {
  prices: Prices[];
  maxCount: number;
  nowCount: number;
  info: ReservationInfo;
  productState: string;
  viewSize?: string;
};

export interface travelerInfo {
  travelerName: string;
  enFirstName: string;
  enLastName: string;
  gender: string;
  birth: string;
  phoneNumber: string;
  representative: boolean;
}

export interface TermsState {
  travel: boolean;
  refund: boolean;
  privacy: boolean;
  identification: boolean;
  thirdperson: boolean;
  marketing: boolean;
}

export interface TravelerInfoFormProps {
  priceInfo: PriceInfoData;
  age: "adult" | "child" | "infant";
  role: string;
  travelerId: string;
  isRepresentative: boolean;
  handleTravelerInfo: (
    travelerId: string,
    info: travelerInfo | string,
    category?: keyof travelerInfo
  ) => void;
  startDate: string;
  userInfo?: User;
  handleChangeSort: (
    id: string,
    newCategory: string,
    newAge: "adult" | "child" | "infant",
    currentAge: "adult" | "child" | "infant"
  ) => void;
}
