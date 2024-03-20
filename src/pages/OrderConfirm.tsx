import { useState } from "react";
// import ManagerTitle from "../components/Manager/ManagerTitle";
// import OrderTable from "../components/MyPage/OrderTable";
import { useParams } from "react-router-dom";
import useGetUserOrderInfo from "../queries/orders/useGetUserOrderInfo";

const OrderConfirm = () => {
  const { orderId } = useParams();
  const [orderConfirm] = useState([]);
  console.log(orderConfirm);

  const { data, isPending, isError, error } = useGetUserOrderInfo(
    orderId ?? ""
  );
  console.log(data, isPending, isError, error);

  return (
    <div className="w-full">
      {/* <div>
        <ManagerTitle title="주문 확인" />
        {orderHeader.map((el, idx) => (
          <OrderTable title={el} content={orderContent[idx]} />
        ))}
      </div>
      <div>
        <ManagerTitle title="결제 확인" />
        <OrderTable title="예약금액/잔금" content="123,456원" />
      </div>
      <div>
        <ManagerTitle title="여행자 정보" />
        {orderInfo.map((el, idx) => (
          <OrderTable title={el} content={orderInfoContent[idx]} />
        ))}
      </div> */}
    </div>
  );
};

export default OrderConfirm;
