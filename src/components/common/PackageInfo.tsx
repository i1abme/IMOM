import { PackageInfoProps } from "../../types/package";

const PackageInfo = ({
  country,
  name,
  summary,
  price,
  hashTag,
  page,
}: PackageInfoProps) => {
  const excludingCountry = (name: string, country: string): string => {
    return name.replace(country, "");
  };

  return (
    <div
      className={`
        ${
          page !== "traveldetail"
            ? "flex justify-between w-full max-xsm:flex-col"
            : "flex flex-col justify-between w-full"
        } `}
    >
      <div className="flex flex-col max-xsm:mx-[16px]">
        <span className="text-[20px] max-xsm:text-[18px] max-xsm:tracking-[-0.9px]">
          <strong>{country}</strong>
          {excludingCountry(name, country)}
        </span>
        <span className="text-[14px] font-black  max-xsm:tracking-[-0.7px]">
          {summary}
        </span>
        <div className="flex items-start max-xsm:hidden">
          {page !== "traveldetail" && (
            <>
              <span className="text-[10px] gap-[6px]">최저가</span>
              <span className="text-[20px]">{price}원~</span>
            </>
          )}
        </div>
      </div>
      <div
        className={`flex gap-x-[10px] text-[14px] font-light flex-wrap h-fit mt-[12px] ${
          page === "traveldetail"
            ? "justify-start"
            : "justify-end max-xsm:flex-start"
        } max-xsm:text-[12px] max-xsm:self-start max-xsm:mx-[16px]`}
      >
        {hashTag
          .replace("#", "")
          .split("#")
          .map((tag, idx) => (
            <span
              key={`${tag}_${name}_${idx}`}
              className="flex flex-shrink-0 h-fit"
            >
              #{tag}
            </span>
          ))}
      </div>
      <div className="self-end mt-[12px] hidden max-xsm:mx-[16px] max-xsm:flex">
        {page !== "traveldetail" && (
          <>
            <span className="text-[10px] gap-[6px]">최저가</span>
            <span className="text-[20px]">{price}원~</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageInfo;
