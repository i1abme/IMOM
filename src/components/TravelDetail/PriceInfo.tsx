import { AGE_GUIDE } from "../../constants/productdata";
import { amountFormat } from "../../utils/amountFormat";

const PriceInfo = ({
  age,
  price,
  surcharge,
}: {
  age: string;
  price: number;
  surcharge: number;
}) => {
  return price === 0 ? (
    <div
      className="flex flex-col items-center justify-center border-main-color border-[1px] first:border-r-0 last:border-l-0 w-full py-[16px] px-[12px]
    max-xsm:border-[0.5px] max-xsm:border-r-0 max-xsm:p-0 max-xsm:justify-start"
    >
      <div className="flex flex-col w-full text-center max-xsm:bg-main-color max-xsm:bg-opacity-[0.1] max-xsm:pt-[6px] max-xsm:pb-[2px]">
        <span className="text-[12px]">{age}</span>
        <span className="text-[8px] tracking-[-0.4px]">
          {AGE_GUIDE[age as keyof typeof AGE_GUIDE]}
        </span>
      </div>
      <span className="text-[12px] text-red-700 text-center max-xsm:pt-[20px] max-xsm:px-[8px]">
        {`${age}동반이 불가능한 상품입니다.`}
      </span>
    </div>
  ) : (
    <div
      className="flex flex-col items-center border-main-color border-[1px] first:border-x-0 last:border-x-0 w-full py-[16px] px-[12px] 
      max-xsm:py-0 max-xsm:px-0 max-xsm:pb-[6px] max-xsm:border-[0.5px]"
    >
      <div className="flex flex-col w-full text-center max-xsm:bg-main-color max-xsm:bg-opacity-[0.1] max-xsm:pt-[6px] max-xsm:pb-[2px]">
        <span className="text-[12px]">{age}</span>
        <span className="text-[8px] tracking-[-0.4px]">
          {AGE_GUIDE[age as keyof typeof AGE_GUIDE]}
        </span>
      </div>
      <span className="text-[14px] max-xsm:pt-[6px]">{`${amountFormat(
        price
      )}원`}</span>
      <hr className="w-full my-[6px] bg-main-color hidden max-xsm:block border-0 h-[0.5px]" />
      <span className="text-[8px]">(포함된 유류할증 예상금액)</span>
      <span className="text-[14px]">{`${amountFormat(surcharge)}원`}</span>
    </div>
  );
};
export default PriceInfo;
