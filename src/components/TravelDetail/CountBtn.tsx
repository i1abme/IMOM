import { useState } from "react";
import { CountBtnProps } from "../../types/product";
import { amountFormat } from "../../utils/amountFormat";

const CountBtn = ({
  age,
  price,
  label,
  onCountChange,
  remainCount,
  productState,
}: CountBtnProps) => {
  const [count, setCount] = useState(0);

  const handleDecrease = () => {
    if (count === 0) return;
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    onCountChange(age, newCount);
  };

  const handleIncrease = () => {
    if (productState === "예약 마감") {
      alert("예약 마감된 상품입니다.");
      return;
    }
    if (remainCount === 0) {
      alert("재고가 부족합니다.");
      return;
    }
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(age, newCount);
  };

  if (price === 0) return;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-[198px]">
        <div className="flex flex-col text-[14px] text-sub-black">
          <span className="text-main-color font-bold">{label}</span>
          <span>{amountFormat(price)}원</span>
        </div>
        <div className="flex gap-[22px] items-center">
          <button
            type="button"
            onClick={handleDecrease}
            onTouchStart={handleDecrease}
            className="text-[#707070]"
          >
            -
          </button>
          <span className="text-main-color">{count}</span>
          <button
            type="button"
            onClick={handleIncrease}
            onTouchStart={handleIncrease}
            className="text-[#707070]"
          >
            +
          </button>
        </div>
      </div>
      {age === "infant" && (
        <span className="text-red-700 text-[10px] text-center">
          유아는 출발일 기준 24개월 미만이어야 합니다.
        </span>
      )}
      {age === "child" && (
        <span className="text-red-700 text-[10px] text-center">
          항공표준상 아동은 만 12세 미만이어야 합니다.
        </span>
      )}
    </div>
  );
};
export default CountBtn;
