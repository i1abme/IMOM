import { useEffect, useState } from "react";
import ScheduleList from "../components/TravelDetail/ScheduleList";
import ScheduleInfo from "../components/TravelDetail/ScheduleInfo";
import CategoryBtns from "../components/TravelDetail/CategoryBtns";
import ProductInfo from "../components/TravelDetail/ProductInfo";
import PackageDetail from "../components/TravelDetail/PackageDetail";
import ProductDetail from "../components/TravelDetail/ProductDetail";
import ReservationBox from "../components/TravelDetail/ReservationBox";
import useGetProduct from "../queries/products/useGetProduct";
import { daysAndNightFormat } from "../utils/daysAndNightFormat";
import { Prices, Product, ProductDetialInfo } from "../types/product";
import {
  PRODUCT_INFO_CATEGORIES,
  SCHEDULE_INFO_CATEGORIES,
} from "../constants/productdata";
import { useParams } from "react-router-dom";

const TravelDetail = () => {
  const { id } = useParams();
  const [showScheduleInfo, setShowScheduleInfo] = useState<
    "hotelInfo" | "scheduleList" | "regionInfo" | "terms"
  >("scheduleList");
  const [showProductInfo, setShowProductInfo] = useState<string>("keyPoint");
  const [detailData, setDetailData] = useState<ProductDetialInfo>();
  const { data, isPending, isError, error } = useGetProduct(id ? +id : 0);

  const [scheduleInfo, setScheuleInfo] = useState<string>("");

  useEffect(() => {
    if (data) {
      setDetailData(data);
    }
    console.log(data);
  }, [data]);

  const handleScheduleInfo = (id: string) => {
    console.log(id);
    if (detailData) {
      setShowScheduleInfo(
        () => id as "hotelInfo" | "scheduleList" | "regionInfo" | "terms"
      );
      if (id !== "scheduleList")
        setScheuleInfo(() =>
          typeof detailData.packageInfo[
            id as "hotelInfo" | "regionInfo" | "terms"
          ] === "string"
            ? detailData.packageInfo[id as "hotelInfo" | "regionInfo" | "terms"]
            : ""
        );
    }
  };

  const handleProductInfo = (id: string) => {
    setShowProductInfo(() => id);
  };

  const prices: Prices[] = detailData
    ? [
        {
          age: "성인",
          price: detailData?.productInfo?.adultPrice,
          surcharge: detailData?.productInfo?.adultSurcharge,
        },
        {
          age: "아동",
          price: detailData?.productInfo?.childPrice,
          surcharge: detailData?.productInfo?.childSurcharge,
        },
        {
          age: "유아",
          price: detailData?.productInfo?.infantPrice,
          surcharge: detailData?.productInfo?.infantSurcharge,
        },
      ]
    : [
        {
          age: "성인",
          price: 0,
          surcharge: 0,
        },
        {
          age: "아동",
          price: 0,
          surcharge: 0,
        },
        {
          age: "유아",
          price: 0,
          surcharge: 0,
        },
      ];

  const reservationInfo = detailData
    ? {
        packageName: detailData?.packageInfo?.packageName,
        period: daysAndNightFormat(detailData?.packageInfo?.period),
        startDate: detailData?.productInfo?.startDate,
        endDate: detailData?.productInfo?.endDate,
        airline: detailData?.productInfo?.airline,
        productId: detailData?.productInfo?.productId,
      }
    : {
        packageName: "",
        period: "",
        startDate: "",
        endDate: "",
        airline: "",
        productId: 0,
      };

  if (id === undefined) {
    return <div>잘못된 상품경로입니다.</div>;
  }
  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
  }
  if (!detailData) {
    return <div>데이터가 없습니다.</div>;
  }
  return (
    <div className="w-full flex flex-col items-center gap-[46px]">
      <PackageDetail
        packageInfo={detailData.packageInfo}
        productInfo={detailData.productInfo}
      />
      <div className="flex justify-between w-[765px]">
        <ProductDetail info={detailData.productInfo} prices={prices} />
        <ReservationBox
          prices={prices}
          maxCount={detailData.productInfo.maxCount}
          nowCount={detailData.productInfo.nowCount}
          info={reservationInfo}
          productState={detailData.productInfo.productState}
        />
      </div>
      <section className="flex flex-col items-center gap-[16px]">
        <CategoryBtns
          category={PRODUCT_INFO_CATEGORIES}
          handleClick={handleProductInfo}
          active={showProductInfo}
        />
        {showProductInfo === "includedProduct" ? (
          <ProductInfo
            info1={detailData.productInfo.includedProduct}
            info2={detailData.productInfo.excludedProduct}
          />
        ) : (
          <ProductInfo
            info1={detailData.productInfo[showProductInfo as keyof Product]}
          />
        )}
      </section>
      <section className="flex flex-col items-center gap-[16px]">
        <CategoryBtns
          category={SCHEDULE_INFO_CATEGORIES}
          handleClick={handleScheduleInfo}
          active={showScheduleInfo}
        />
        <div className="flex flex-col gap-[43px]">
          {showScheduleInfo === "scheduleList" ? (
            <ScheduleList
              scheduleListData={
                detailData.packageInfo.scheduleList
                  ? detailData.packageInfo.scheduleList
                  : []
              }
            />
          ) : (
            <ScheduleInfo info={scheduleInfo} key={showScheduleInfo} />
          )}
        </div>
      </section>
    </div>
  );
};

export default TravelDetail;
