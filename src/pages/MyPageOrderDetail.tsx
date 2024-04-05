import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetUserOrderInfo from "../queries/orders/useGetUserOrderInfo";
import CategoryBtns from "../components/common/CategoryBtns";
import { ORDER_DETAIL_CATEGORIES } from "../constants/managerdata";
import OrderedAmount from "../components/common/Order/OrderedAmount";
import OrderInfo from "../components/common/Order/OrderInfo";
import PaymentInfo from "../components/common/Order/PaymentInfo";
import { useRecoilValue } from "recoil";
import { viewSize } from "../atom/atom";

const MyPageOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const viewSizeState = useRecoilValue(viewSize);

  const { data, isError } = useGetUserOrderInfo(orderId ?? "");

  const [showInfo, setShowInfo] = useState("orderInfo");

  const [idList, setIdList] = useState<string[] | []>([]);

  const handleShowInfo = (id: string) => {
    setShowInfo(id);
  };

  useEffect(() => {
    if (data) {
      setIdList(data.orderNumberList);
    }
  }, [data]);

  const handlePayment = () => {
    navigate("/paymentcheckout", {
      state: {
        paymentInfo: {
          orderId: "",
          amount: data?.balance,
          paymentKey: "",
          imomOrderId: data?.imomOrderId,
        },
        tossPaymentInfo: {
          email: data?.email,
          userName: data?.reserveUser,
          packageName: data?.packageName,
        },
      },
    });
  };

  if (isError) {
    return <div>정보를 불러올 수 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-10 w-full mr-20 mb-50 mt-[60px]">
      {viewSizeState === "web" && (
        <CategoryBtns
          category={ORDER_DETAIL_CATEGORIES}
          handleClick={handleShowInfo}
          active={showInfo}
          divStyle="!justify-start gap-[40px] w-full"
        />
      )}
      <OrderedAmount
        totalPrice={data?.totalPrice}
        payedPrice={data?.payedPrice}
        balance={data?.balance}
        role={"user"}
        handlePayment={handlePayment}
      />
      {viewSizeState === "mobile" && (
        <CategoryBtns
          category={ORDER_DETAIL_CATEGORIES}
          handleClick={handleShowInfo}
          active={showInfo}
          divStyle="!justify-start gap-[40px] w-full"
        />
      )}
      {showInfo === "orderInfo" && data ? (
        <OrderInfo data={data} role={"user"} />
      ) : (
        <PaymentInfo idList={idList} role="user" />
      )}

      <div className="h-[60px]" />
    </div>
  );
};

export default MyPageOrderDetail;
