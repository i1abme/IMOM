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
      className={
        `${page}` !== "traveldetail"
          ? "flex justify-between w-full"
          : "flex flex-col justify-between w-full"
      }
    >
      <div className="flex flex-col">
        <span className="text-[20px]">
          <strong>{country}</strong>
          {excludingCountry(name, country)}
        </span>
        <span className="text-[14px] font-black">{summary}</span>
        <div className="flex items-start">
          {page !== "traveldetail" && (
            <>
              <span className="text-[10px] gap-[6px]">최저가</span>
              <span className="text-[20px]">{price}원~</span>
            </>
          )}
        </div>
      </div>
      <div
        className={`flex gap-x-[10px] text-[12px] font-light flex-wrap h-fit mt-[13px] ${
          page === "traveldetail" ? "justify-start" : "justify-end"
        } `}
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
    </div>
  );
};

export default PackageInfo;
