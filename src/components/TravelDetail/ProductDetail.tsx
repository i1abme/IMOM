import { MOBILE_PRODUCT_SUMMARY } from "../../constants/productdata";
import { Product, Prices } from "../../types/product";
import { dateFormat } from "../../utils/dateFormat";
import PriceInfo from "./PriceInfo";
import SummaryTable from "./SummaryTable";
import "./SummaryTable.css";

const ProductDetail = ({
  info,
  prices,
}: {
  info: Product;
  prices: Prices[];
}) => {
  return (
    <div className="text-sub-black max-xsm:w-full max-xsm:m-[16px]">
      <div className="flex flex-col gap-[20px] w-[490px] max-xsm:w-full max-xsm:gap-[10px]">
        <h2 className="font-bold text-main-color">여행개요</h2>
        <SummaryTable
          productCode={info.productCode}
          startDate={info.startDate}
          endDate={info.endDate}
          airline={info.airline}
          minCount={info.minCount}
        />
        <div className="w-full hidden flex-wrap summarytable max-xsm:flex">
          {MOBILE_PRODUCT_SUMMARY.map((item) => (
            <div
              key={item.key}
              className={` text-sub-black flex flex-col w-[33%]
              max-xsm:text-[10px] max-xsm:tracking-[-0.5px] items-center text-center`}
            >
              <span className="py-[8px] bg-main-color bg-opacity-[0.1] w-full px-[20px]">
                {item.label}
              </span>
              <span className="border-main-color border-t-[0.5px] py-[8px] w-full px-[6px]">
                {item.key === "startDate" || item.key === "endDate"
                  ? dateFormat(`${info[item.key as keyof typeof info]}`)
                  : info[item.key as keyof typeof info]}
              </span>
            </div>
          ))}
        </div>
        <div
          className="w-full flex h-fit border border-main-color items-center 
        max-xsm:border-x-[0px] max-xsm:border-y-[0.5px]"
        >
          <span className="text-[12px] p-[6px] shrink-0 max-xsm:w-[33%] text-center">
            여행지역
          </span>
          <span
            className="text-[10px] p-[6px] grow border-l border-main-color h-full min-h-[30px]
          max-xsm:border-l-[0.5px]"
          >
            {info.travelRegion}
          </span>
        </div>
        <div className="w-full max-xsm:mt-[30px]">
          <h2 className="font-bold text-main-color flex">여행 요금 안내</h2>
          <div className="flex w-full flex-col items-center gap-[8px]">
            <div className="flex w-full">
              {prices &&
                prices.map((item) => (
                  <PriceInfo
                    key={item.age}
                    age={item.label}
                    price={item.surcharge + item.price}
                    surcharge={item.surcharge}
                  />
                ))}
            </div>
            <span className="text-[8px] tracking-[-0.4px]">
              *유류할증 금액은 예상금액이며 티켓팅 시점의 국제유가와 환율 등에
              따라 예약 후 변동 될 수 있습니다.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
