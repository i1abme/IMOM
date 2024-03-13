import { useEffect, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { PriceInfoData, travelerInfo } from "../../types/reservation";

const Payment = ({
  travelerInfoList,
  priceInfo,
  productId,
  orderId,
  marketing,
}: // price,
{
  travelerInfoList?: travelerInfo[];
  priceInfo: PriceInfoData;
  productId: number;
  orderId?: string;
  marketing?: boolean;
  // price?: number;
}) => {
  const [paymentWidgetLoaded, setPaymentWidgetLoaded] = useState(false);

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  const clientKey = import.meta.env.VITE_TOSS_CLIENTKEY; // 브라우저에서 결제창 연동을 위한 키 env파일에 넣어둘것
  const customerKey = `IMON_USER_${new Date().getTime()}`; // 고유번호로 만들것

  const depositPaymentData = {
    orderId: orderId
      ? orderId
      : `IMOM_PI${productId}_DT${new Date().getTime()}`,
    productId: `${productId}`,
    adultCount: priceInfo && priceInfo["성인"].count,
    childCount: priceInfo && priceInfo["아동"].count,
    infantCount: priceInfo && priceInfo["유아"].count,
    totalCount: priceInfo && priceInfo.totalCount,
    totalPrice: priceInfo && priceInfo.totalPay,
    travelerInfoList: travelerInfoList,
    amount: priceInfo && priceInfo.totalPay / 10,
    marketing: marketing && marketing,
  };
  console.log(depositPaymentData);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(
        import.meta.env.VITE_TOSS_CLIENTKEY,
        `IMON_USER_${new Date().getTime()}`
      );

      paymentWidget.renderPaymentMethods(
        "#payment-widget",
        depositPaymentData.amount
      );

      paymentWidgetRef.current = paymentWidget;
      setPaymentWidgetLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientKey, customerKey, priceInfo]);

  return (
    <div className="w-[650px] h-full py-[100px] flex flex-col justify-center text-sub-black">
      <h1 className="text-center text-[20px] pb-[20px]">
        결제 금액 {depositPaymentData.amount}원
      </h1>
      <div id="payment-widget" />
      {paymentWidgetLoaded && (
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;
            try {
              await paymentWidget?.requestPayment({
                orderId: depositPaymentData.orderId,
                orderName: "토스 티셔츠 외 2건",
                customerName: "김토스",
                customerEmail: "customer123@gmail.com",
                successUrl: `http://localhost:3000/reservation/success?orderId=${orderId}&paymentData=${encodeURIComponent(
                  JSON.stringify(depositPaymentData)
                )}`,
                failUrl: `${window.location.origin}/fail`,
              });
            } catch (err) {
              console.log(err);
            }
          }}
          className="px-[50px] py-[10px] bg-main-color rounded-[9px] text-white flex self-center"
        >
          결제하기
        </button>
      )}
    </div>
  );
};
export default Payment;
