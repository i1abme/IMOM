import { useLocation, useNavigate } from "react-router-dom";
import ProductInfo from "../components/Reservation/ProductInfo";
import UserInfo from "../components/Reservation/UserInfo";
import TravelerInfo from "../components/Reservation/TravelerInfo";
import PriceInfo from "../components/Reservation/PriceInfo";
import { useEffect, useState } from "react";
import { PriceInfoData, TermsState, travelerInfo } from "../types/reservation";
import Terms from "../components/Reservation/Terms";
import { REQUIRED_TRAVELER_DATA } from "../constants/travelerdata";
import useGetUserInfo from "../queries/users/useGetUserInfo";
import { useRecoilValue } from "recoil";
import { viewSize } from "../atom/atom";

const Reservation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const viewSizeState = useRecoilValue(viewSize);

  const { data: userData } = useGetUserInfo();

  const { productInfo, priceInfo } = location.state || {};
  const [travelerInfoList, setTravelerInfoList] = useState<{
    [key: string]: travelerInfo;
  }>({});
  const [infoCount, setInfoCount] = useState(0);
  const [checkList, setCheckList] = useState<TermsState>({
    travel: false,
    refund: false,
    privacy: false,
    identification: false,
    thirdperson: false,
    marketing: false,
  });

  const [finalPriceInfo, setFinalPriceInfo] = useState<PriceInfoData>({
    adult: {
      count: 0,
      price: 0,
      totalPrice: 0,
    },
    child: {
      count: 0,
      price: 0,
      totalPrice: 0,
    },
    infant: {
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

  const handleChangeAge = (
    pickedAge: "adult" | "child" | "infant",
    realAge: "adult" | "child" | "infant"
  ) => {
    setFinalPriceInfo((prev) => {
      const newPriceInfo = structuredClone(prev);
      return {
        ...newPriceInfo,
        [pickedAge]: {
          ...newPriceInfo[pickedAge],
          count: newPriceInfo[pickedAge].count - 1,
          totalPrice:
            newPriceInfo[pickedAge].totalPrice - newPriceInfo[pickedAge].price,
        },
        [realAge]: {
          ...newPriceInfo[realAge],
          count: newPriceInfo[realAge].count + 1,
          totalPrice:
            newPriceInfo[realAge].totalPrice + newPriceInfo[realAge].price,
        },
        totalPay:
          newPriceInfo.totalPay -
          newPriceInfo[pickedAge].price +
          newPriceInfo[realAge].price,
      };
    });
  };

  const handlePayment = () => {
    // 기본적인 필수 정보 존재 여부 확인
    const isAllValid = Object.values(travelerInfoList).every((info) => {
      return REQUIRED_TRAVELER_DATA.every(
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
      navigate("/paymentcheckout", {
        state: {
          paymentInfo: {
            orderId: "",
            paymentKey: "",
            productId: `${productInfo.productId}`,
            adultCount: finalPriceInfo["adult"].count,
            childCount: finalPriceInfo["child"].count,
            infantCount: finalPriceInfo["infant"].count,
            totalCount: finalPriceInfo.totalCount,
            totalPrice: finalPriceInfo.totalPay,
            travelerInfoList: Object.values(travelerInfoList),
            amount: Math.floor(finalPriceInfo.totalPay / 10),
            marketing: checkList.marketing,
          },
          tossPaymentInfo: {
            email: userData?.email,
            userName: userData?.userName,
            packageName: productInfo.packageName,
          },
        },
      });
    } else if (!isRequriedChecked) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    } else if (
      priceInfo.totalCount !== infoCount ||
      !isAllValid ||
      !isRepresenterValid
    ) {
      alert("필수 여행자정보를 모두 기입해주세요.");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center gap-[80px] w-full max-xsm:px-[16px] max-xsm:gap-[24px]">
      {viewSizeState === "web" && (
        <h1 className="text-main-color text-[20px] font-bold mt-[38px]">
          예약하기
        </h1>
      )}
      <ProductInfo info={productInfo} />
      <UserInfo userdata={userData} />
      <TravelerInfo
        priceInfo={priceInfo}
        handleTravelerInfo={handleTravelerInfo}
        userInfo={userData}
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
    </div>
  );
};

export default Reservation;
