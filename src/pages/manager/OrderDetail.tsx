import { useParams } from "react-router-dom";
import useGetOrderDetail from "../../queries/orders/useGetOrderDetail";
import CategoryBtns from "../../components/common/CategoryBtns";
import { ORDER_DETAIL_CATEGORIES } from "../../constants/managerdata";
import { useEffect, useState } from "react";
import OrderInfo from "../../components/common/Order/OrderInfo";
import PaymentInfo from "../../components/common/Order/PaymentInfo";
import OrderedAmount from "../../components/common/Order/OrderedAmount";

const OrderDetail = () => {
  const { id } = useParams();

  const { data, isError } = useGetOrderDetail(id ?? "");

  const [showInfo, setShowInfo] = useState("orderInfo");

  const [idList, setIdList] = useState<string[] | []>([]);

  const [changeHistory, setChangeHistory] = useState([
    {
      changedPrice: 0,
      memo: "",
      payedPrice: 0,
      totalPriceSnapshot: 0,
      balanceSnapshot: 0,
      updateDate: "",
    },
  ]);

  const handleShowInfo = (id: string) => {
    setShowInfo(id);
  };

  useEffect(() => {
    if (data) {
      setIdList(data.orderNumberList);
      if (data.fluctuationInfos) setChangeHistory(data.fluctuationInfos);
    }
  }, [data]);

  if (isError) {
    return <div>정보를 불러올 수 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-10 w-full mr-20 mb-50 mt-[60px] pr-10">
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
        role={"admin"}
      />
      {showInfo === "orderInfo" && data ? (
        <OrderInfo data={data} role={"admin"} />
      ) : (
        <PaymentInfo
          idList={idList}
          role={"admin"}
          changeHistory={changeHistory}
        />
      )}

      <div className="h-[60px]" />
    </div>
  );
};

export default OrderDetail;
