import { useNavigate, useParams } from "react-router-dom";
import AfterPayment from "../components/PaymentSuccess/AfterPayment";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "fail") {
      alert("결제에 실패했습니다.");
      navigate(`/`);
    }
  }, [id, navigate]);

  if (id === "success") return <AfterPayment />;
};
export default PaymentSuccess;
