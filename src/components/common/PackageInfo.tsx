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
            <span className="text-[10px] gap-[6px]">최저가</span>
          )}
          <span className="text-[20px]">{price}원~</span>
        </div>
      </div>
      <div className="flex gap-[10px] text-[13px] font-light">
        {hashTag
          .replace("#", "")
          .split("#")
          .map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
      </div>
    </div>
  );
};

export default PackageInfo;
