import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetUserOrderInfo from "../queries/orders/useGetUserOrderInfo";
import CategoryBtns from "../components/TravelDetail/CategoryBtns";
import { ORDER_DETAIL_CATEGORIES } from "../constants/managerdata";
import OrderedAmount from "../components/common/Order/OrderedAmount";
import OrderInfo from "../components/Manager/orderDetail/OrderInfo";
import PaymentInfo from "../components/Manager/orderDetail/PaymentInfo";

const OrderConfirm = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const navigate = useNavigate();

  const { data, isError } = useGetUserOrderInfo(orderId ?? "");

  console.log(data);

  const [showInfo, setShowInfo] = useState("orderInfo");

  const [idList, setIdList] = useState<string[] | []>([]);

  const handleShowInfo = (id: string) => {
    setShowInfo(id);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setIdList(data.orderNumberList);
      console.log(data.orderNumberList);
    }
  }, [data]);

  const handlePayment = () => {
    navigate("/paymentcheckout", {
      state: {
        orderId: "",
        amount: data?.balance,
        paymentKey: "",
        imomOrderId: data?.imomOrderId,
      },
    });
  };

  if (isError) {
    return <div>정보를 불러올 수 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-10 w-full mr-20 mb-50 mt-[60px]">
      <CategoryBtns
        category={ORDER_DETAIL_CATEGORIES}
        handleClick={handleShowInfo}
        active={showInfo}
        divStyle="!justify-start gap-[40px] w-full"
      />
      <OrderedAmount
        totalPrice={data?.totalPrice}
        payedPrice={data?.payedPrice}
        balance={data?.balance}
        role={"user"}
        handlePayment={handlePayment}
      />
      {showInfo === "orderInfo" && data ? (
        <OrderInfo data={data} role={"user"} />
      ) : (
        <PaymentInfo idList={idList} />
      )}

      <div className="h-[60px]" />
    </div>
  );
};

export default OrderConfirm;
