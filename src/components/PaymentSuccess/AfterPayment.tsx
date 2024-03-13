import { useSearchParams } from "react-router-dom";
import usePostDeposit from "../../queries/orders/usePostDeposit";
import { useEffect } from "react";

const AfterPayment = () => {
  const [searchParams] = useSearchParams();
  const paymentData = searchParams.get("paymentData");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const reqData = paymentData
    ? JSON.parse(decodeURIComponent(paymentData))
    : {};

  const req = paymentKey &&
    amount && {
      ...reqData,
      paymentKey: paymentKey,
      amount: amount,
    };

  const { mutate, data, isPending, isError, error } = usePostDeposit(req);

  useEffect(() => {
    // reqData가 준비되었는지 확인 후 mutate 함수 호출
    if (paymentKey && amount) {
      console.log(paymentKey);
      mutate();
    }
  }, [mutate, paymentKey, amount]);

  if (isPending) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return <div>에러 발생: {error?.message} </div>;
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  return <div>결제성공</div>;
};
export default AfterPayment;
