import { useRecoilValue } from "recoil";
import { AGE_CATEGORY } from "../../constants/travelerdata";
import { PriceInfoData } from "../../types/reservation";
import SectionTitle from "./SectionTitle";
import { viewSize } from "../../atom/atom";

const PriceInfo = ({
  finalPriceInfo,
  handlePayment,
}: {
  finalPriceInfo: PriceInfoData;
  handlePayment: () => void;
}) => {
  const priceFormat = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const viewSizeState = useRecoilValue(viewSize);

  return (
    <div className="w-[420px] flex flex-col flex-wrap max-xsm:w-full">
      <SectionTitle title="결제정보" />
      <div
        className="flex flex-col p-[24px] gap-[24px] max-xsm:gap-[4px] 
      max-xsm:max-w-[200px] max-xsm:self-center  max-xsm:p-0 max-xsm:w-full"
      >
        {finalPriceInfo &&
          Object.entries(finalPriceInfo).map(
            ([key, value]) =>
              typeof value === "object" && (
                <div
                  key={key}
                  className="text-[14px] text-sub-black flex justify-between items-center
                  max-xsm:text-[12px]"
                >
                  <span
                    className="justify-center flex items-center 
                  max-xsm:w-[108px] max-xsm:h-[28px] max-xsm:bg-main-color/[0.1]"
                  >
                    {AGE_CATEGORY[key as keyof typeof AGE_CATEGORY]} X{" "}
                    {value.count}
                  </span>
                  <span className="text-[20px] flex gap-[4px] max-xsm:text-[12px]">
                    {priceFormat(value.totalPrice)}
                    <span className="text-[12px] flex self-end pb-[3px] max-xsm:text-[8px]">
                      원
                    </span>
                  </span>
                </div>
              )
          )}
        <div
          className="text-[14px] text-sub-black flex justify-between items-center border-y-[0.5px] border-[#707070] py-[5.5px]
        max-xsm:border-none max-xsm:p-0"
        >
          <span
            className="justify-center flex items-center 
          max-xsm:w-[108px] max-xsm:h-[28px] max-xsm:bg-main-color/[0.1]"
          >
            총
          </span>
          <span className="text-[20px] flex max-xsm:text-[12px]">
            {priceFormat(finalPriceInfo.totalPay)}
            <span className="text-[12px] flex self-end pb-[3px] pl-[4px] max-xsm:text-[8px]">
              원
            </span>
          </span>
        </div>
        <div className="text-[14px] text-sub-black flex justify-between items-center max-xsm:flex-col max-xsm:gap-[4px]">
          <div
            className="flex gap-[10px] items-center max-xsm:justify-between max-xsm:w-full max-xsm:h-[28px] 
          max-xsm:bg-main-color max-xsm:text-white max-xsm:text-[12px] max-xsm:px-[24px]"
          >
            <span>
              예약금
              <span className="text-[10px] pl-[4px] max-xsm:text-[8px]">
                (10%)
              </span>
            </span>
            <span className="text-[20px] flex gap-[4px] max-xsm:text-[12px] max-xsm:gap-[2px]">
              {priceFormat(finalPriceInfo.totalPay / 10)}
              <span className="text-[12px] flex self-end pb-[3px] max-xsm:text-[8px]">
                원
              </span>
            </span>
          </div>
          <button
            className="bg-main-color w-[150px] h-[34px] rounded-[9px] text-white max-xsm:w-full"
            onClick={handlePayment}
          >
            {viewSizeState === "web" ? (
              "예약금 결제하기"
            ) : (
              <span className="flex gap-[4px] justify-center text-[12px] items-baseline">
                예약금
                <span className="text-[8px]">(10%)</span>
                결제하기
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
