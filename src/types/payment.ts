import { travelerInfo } from "./reservation";

export interface PaymentData {
  ordereId: string;
  amount: number;
  paymentKey: string;
  productId: number;
  adultCount: number;
  childCount: number;
  infantCount: number;
  totalCount: number;
  totalPrice: number;
  travelerInfoList: travelerInfo[];
}
