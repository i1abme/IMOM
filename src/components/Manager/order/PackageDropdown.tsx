import { useEffect, useState } from "react";
import useGetPackageName from "../../../queries/packages/useGetPackageNames";
import { PackageDropdownProps } from "../../../types/dropdown";
import { PackageName } from "../../../types/package";

const PackageDropdown = ({
  handleClick,
  label,
  divStyle,
  selectStyle,
  optionStyle,
}: PackageDropdownProps) => {
  const [packages, setPackages] = useState<PackageName[]>([
    {
      packageId: null,
      packageName: "전체",
    },
  ]);

  const { data, isPending, isError, error } = useGetPackageName();

  useEffect(() => {
    if (data) {
      setPackages(() => [
        {
          packageId: null,
          packageName: "전체",
        },
        ...data,
      ]);
    }
  }, [data]);

  if (isPending) {
    <div>로딩중</div>;
  }
  if (isError) {
    <div>{error?.message}</div>;
  }
  return (
    <div className={`${divStyle ? divStyle : ""}`}>
      {label && <label htmlFor={"packageId"}>{label}</label>}
      <select
        id={"packageId"}
        onChange={(e) => handleClick(e.target.value, "packageId")}
        className={`${selectStyle ? selectStyle : ""}`}
      >
        {packages.map((data, idx) => (
          <option
            key={`${data.packageName}_${idx}`}
            value={data.packageId ?? ""}
            about={data.packageName}
            className={`${optionStyle ? optionStyle : ""}`}
          >
            {data.packageName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PackageDropdown;
