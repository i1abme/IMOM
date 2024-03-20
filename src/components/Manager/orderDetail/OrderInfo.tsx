import { useEffect, useState } from "react";
import {
  COUNT_CATEGORIES,
  ORDER_INFO_CATEGORIES,
} from "../../../constants/managerdata";
import { OrdeInfoData, TravelerInfoData } from "../../../types/manager";
import ManagerTitle from "../ManagerTitle";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TravelerCountBox from "./TravelerCountBox";
import OrderedTravelerInfo from "./OrderedTravelerInfo";
import { orderDateFormat } from "../../../utils/orderDateFormat";
import OrderDetailBtn from "./OrderDetailBtn";
import SpecialAmount from "./SpecialAmount";
import usePostTravelerInfo from "../../../queries/orders/usePostTravelerInfo";
import useGetOrderCancel from "../../../queries/orders/useGetOrderCancel";

const OrderInfo = ({ data }: { data: OrdeInfoData }) => {
  const [travelerInfoList, setTravelerInfoList] = useState<TravelerInfoData[]>(
    data.travelerInfos
  );

  const [travelerCount, setTravelerCount] = useState({
    imomOrderId: "",
    adultCount: 0,
    childCount: 0,
    infantCount: 0,
  });

  const { mutate, isError, error } = usePostTravelerInfo({
    ...travelerCount,
    totalCount: travelerInfoList.length,
    travelerInfoList: travelerInfoList,
  });

  const { mutate: cancelMutate } = useGetOrderCancel(data.imomOrderId);

  const handleDeleteTraveler = (id: number, name: string, role: string) => {
    const check = confirm(`${name}님의 정보를 삭제하시겠습니까?`);
    if (check) {
      const category = COUNT_CATEGORIES[role as keyof typeof COUNT_CATEGORIES];
      // 인원 변경
      setTravelerCount((prev) => ({
        ...prev,
        [category]: +prev[category as keyof typeof travelerCount] - 1,
      }));
      // 리스트에서 정보 제거
      setTravelerInfoList((prev) => prev.filter((_, index) => index !== id));
      mutate();
    } else {
      return;
    }
  };

  const handleAddTraveler = () => {
    setTravelerInfoList((prev) => [
      ...prev,
      {
        travelerName: "",
        enFirstName: "",
        enLastName: "",
        gender: "남",
        birth: "",
        phoneNumber: null,
        representative: false,
      },
    ]);
  };

  const handleEditTraveler = (
    id: number,
    info: TravelerInfoData,
    changedRole?: string, // 변경될 인원 카테고리
    orderedRole?: string // 유저가 주문한 인원 카테고리
  ) => {
    if (changedRole && orderedRole && changedRole !== orderedRole) {
      // 추가될 인원 카테고리
      const plusCategory =
        COUNT_CATEGORIES[changedRole as keyof typeof COUNT_CATEGORIES];

      // 제거될 인원 카테고리
      const minusCategory =
        COUNT_CATEGORIES[orderedRole as keyof typeof COUNT_CATEGORIES];

      // 인원 변경
      setTravelerCount((prev) => ({
        ...prev,
        [plusCategory]: +prev[plusCategory as keyof typeof travelerCount] + 1,
        [minusCategory]: +prev[minusCategory as keyof typeof travelerCount] - 1,
      }));
    } else if (changedRole && !orderedRole) {
      // 추가될 인원 카테고리
      const plusCategory =
        COUNT_CATEGORIES[changedRole as keyof typeof COUNT_CATEGORIES];

      // 인원 변경
      setTravelerCount((prev) => ({
        ...prev,
        [plusCategory]: +prev[plusCategory as keyof typeof travelerCount] + 1,
      }));
    }
    setTravelerInfoList((prev) => {
      const newList = [...prev];
      newList[id] = info;
      return newList;
    });
    mutate();
  };

  const handleOrderCancel = () => {
    const check = confirm(
      `여행자 ${data?.reserveUser}님의 주문을 취소하시겠습니까?`
    );
    if (check) {
      cancelMutate();
    }
  };

  useEffect(() => {
    if (isError && error) {
      alert("여행자 정보 수정에 실패하였습니다.");
    }
  }, [isError, error]);

  useEffect(() => {
    console.log(travelerInfoList);
  }, [travelerInfoList]);

  useEffect(() => {
    setTravelerInfoList(data.travelerInfos);
    setTravelerCount({
      imomOrderId: data.imomOrderId,
      adultCount: data.adultCount,
      childCount: data.childCount,
      infantCount: data.infantCount,
    });
  }, [data]);

  return (
    <div className="text-sub-black flex flex-col gap-[32px] text-[14px]">
      <div>
        <SpecialAmount
          orderId={data.imomOrderId}
          additionalPrice={data.additionalPrice}
          memo={data.memo}
          orderState={data.orderState}
        />
      </div>
      <div>
        <ManagerTitle title="주문확인" style="mb-[12px] " />
        <div className="flex justify-between flex-col border-y-[2px] border-sub-black min-w-fit">
          {ORDER_INFO_CATEGORIES.map((item) =>
            item.category === "총인원" ? (
              <div className="flex" key={item.category}>
                <TableHeader header={true} category={`총인원`} />
                <TravelerCountBox
                  role={"총"}
                  count={data.totalCount}
                  style="bg-[#F5F5F4]"
                />
                <TravelerCountBox role={"성인"} count={data.adultCount} />
                <TravelerCountBox role={"아동"} count={data.childCount} />
                <TravelerCountBox role={"유아"} count={data.infantCount} />
              </div>
            ) : item.category === "여행대표자" &&
              Array.isArray(data.travelerInfos) ? (
              <div
                className="flex border-b border-sub-black min-w-fit"
                key={item.category}
              >
                <TableHeader
                  header={true}
                  category={item.category}
                  cellStyle="h-auto"
                />
                <OrderedTravelerInfo
                  data={
                    travelerInfoList.filter(
                      (item) => item.representative === true
                    )[0]
                  }
                  representative={true}
                />
              </div>
            ) : item.category === "주문상태" ? (
              <div
                key={item.category}
                className={`flex w-full items-center border-b border-sub-black`}
              >
                <TableHeader category={"주문상태"} header={true} />
                <div className="px-[24px] flex shrink-0">{data.orderState}</div>
                {data.orderState !== "취소" && (
                  <OrderDetailBtn
                    label="주문취소"
                    handleClick={handleOrderCancel}
                  />
                )}
              </div>
            ) : (
              <TableRow
                key={item.category}
                category={item.category}
                header={true}
                content={
                  item.category === "주문일시"
                    ? orderDateFormat(data.orderDate)
                    : `${data[item.content as keyof typeof data]}`
                }
                rowStyle={"border-b border-sub-black"}
              />
            )
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <ManagerTitle title="여행자 정보" style="mb-[12px]" />
        <div className="flex flex-col gap-[48px]">
          {travelerInfoList.map((info, index) => (
            <OrderedTravelerInfo
              data={info}
              key={`info_${index}`}
              id={index}
              handleDelete={handleDeleteTraveler}
              handleEdit={handleEditTraveler}
              startDate={data.startDate}
              page="admin"
              orderState={data.orderState}
            />
          ))}
        </div>
        {data.orderState !== "취소" && (
          <OrderDetailBtn
            label="+"
            style="px-[80px] py-[px] text-[24px] w-fit self-center mt-[12px]"
            handleClick={handleAddTraveler}
          />
        )}
      </div>
    </div>
  );
};
export default OrderInfo;
