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
  setCountryClick,
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
  } = useGetPackages(tagSubmit, countryClick);

  useEffect(() => {
    // console용 useEffect
    console.log(packageData);
  }, [packageData]);

  useEffect(() => {
    if (tagData) {
      console.log(`tagData`, tagData);
      setPackageData(tagData);
    }
  }, [tagData]);

  useEffect(() => {
    if (countryData && !tagSubmit) {
      console.log(`country`, countryData);
      setPackageData(countryData);
    }
    console.log(countryClick);
  }, [countryData, countryClick, tagSubmit]);

  useEffect(() => {
    if (tagSubmit) {
      // 모든 태그가 비어있는 경우, 전체 데이터로 패키지 데이터 업데이트
      if (Object.values(tagCheckList).every((list) => list.length === 0)) {
        setTagSubmit(false);
        setCountryClick("");
      } else {
        mutate();
      }
      setTagSubmit(false);
    }
  }, [
    tagSubmit,
    mutate,
    tagCheckList,
    countryData,
    setTagSubmit,
    setCountryClick,
  ]);

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
    <div className="flex flex-col gap-[52px] w-full items-center">
      {packageData.map((data, idx) => (
        <PackageBox packageData={data} key={idx} />
      ))}
    </div>
  );
};

export default PackageBoxGroup;
