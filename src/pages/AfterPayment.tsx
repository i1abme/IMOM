import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PaymentSuccess from "../components/AfterPayment/PaymentSuccess";

const AfterPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "fail") {
      alert("결제에 실패했습니다.");
      sessionStorage.removeItem("paymentInfo"); // 결제 관련 유저 정보 지우기
      navigate(`/`);
    }
  }, [id, navigate]);
  if (id === "fail") return <div>결제 실패</div>;
  if (id === "success") return <PaymentSuccess />;
};
export default AfterPayment;
