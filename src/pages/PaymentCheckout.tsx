import { useEffect, useRef, useState } from "react";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { amountFormat } from "../utils/amountFormat";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";

const PaymentCheckout = () => {
  const location = useLocation();
  const paymentInfo = location.state;
  const [paymentWidgetLoaded, setPaymentWidgetLoaded] = useState(false);

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  const payFor = "productId" in paymentInfo ? "deposit" : "balance";

  const orderId = `IMOM_PI${paymentInfo.productId}_DT${new Date().getTime()}`;

  console.log(paymentInfo);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(
        import.meta.env.VITE_TOSS_CLIENTKEY, // clientkey
        `IMON_USER_${new Date().getTime()}` // custromerKey
      );

      paymentWidget.renderPaymentMethods(
        "#payment-widget",
        +paymentInfo.amount
      );

      paymentWidgetRef.current = paymentWidget;
      setPaymentWidgetLoaded(true);
      sessionStorage.setItem(
        "paymentInfo",
        CryptoJS.AES.encrypt(
          JSON.stringify(paymentInfo),
          import.meta.env.VITE_TOSS_CLIENTKEY
        ).toString()
      ); // 세션스토리지에 여행자 정보를 암호화해서 저장
    })();
  }, [paymentInfo]);

  return (
    <div className="w-[650px] h-full py-[100px] flex flex-col justify-center text-sub-black">
      <h1 className="text-center text-[20px] pb-[20px]">
        결제 금액 {amountFormat(+paymentInfo.amount)}원
      </h1>
      <div id="payment-widget" />
      {paymentWidgetLoaded && (
        <button
          onClick={async () => {
            const paymentWidget = paymentWidgetRef.current;
            try {
              await paymentWidget?.requestPayment({
                orderId: orderId,
                orderName: "토스 티셔츠 외 2건",
                customerName: "김토스",
                customerEmail: "customer123@gmail.com",
                successUrl: `${window.location.href}/success?payFor=${payFor}`,
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
export default PaymentCheckout;
