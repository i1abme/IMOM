import { Product, Prices } from "../../types/product";
import PriceInfo from "./PriceInfo";
import SummaryTable from "./SummaryTable";

const ProductDetail = ({
  info,
  prices,
}: {
  info: Product;
  prices: Prices[];
}) => {
  return (
    <div className="text-sub-black">
      <div className="flex flex-col gap-[20px]">
        <h2 className="font-bold text-main-color">여행개요</h2>
        <SummaryTable
          productId={info.productCode}
          startDate={info.startDate}
          endDate={info.endDate}
          airline={info.airline}
          minCount={info.minCount}
        />
        <div className="w-[460px] flex h-fit border border-main-color items-center">
          <span className="text-[12px] p-[6px] shrink-0 h-full">여행지역</span>
          <span className="text-[10px] p-[6px] grow border-l border-main-color ">
            {info.travelRegion}
          </span>
        </div>
        <div className="w-[460px]">
          <h2 className="font-bold text-main-color flex">여행 요금 안내</h2>
          <div className="flex w-full">
            {prices &&
              prices.map((item) => (
                <PriceInfo
                  key={item.age}
                  age={item.age}
                  price={item.surcharge + item.price}
                  surcharge={item.surcharge}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
