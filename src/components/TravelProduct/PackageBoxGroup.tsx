import { useEffect, useState } from "react";
import usePostTags from "../../queries/tags/usePostTags";
import PackageBox from "./PackageBox";
import { Package, PackageBoxGroupProps } from "../../types/package";
import useGetPackages from "../../queries/packages/useGetPackages";

const PackageBoxGroup = ({
  setTagSubmit,
  tagSubmit,
  countryClick,
  tagCheckList,
}: PackageBoxGroupProps) => {
  const [packageData, setPackageData] = useState<Package[] | []>([]);

  const {
    mutate,
    data: tagData,
    isPending: isTagPending,
    isError: isTagError,
    error: tagError,
  } = usePostTags(tagCheckList);

  const {
    data: countryData,
    isPending: isCountryPending,
    isError: isCountryError,
    error: countryError,
  } = useGetPackages(countryClick);

  console.log("tagData", tagData);
  console.log("countryData", countryData);

  useEffect(() => {
    // console용 useEffect
    console.log(packageData);
  }, [packageData]);

  useEffect(() => {
    if (tagData) {
      setPackageData(tagData);
    }
  }, [tagData]);

  useEffect(() => {
    if (countryData) {
      setPackageData(countryData);
    }
  }, [countryData, countryClick]);

  useEffect(() => {
    if (tagSubmit === true) {
      if (Object.values(tagCheckList).every((list) => list.length === 0)) {
        setPackageData(() => countryData || []);
      } else {
        mutate();
        setTagSubmit(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagSubmit, mutate, setTagSubmit]);

  if (isTagPending || isCountryPending) {
    return <div>로딩 중...</div>;
  }
  if (isTagError || isCountryError) {
    return <div>에러 발생: {tagError?.message || countryError?.message}</div>;
  }
  if (!packageData) {
    return <div>데이터가 없습니다.</div>;
  }
  if (packageData.length < 1) {
    return <div>해당 상품이 없습니다.</div>;
  }
  return (
    <div className="flex flex-col gap-[52px]">
      {packageData.map((data, idx) => (
        <PackageBox packageData={data} key={idx} />
      ))}
    </div>
  );
};

export default PackageBoxGroup;
