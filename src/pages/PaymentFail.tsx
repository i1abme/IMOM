import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFail = () => {
  const navigate = useNavigate();
  useEffect(() => {
    alert("결제에 실패했습니다.");
    navigate(`/`);
  }, []);

  return <div>결제 실패</div>;
};
export default PaymentFail;
