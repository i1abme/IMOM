import React, { SetStateAction, useEffect, useState } from "react";
import ManagerTitle from "../../components/Manager/ManagerTitle";
import ProductTitle from "../../components/Manager/ProductTitle";
import ProductIcon from "../../components/Manager/ProductIcon";
import { porductIcons, productCost } from "../../constants/data";
import ProductCost from "../../components/Manager/ProductCost";
import { baseInstance } from "../../api/instance";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPackage } from "../../api/useGetPackage";
import { useGetAirlines } from "../../api/useGetAirlines";
import CustomDatePicker from "../../components/common/CustomDatePicker";
import { useRecoilValue } from "recoil";
import { saveState } from "../../atom/atom";

type StateMappings = {
  [key: string]: React.Dispatch<SetStateAction<string>>;
};

const ProductDetail = () => {
  const navigation = useNavigate();
  const { edit } = useParams();
  const { airlines } = useGetAirlines();
  const { packagesList } = useGetPackage();
  // todo 상품 등록
  // 패키지이름
  const [packageName, setPackageName] = useState("");
  // 비행기 국적
  const [flagCarrier, setFlagCarrier] = useState("");
  // 인솔자동행 유/무
  const [tourConductor, setTourConductor] = useState("");
  // 쇼핑 유/무
  const [shopping, setShopping] = useState("");
  // 선택 관광 유/무
  const [optionalTour, setOptionalTour] = useState("");
  // 상품상태
  const [productState, setProductState] = useState("");
  // 공개상태
  const [privacy, setPrivacy] = useState("");
  // 출발/도착 일시
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  // 항공사
  const [airline, setAirline] = useState<string>("");
  // 출발인원 최대/최소
  const [minCount, setMinCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(2);

  //? 여행 비용
  //성인총액/ 성인유류할증료
  const [adultPrice, setAdultPrice] = useState("");
  const [adultSurcharge, setAdultSurcharge] = useState("");
  //아동총액/ 아동유류할증료
  const [childPrice, setChildPrice] = useState("");
  const [childSurcharge, setChildSurcharge] = useState("");
  //유아총액/ 아동유류할증료
  const [infantPrice, setInfantPrice] = useState("");
  const [infantSurcharge, setInfantSurcharge] = useState("");
  // 상품핵심포인트
  const [keyPoint, setKeyPoint] = useState("");
  // 여행 지역정보
  const [travelRegion, setTravelRegion] = useState("");
  // 여행 포함/ 불포함
  const [includedProduct, setIncludedProduct] = useState("");
  const [excludedProduct, setExcludedProduct] = useState("");
  // 예약 유의사항
  const [reservationNotice, setReservationNotice] = useState("");
  // 임시저장 확인
  const temporarySave = useRecoilValue(saveState);

  const selectedPackage = packagesList.find(
    (packageItem) => packageItem.packageName === packageName
  );

  // 패키지선택,항공사,인원onChange함수
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    if (name === "패키지선택") {
      setPackageName(value);
    } else if (name === "최소인원") {
      const parsedValue = parseInt(value);
      setMinCount(isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue);
      if (parsedValue >= maxCount) {
        setMaxCount(parsedValue + 1);
      }
    } else if (name === "최대인원") {
      const parsedValue = parseInt(value);
      setMaxCount(isNaN(parsedValue) || parsedValue < 2 ? 2 : parsedValue);
      if (parsedValue <= minCount) {
        setMinCount(parsedValue - 1);
      }
    } else if (name === "항공사") {
      setAirline(value);
    }
  };

  // 상품아이콘, 상품상태, 공개상태 라디오 Change함수
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const stateMappings: StateMappings = {
      "예약 상태": setProductState,
      "공개 상태": setPrivacy,
      "비행기 국적": setFlagCarrier,
      "인솔자 동행": setTourConductor,
      "쇼핑 유무": setShopping,
      "선택 관광 유무": setOptionalTour,
      "성인 총액": setAdultPrice,
      "아동 총액": setChildPrice,
      "유아 총액": setInfantPrice,
      "성인 유류 할증료": setAdultSurcharge,
      "아동 유류 할증료": setChildSurcharge,
      "유아 유류 할증료": setInfantSurcharge,
    };

    if (stateMappings[name]) {
      stateMappings[name](value);
    }
  };
  // textarea onChnage함수
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "상품핵심포인트":
        setKeyPoint(value);
        break;
      case "여행지역정보":
        setTravelRegion(value);
        break;
      case "포함내역":
        setIncludedProduct(value);
        break;
      case "불포함내역":
        setExcludedProduct(value);
        break;
      case "예약 유의사항":
        setReservationNotice(value);
        break;
      default:
        break;
    }
  };

  // ! 수정시 로직
  // 수정시 수정할 데이터
  // 수정시
  const [productCode, setProductCode] = useState();
  useEffect(() => {
    if (edit) {
      baseInstance.get(`/products/${edit}`).then((res) => {
        const { productInfo } = res.data.data;
        const { packageInfo } = res.data.data;
        setProductCode(productInfo.productCode);
        setPackageName(packageInfo.packageName);
        setFlagCarrier(productInfo.flagCarrier === 0 ? "국내기" : "해외기");
        setTourConductor(productInfo.tourConductor === 1 ? "유" : "무");
        setShopping(productInfo.shopping === 1 ? "유" : "무");
        setOptionalTour(productInfo.optionalTour === 1 ? "유" : "무");
        setProductState(productInfo.productState);
        setPrivacy(packageInfo.privacy);
        setStartDate(new Date(productInfo.startDate));
        setEndDate(new Date(productInfo.endDate));
        setAirline(productInfo.airline);
        setMinCount(productInfo.minCount);
        setMaxCount(productInfo.maxCount);
        setAdultPrice(productInfo.adultPrice);
        setAdultSurcharge(productInfo.adultSurcharge);
        setChildPrice(productInfo.childPrice);
        setChildSurcharge(productInfo.childSurcharge);
        setInfantPrice(productInfo.infantPrice);
        setInfantSurcharge(productInfo.infantSurcharge);
        setKeyPoint(productInfo.keyPoint);
        setTravelRegion(productInfo.travelRegion);
        setIncludedProduct(productInfo.includedProduct);
        setExcludedProduct(productInfo.excludedProduct);
        setReservationNotice(productInfo.reservationNotice);
      });
    }
  }, []);

  // 등롱 수정하기 버튼(post데이터 보내기)
  const handleEditSaveClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      packageName !== "" &&
      startDate !== null &&
      endDate !== null &&
      airline !== "" &&
      minCount !== 0 &&
      maxCount !== 0
    ) {
      baseInstance({
        method: edit ? "put" : "post",
        url: edit ? `/products/${edit}` : "/products/create",
        data: {
          packageId: selectedPackage?.packageId,
          startDate: startDate.toISOString().slice(0, 19).replace(" ", "T"),
          endDate: endDate.toISOString().slice(0, 19).replace(" ", "T"),
          minCount: minCount,
          maxCount: maxCount,
          privacy: privacy,
          productState: productState,
          airline: airline,
          flagCarrier: flagCarrier === "유" ? 1 : 0,
          tourConductor: tourConductor === "유" ? 1 : 0,
          shopping: shopping === "유" ? 1 : 0,
          optionalTour: optionalTour === "유" ? 1 : 0,
          adultPrice: Number(adultPrice),
          adultSurcharge: Number(adultSurcharge),
          childPrice: Number(childPrice),
          childSurcharge: Number(childSurcharge),
          infantPrice: Number(infantPrice),
          infantSurcharge: Number(infantSurcharge),
          keyPoint: keyPoint,
          includedProduct: includedProduct,
          excludedProduct: excludedProduct,
          reservationNotice: reservationNotice,
          travelRegion: travelRegion,
        },
      }).then((res) => {
        if (res.status === 200 && edit) {
          alert("수정이 완료됐습니다");
          navigation("/productmanager");
        } else if (res.status === 200) {
          alert("등록이 완료됐습니다");
          navigation("/productmanager");
        }
      });
    } else {
      alert("빈값을 전부 입력해주세요");
    }
  };
  //! 임시저장 버튼
  const handleTemporarySaveClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    baseInstance({
      method: edit ? "put" : "post",
      url: edit ? `/products/save/${edit}` : "/products/temp-create",
      data: {
        packageId: selectedPackage?.packageId,
        startDate: startDate?.toISOString().slice(0, 19).replace(" ", "T"),
        endDate: endDate?.toISOString().slice(0, 19).replace(" ", "T"),
        minCount: Number(minCount),
        maxCount: Number(maxCount),
        privacy: privacy,
        productState: productState,
        airline: airline,
        flagCarrier: flagCarrier === "유" ? 1 : 0,
        tourConductor: tourConductor === "유" ? 1 : 0,
        shopping: shopping === "유" ? 1 : 0,
        optionalTour: optionalTour === "유" ? 1 : 0,
        adultPrice: Number(adultPrice),
        adultSurcharge: Number(adultSurcharge),
        childPrice: Number(childPrice),
        childSurcharge: Number(childSurcharge),
        infantPrice: Number(infantPrice),
        infantSurcharge: Number(infantSurcharge),
        keyPoint: keyPoint,
        includedProduct: includedProduct,
        excludedProduct: excludedProduct,
        reservationNotice: reservationNotice,
        travelRegion: travelRegion,
      },
    }).then((res) => {
      if (res.status === 200 && edit) {
        alert("저장이 완료됐습니다");
        navigation("/productmanager");
      } else if (res.status === 200) {
        alert("임시저장이 완료됐습니다.");
        navigation("/productmanager");
      }
    });
  };
  return (
    <form className="w-full">
      <ManagerTitle title={`상품 ${edit ? "수정" : "등록"}`} />
      <div className="border-y mb-6 border-black">
        {/* 상품관리 */}
        {edit && (
          <div className="flex w-full border-b border-black">
            <ProductTitle title="상품코드" className="border-r border-black" />
            <input
              className="w-full outline-none"
              readOnly
              value={productCode && productCode}
            />
          </div>
        )}

        <div className="flex w-full">
          <ProductTitle
            title="패키지선택"
            className="border-r border-b border-black"
          />
          <div className="w-full border-b border-black">
            <select
              className="w-80 border"
              name="패키지선택"
              onChange={handleSelectChange}
              required
              value={packageName}
            >
              <option hidden>패키지 목록</option>
              {packagesList.map((el, idx) => (
                <option key={idx} value={el.packageName}>
                  {el.packageName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex w-full">
          <ProductTitle
            title="상품아이콘"
            className="border-r border-b border-black"
          />

          <div className="flex flex-col w-full border-b border-black">
            {porductIcons.map((el, index) => {
              return (
                <ProductIcon
                  key={index}
                  title={el.title}
                  firstLabel={el.labelFirst}
                  secondLabel={el.labelSecond}
                  onChange={handleRadioChange}
                  flagCarrier={flagCarrier}
                  tourConductor={tourConductor}
                  shopping={shopping}
                  optionalTour={optionalTour}
                />
              );
            })}
          </div>
        </div>
        <div className="flex w-full">
          <ProductTitle
            title="상품 상태"
            className="border-r border-b border-black"
          />
          <div className="w-full flex border-b border-black">
            {["예약 가능", "예약 마감"].map((el, index) => {
              return (
                <div className="flex items-center w-40 ml-5" key={index}>
                  <input
                    type="radio"
                    name="예약 상태"
                    value={el}
                    onChange={handleRadioChange}
                    required
                    checked={el === productState}
                  />
                  <span>{el}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full">
          <ProductTitle title="공개 상태" className="border-r border-black" />
          <div className="flex w-full">
            {["공개", "비공개"].map((el, index) => {
              return (
                <div className="flex w-20 ml-5" key={index}>
                  <input
                    type="radio"
                    name="공개 상태"
                    value={el}
                    onChange={handleRadioChange}
                    checked={el === privacy}
                    required
                  />
                  {el}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 출발 도착 */}
      <div className="border-y mb-6 border-black">
        <div>
          <div className="flex border-b border-black">
            <ProductTitle
              title="출발/도착일시"
              className="border-r  border-black"
            />
            <CustomDatePicker
              startDate={startDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              endDate={endDate}
            />
          </div>
        </div>
        <div className="flex border-b border-black">
          <ProductTitle title="항공사" className="border-r border-black" />

          <select onChange={handleSelectChange} name="항공사" value={airline}>
            <option disabled hidden value="">
              항공사 선택
            </option>
            {airlines.map((el, idx) => (
              <option key={idx}>{el}</option>
            ))}
          </select>
        </div>
        <div className="flex">
          <ProductTitle
            title="최소출발인원"
            className="border-r border-black"
          />

          <input
            onChange={handleSelectChange}
            name="최소인원"
            value={minCount}
            type="number"
            min={1}
          />
          <span>명</span>
        </div>
        <div className="flex border-t border-black">
          <ProductTitle
            title="최대출발인원"
            className="border-r border-black"
          />

          <input
            onChange={handleSelectChange}
            name="최대인원"
            value={maxCount}
            type="number"
            min={2}
          />
          <span>명</span>
        </div>
      </div>
      {/* 여행 비용 */}
      <div className="border-t mb-6 flex w-full border-black">
        <ProductTitle
          title="여행비용"
          className="border-b border-r border-black"
        />
        <div className="w-full ">
          {productCost.map((el, index) => {
            return (
              <ProductCost
                key={index}
                title1={el.title1}
                title2={el.title2}
                onChange={handleRadioChange}
                required={true}
                adultPrice={adultPrice}
                adultSurcharge={adultSurcharge}
                childPrice={childPrice}
                childSurcharge={childSurcharge}
                infantPrice={infantPrice}
                infantSurcharge={infantSurcharge}
              />
            );
          })}
        </div>
      </div>
      {/* 상품핵심포인트 */}
      <div className="border-y flex mb-6 h-36 border-black">
        <ProductTitle
          title="상품핵심포인트"
          className="border-r border-black"
        />

        <textarea
          className="w-full outline-none resize-none"
          name="상품핵심포인트"
          onChange={handleTextChange}
          value={keyPoint}
          required
        />
      </div>
      <div className="border-y flex mb-6 h-36 border-black">
        <ProductTitle title="여행지역정보" className="border-r border-black" />

        <textarea
          className="w-full outline-none resize-none"
          name="여행지역정보"
          onChange={handleTextChange}
          required
          value={travelRegion}
        />
      </div>
      {/* 여행 포함/불포함 */}
      <div className="border-t border-black flex mb-6 h-36">
        <ProductTitle
          title="여행 포함/불포함"
          className="border-r border-b border-black"
        />

        <div className="flex h-full w-full">
          <div className="flex flex-col h-full w-full">
            {["포함내역", "불포함내역"].map((el, index) => {
              return (
                <div
                  className="flex w-full h-full border-b border-black"
                  key={index}
                >
                  <div className="flex justify-center items-center w-40 border h-full whitespace-nowrap">
                    {el}
                  </div>
                  <textarea
                    name={el}
                    className="w-full outline-none border resize-none"
                    onChange={handleTextChange}
                    value={
                      el === "포함내역" ? includedProduct : excludedProduct
                    }
                    required
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 예약 유의사항 */}
      <div className="border-y border-black h-36 w-full">
        <div className="flex h-full w-full">
          <ProductTitle
            title="예약 유의사항"
            className="border-r border-black"
          />

          <textarea
            name="예약 유의사항"
            className="w-full resize-none outline-none"
            onChange={handleTextChange}
            value={reservationNotice}
            required
          />
        </div>
      </div>
      <div className="h-[1px] w-full bg-black my-8" />
      <div className="flex justify-center items-center">
        <button
          className={`border mr-5 border-main-color bg-white px-6 hover:bg-main-color hover:text-white ${
            edit && temporarySave === "저장" ? "hidden" : ""
          }`}
          onClick={handleTemporarySaveClick}
        >
          <span>{!edit && "임시저장"}</span>
          <span>{edit && temporarySave === "임시저장" && "저장하기"}</span>
        </button>
        <button
          className={`border border-main-color bg-white px-6 hover:bg-main-color hover:text-white ${
            temporarySave === "임시저장" ? "hidden" : ""
          }`}
          onClick={handleEditSaveClick}
        >
          <span>
            {edit && temporarySave === "임시저장"
              ? ""
              : edit
              ? "수정하기"
              : "등록하기"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default ProductDetail;
