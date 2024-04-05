import { useNavigate, useSearchParams } from "react-router-dom";
import usePostDeposit from "../../queries/orders/usePostDeposit";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { PaymentData } from "../../types/payment";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const payFor = searchParams.get("payFor");

  const storedPaymentInfo = sessionStorage.getItem("paymentInfo");
  const encryptedData = storedPaymentInfo
    ? JSON.parse(
        CryptoJS.AES.decrypt(
          storedPaymentInfo,
          import.meta.env.VITE_TOSS_CLIENTKEY
        ).toString(CryptoJS.enc.Utf8)
      )
    : null;

  const [requestData, setRequestData] = useState<PaymentData | null>(null);

  const [progress, setProgress] = useState(1);

  const { mutate, data, isPending, isError, errorReason } = usePostDeposit(
    requestData,
    payFor
  );

  useEffect(() => {
    // reqData가 준비되었는지 확인 후 mutate 함수 호출
    if (paymentKey && amount && orderId && encryptedData) {
      setRequestData({
        ...encryptedData,
        paymentKey: paymentKey,
        amount: amount,
        orderId: orderId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentKey, amount, orderId]);

  useEffect(() => {
    if (requestData && payFor) {
      mutate();
    }
  }, [requestData, mutate, payFor]);

  useEffect(() => {
    sessionStorage.removeItem("paymentInfo"); // 결제 후 유저 정보 지우기
    if (data) {
      alert(
        "예약해주셔서 감사합니다. 담당자가 영업일 기준 1일 이내로 연락드리겠습니다."
      );
      navigate("/");
    }
    if (isError) {
      alert(errorReason !== null ? errorReason : "결제에 실패했습니다.");
      navigate("/");
    }
  }, [data, isError, errorReason, navigate]);

  useEffect(() => {
    history.pushState(null, "", "");

    const handleClickBrowserBackBtn = () => {
      if (progress <= 1) {
        setProgress((prev) => prev + 1);
      } else {
        navigate(+1);
      }
    };

    window.addEventListener("popstate", handleClickBrowserBackBtn);

    return () => {
      window.removeEventListener("popstate", handleClickBrowserBackBtn);
    };
  }, [progress, navigate]);

  if (isPending) {
    return <div>예약 처리중...</div>;
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  if (data) {
    return <div>결제성공</div>;
  }
};
export default PaymentSuccess;
