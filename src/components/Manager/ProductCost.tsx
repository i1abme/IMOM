import React from "react";

interface ProductCostProps {
  title1: string;
  title2: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  adultPrice: string;
  adultSurcharge: string;
  childPrice: string;
  childSurcharge: string;
  infantPrice: string;
  infantSurcharge: string;
}

const ProductCost = ({
  title1,
  title2,
  onChange,
  required,
  adultPrice,
  adultSurcharge,
  childPrice,
  childSurcharge,
  infantPrice,
  infantSurcharge,
}: ProductCostProps) => {
  return (
    <div className="flex border-b border-black w-full">
      <div className="flex items-center">
        <div className="whitespace-nowrap mx-5">{title1}</div>
        <input
          name={title1}
          className="outline-none border"
          onChange={onChange}
          required={required}
          type="number"
          placeholder="숫자만 입력해주세요"
          value={
            title1 === "성인 총액"
              ? adultPrice
              : title1 === "아동 총액"
              ? childPrice
              : title1 === "유아 총액"
              ? infantPrice
              : ""
          }
        />
      </div>
      <div className="flex items-center">
        <div className="whitespace-nowrap mx-5">{title2}</div>
        <input
          name={title2}
          className="outline-none border"
          onChange={onChange}
          required={required}
          type="number"
          placeholder="숫자만 입력해주세요"
          value={
            title2 === "성인 유류 할증료"
              ? adultSurcharge
              : title2 === "아동 유류 할증료"
              ? childSurcharge
              : title2 === "유아 유류 할증료"
              ? infantSurcharge
              : ""
          }
        />
      </div>
    </div>
  );
};

export default ProductCost;
