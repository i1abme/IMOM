import { amountFormat } from "../../utils/amountFormat";

type PriceInfoProps = {
  age: string;
  price: number;
  surcharge: number;
};

const PriceInfo = ({ age, price, surcharge }: PriceInfoProps) => {
  return (
    <div className="flex flex-col items-center border-main-color border-[1px] first:border-r-0 last:border-l-0 w-full py-[16px]">
      <span className="text-[12px]">{age}</span>
      <span className="text-[14px]">{`${amountFormat(price)}원`}</span>
      <span className="text-[8px]">유류할증 포함</span>
      <span className="text-[14px]">{`${amountFormat(surcharge)}원`}</span>
    </div>
  );
};
export default PriceInfo;
