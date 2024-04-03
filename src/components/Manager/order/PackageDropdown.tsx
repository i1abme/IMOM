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
  selected,
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

  const handleSelect = (value: string, id: string) => {
    const packageId =
      value === "전체"
        ? { packageId: "" }
        : packages.find((packages) => packages.packageName === value);
    if (packageId && packageId.packageId !== null)
      handleClick(packageId.packageId, id, value);
  };

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
        onChange={(e) => handleSelect(e.target.value, "packageId")}
        className={`${selectStyle ? selectStyle : ""}`}
        value={selected}
      >
        {packages.map((data, idx) => (
          <option
            key={`${data.packageName}_${idx}`}
            value={data.packageName}
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
