import { useEffect, useRef, useState } from "react";
import ScheduleList from "../components/TravelDetail/ScheduleList";
import ScheduleInfo from "../components/TravelDetail/ScheduleInfo";
import CategoryBtns from "../components/common/CategoryBtns";
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
import { useRecoilValue } from "recoil";
import { viewSize } from "../atom/atom";
import "/src/components/common/Header/NavDropdown.css";
import MbCategoryBtns from "../components/TravelDetail/MbCategoryBtn";

const TravelDetail = () => {
  const { id } = useParams();

  const viewSizeState = useRecoilValue(viewSize);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  const [showScheduleInfo, setShowScheduleInfo] = useState<
    "hotelInfo" | "scheduleList" | "regionInfo" | "terms"
  >("scheduleList");
  const [showProductInfo, setShowProductInfo] = useState<string>("keyPoint");
  const [detailData, setDetailData] = useState<ProductDetialInfo>();
  const { data, isError } = useGetProduct(id ? +id : 0);

  const [scheduleInfo, setScheuleInfo] = useState<string>("");

  const [showReserveBox, setShowReserveBox] = useState(false);

  useEffect(() => {
    if (data) {
      setDetailData(data);
    }
  }, [data]);

  const handleScheduleInfo = (id: string) => {
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

  const handleReserve = () => {
    setShowReserveBox(true);
  };

  const prices: Prices[] = [
    {
      label: "성인",
      age: "adult",
      price: detailData?.productInfo?.adultPrice || 0,
      surcharge: detailData?.productInfo?.adultSurcharge || 0,
    },
    {
      label: "아동",
      age: "child",
      price: detailData?.productInfo?.childPrice || 0,
      surcharge: detailData?.productInfo?.childSurcharge || 0,
    },
    {
      label: "유아",
      age: "infant",
      price: detailData?.productInfo?.infantPrice || 0,
      surcharge: detailData?.productInfo?.infantSurcharge || 0,
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

  useEffect(() => {
    const handleDragStart = (event: MouseEvent | TouchEvent) => {
      const clientY =
        event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;

      startYRef.current = clientY;
      event.preventDefault();
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent) => {
      const clientY =
        event instanceof TouchEvent
          ? event.changedTouches[0].clientY
          : event.clientY;

      if (clientY - startYRef.current >= 50) {
        setShowReserveBox(!showReserveBox);
      }
      event.preventDefault();
    };

    const element = dropdownRef.current;
    if (viewSizeState === "mobile" && element) {
      element.addEventListener("touchstart", handleDragStart, {
        passive: false,
      });
      element.addEventListener("touchend", handleDragEnd, { passive: false });
      element.addEventListener("mousedown", handleDragStart, {
        passive: false,
      });
      element.addEventListener("mouseup", handleDragEnd, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleDragStart);
        element.removeEventListener("touchend", handleDragEnd);
        element.removeEventListener("mousedown", handleDragStart);
        element.removeEventListener("mouseup", handleDragEnd);
      }
    };
  }, [viewSizeState, showReserveBox]);

  if (id === undefined) {
    return <div className="w-full text-center">잘못된 상품경로입니다.</div>;
  }
  if (isError) {
    return <div className="w-full text-center">상품을 찾을 수 없습니다.</div>;
  }
  if (!detailData) {
    return <div className="w-full text-center">데이터가 없습니다.</div>;
  }
  return (
    <div className="w-full flex flex-col items-center gap-[46px] max-xsm:gap-[30px] max-xsm:pb-[120px]">
      <div className="bg-main-color h-[90px] rounded-b-[20px] absolute z-[-999] w-full hidden max-xsm:block" />
      <PackageDetail
        packageInfo={detailData.packageInfo}
        productInfo={detailData.productInfo}
      />
      <div className="flex justify-between w-[765px] max-xsm:w-full">
        <ProductDetail info={detailData.productInfo} prices={prices} />
        <ReservationBox
          prices={prices}
          maxCount={detailData.productInfo.maxCount}
          nowCount={detailData.productInfo.nowCount}
          info={reservationInfo}
          productState={detailData.productInfo.productState}
          viewSize={viewSizeState}
        />
      </div>
      <section
        className="flex flex-col items-center gap-[16px] 
        max-xsm:w-full max-xsm:mx-[16px] max-xsm:gap-[8px]"
      >
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
      <section className="flex flex-col gap-[16px]">
        {viewSizeState === "web" ? (
          <CategoryBtns
            category={SCHEDULE_INFO_CATEGORIES}
            handleClick={handleScheduleInfo}
            active={showScheduleInfo}
          />
        ) : (
          <MbCategoryBtns
            category={SCHEDULE_INFO_CATEGORIES}
            handleClick={handleScheduleInfo}
            active={showScheduleInfo}
          />
        )}
        <div className="flex flex-col gap-[43px] max-xsm:gap-[10px] w-full items-center">
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
        {viewSizeState === "mobile" && (
          <div
            className="dropdown bg-white z-50 fixed w-full flex-col
            h-fit px-[50px] pb-[99px] rounded-t-[20px] py-0 flex items-center"
            ref={dropdownRef}
          >
            <div className="w-[50px] h-[3px] rounded-[10px] bg-main-color mb-[12px] mt-[12px] flex self-center" />
            {!showReserveBox && (
              <button
                className="bg-main-color rounded-[20px] text-white text-[12px] tracking-[-0.6px]
            disabled:bg-sub-black disabled:bg-opacity-[0.3] px-[77px] py-[12px] "
                onClick={handleReserve}
                onTouchStart={handleReserve}
                disabled={detailData.productInfo.productState !== "예약 가능"}
              >
                {detailData.productInfo.productState === "예약 가능"
                  ? "예약하기"
                  : detailData.productInfo.productState}
              </button>
            )}
            <div className={`${showReserveBox ? "block" : "hidden"}`}>
              <ReservationBox
                prices={prices}
                maxCount={detailData.productInfo.maxCount}
                nowCount={detailData.productInfo.nowCount}
                info={reservationInfo}
                productState={detailData.productInfo.productState}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TravelDetail;
