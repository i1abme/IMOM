import React from "react";

interface ProductIconProps {
  title: string;
  firstLabel: string;
  secondLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  flagCarrier: string;
  tourConductor: string;
  shopping: string;
  optionalTour: string;
}

const ProductIcon = ({
  title,
  firstLabel,
  secondLabel,
  onChange,
  flagCarrier,
  tourConductor,
  shopping,
  optionalTour,
}: ProductIconProps) => {
  return (
    <div className="flex border w-full">
      <div className="ml-5 w-40">{title}</div>
      <div className="flex items-center">
        <input
          type="radio"
          name={title}
          value={firstLabel}
          onChange={onChange}
          required
          checked={
            (title === "비행기 국적" && firstLabel === flagCarrier) ||
            (title === "인솔자 동행" && firstLabel === tourConductor) ||
            (title === "쇼핑 유무" && firstLabel === shopping) ||
            (title === "선택 관광 유무" && firstLabel === optionalTour)
          }
        />
        <div className="w-20">{firstLabel}</div>
        <input
          type="radio"
          name={title}
          value={secondLabel}
          onChange={onChange}
          checked={
            (title === "비행기 국적" && secondLabel === flagCarrier) ||
            (title === "인솔자 동행" && secondLabel === tourConductor) ||
            (title === "쇼핑 유무" && secondLabel === shopping) ||
            (title === "선택 관광 유무" && secondLabel === optionalTour)
          }
          required
        />
        <span>{secondLabel}</span>
      </div>
    </div>
  );
};

export default ProductIcon;
