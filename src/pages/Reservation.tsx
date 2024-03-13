import { useLocation } from "react-router-dom";
import ProductInfo from "../components/Reservation/ProductInfo";
import UserInfo from "../components/Reservation/UserInfo";
import TravelerInfo from "../components/Reservation/TravelerInfo";
import PriceInfo from "../components/Reservation/PriceInfo";
import { useEffect, useState } from "react";
import Payment from "../components/Reservation/Payment";
import { PriceInfoData, TermsState, travelerInfo } from "../types/reservation";
import Terms from "../components/Reservation/Terms";

const Reservation = () => {
  const location = useLocation();
  const { productInfo, priceInfo } = location.state || {};
  const [travelerInfoList, setTravelerInfoList] = useState<{
    [key: string]: travelerInfo;
  }>({});
  const [infoCount, setInfoCount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [checkList, setCheckList] = useState<TermsState>({
    travel: false,
    refund: false,
    privacy: false,
    identification: false,
    thirdperson: false,
    marketing: false,
  });

  const [finalPriceInfo, setFinalPriceInfo] = useState<PriceInfoData>({
    성인: {
      count: 0,
      price: 0,
      totalPrice: 0,
    },
    아동: {
      count: 0,
      price: 0,
      totalPrice: 0,
    },
    유아: {
      count: 0,
      price: 0,
      totalPrice: 0,
    },
    totalPay: 0,
    totalCount: 0,
  });

  useEffect(() => {
    if (priceInfo) {
      setFinalPriceInfo(() => ({ ...priceInfo }));
    }
  }, [priceInfo]);

  const userdata = {
    email: "hahyuning@naver.com",
    userName: "김우리",
    enFirstName: "kim",
    enLastName: "wooriiiiiiii",
    gender: "남",
    birth: "2000-11-11",
    phoneNumber: "010-1234-5678",
    headCount: 3,
    childName: "정우리",
  };

  const handleTravelerInfo = (
    travelerId: string,
    info: travelerInfo | string,
    category?: keyof travelerInfo
  ) => {
    setTravelerInfoList((prev) => {
      const newList = { ...prev };
      if (!prev[travelerId]) {
        setInfoCount((prevCount) => prevCount + 1);
      }
      if (category && typeof info === "string") {
        return {
          ...newList,
          [travelerId]: {
            ...newList[travelerId],
            [category]: info,
          },
        };
      } else if (typeof info !== "string") {
        return { ...newList, [travelerId]: info };
      }
      return newList;
    });
  };

  const handleCheck = (id: string) => {
    // 약관 동의
    setCheckList((prev) => ({
      ...prev,
      [id]: !prev[id as keyof TermsState],
    }));
  };

  const handleAllAgree = (checked: boolean) => {
    //약관 전체 동의
    setCheckList((prev) => {
      const newCheckList = { ...prev };
      Object.keys(newCheckList).forEach((key) => {
        if (key !== "travelerInfo" && checked) {
          newCheckList[key as keyof typeof checkList] = true;
        } else if (key !== "travelerInfo" && !checked) {
          newCheckList[key as keyof typeof checkList] = false;
        }
      });
      return newCheckList;
    });
  };

  const handleChangeAge = (pickedAge: string, realAge: string) => {
    setFinalPriceInfo((prev) => {
      const newPriceInfo = structuredClone(prev);
      return {
        ...newPriceInfo,
        [pickedAge]: {
          ...newPriceInfo[pickedAge as "성인" | "아동" | "유아"],
          count: newPriceInfo[pickedAge as "성인" | "아동" | "유아"].count - 1,
          totalPrice:
            newPriceInfo[pickedAge as "성인" | "아동" | "유아"].totalPrice -
            newPriceInfo[pickedAge as "성인" | "아동" | "유아"].price,
        },
        [realAge]: {
          ...newPriceInfo[realAge as "성인" | "아동" | "유아"],
          count: newPriceInfo[realAge as "성인" | "아동" | "유아"].count + 1,
          totalPrice:
            newPriceInfo[realAge as "성인" | "아동" | "유아"].totalPrice +
            newPriceInfo[realAge as "성인" | "아동" | "유아"].price,
        },
        totalPay:
          newPriceInfo.totalPay -
          newPriceInfo[pickedAge as "성인" | "아동" | "유아"].price +
          newPriceInfo[realAge as "성인" | "아동" | "유아"].price,
      };
    });
  };

  const handlePayment = () => {
    // 기본적인 필수 여행자 정보
    const requiredData = [
      "travelerName",
      "enFirstName",
      "enLastName",
      "gender",
      "birth",
    ];

    // 기본적인 필수 정보 존재 여부 확인
    const isAllValid = Object.values(travelerInfoList).every((info) => {
      return requiredData.every(
        (field) => info[field as keyof travelerInfo] !== ""
      );
    });

    // 대표 1인의 핸드폰 번호 존재 여부 확인
    const isRepresenterValid =
      !travelerInfoList[0] || travelerInfoList[0].phoneNumber !== "";

    // 필수 약관 동의 여부 확인
    const isRequriedChecked = Object.keys(checkList)
      .filter((key) => key !== "marketing")
      .every((key) => checkList[key as keyof typeof checkList]);

    if (
      priceInfo.totalCount === infoCount &&
      isAllValid &&
      isRepresenterValid &&
      isRequriedChecked
    ) {
      setShowPayment(true);
    } else if (
      priceInfo.totalCount !== infoCount ||
      !isAllValid ||
      !isRepresenterValid
    ) {
      alert("필수 여행자정보를 모두 기입해주세요.");
      return;
    } else if (!isRequriedChecked) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }
  };

  useEffect(() => {
    console.log(travelerInfoList);
  }, [travelerInfoList]);

  return (
    <div className="flex flex-col items-center gap-[80px] py-[216px] ">
      {showPayment ? (
        <Payment
          travelerInfoList={Object.values(travelerInfoList)}
          priceInfo={finalPriceInfo}
          productId={productInfo.productId}
          marketing={checkList.marketing}
        />
      ) : (
        <>
          <h1 className="text-main-color text-[20px] font-bold mt-[38px]">
            예약하기
          </h1>
          <ProductInfo info={productInfo} />
          <UserInfo />
          <TravelerInfo
            priceInfo={priceInfo}
            handleTravelerInfo={handleTravelerInfo}
            userInfo={userdata}
            startDate={productInfo.startDate}
            handleChangeAge={handleChangeAge}
          />
          <Terms
            handleCheck={handleCheck}
            handleAllAgree={handleAllAgree}
            checkList={checkList}
          />
          <PriceInfo
            finalPriceInfo={finalPriceInfo}
            handlePayment={handlePayment} // 선택약관을 제외한 모든 체크박스 체크
          />
        </>
      )}
    </div>
  );
};

export default Reservation;
