import { PriceInfoData } from "../../types/reservation";
import SectionTitle from "./SectionTitle";

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

  return (
    <div className="w-[420px] flex flex-col flex-wrap ">
      <SectionTitle title="결제정보" />
      <div className="flex flex-col p-[24px] gap-[24px]">
        {finalPriceInfo &&
          Object.entries(finalPriceInfo).map(
            ([key, value]) =>
              typeof value === "object" && (
                <div
                  key={key}
                  className="text-[14px] text-sub-black flex justify-between items-center"
                >
                  <span>
                    {key} X {value.count}
                  </span>
                  <span className="text-[20px] flex gap-[4px]">
                    {priceFormat(value.totalPrice)}
                    <span className="text-[12px] flex self-end pb-[3px]">
                      원
                    </span>
                  </span>
                </div>
              )
          )}
        <div className="text-[14px] text-sub-black flex justify-between items-center border-y-[0.5px] border-[#707070] py-[5.5px]">
          <span>총</span>
          <span className="text-[20px] flex">
            {priceFormat(finalPriceInfo.totalPay)}
            <span className="text-[12px] flex self-end pb-[3px] pl-[4px]">
              원
            </span>
          </span>
        </div>
        <div className="text-[14px] text-sub-black flex justify-between items-center">
          <span>
            예약금<span className="text-[10px] pl-[4px]">(10%)</span>
          </span>
          <span className="text-[20px] flex gap-[4px]">
            {priceFormat(finalPriceInfo.totalPay / 10)}
            <span className="text-[12px] flex self-end pb-[3px]">원</span>
          </span>
          <button
            className="bg-main-color w-[150px] h-[34px] rounded-[9px] text-white"
            onClick={handlePayment}
          >
            예약금 결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceInfo;
