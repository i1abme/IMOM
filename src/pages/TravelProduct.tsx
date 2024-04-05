import { FormEvent, useEffect, useState } from "react";
import TagBtnGroup from "../components/TravelProduct/TagBtnGroup";
import CountryBtns from "../components/TravelProduct/CountryBtns";
import { useLocation, useParams } from "react-router-dom";
import PackageBoxGroup from "../components/TravelProduct/PackageBoxGroup";
import { TagCheckList } from "../types/tag";
import CountryInfo from "../components/TravelProduct/CountryInfo";

const TravelProduct = () => {
  const location = useLocation();
  const { category } = useParams();
  const [tagCheckList, setTagCheckList] = useState<TagCheckList>({
    priceList: [],
    familyList: [],
    themeList: [],
    seasonList: [],
  });

  const [tagSubmit, setTagSubmit] = useState<boolean>(false);

  const [countryClick, setCountryClick] = useState<string>("");

  useEffect(() => {
    if (location.state?.tagCheckList) {
      setTagCheckList(location.state.tagCheckList);
      setTagSubmit(true);
    }
    if (category) {
      setCountryClick(category);
      setTagCheckList({
        priceList: [],
        familyList: [],
        themeList: [],
        seasonList: [],
      });
    }
    if (!category) {
      setCountryClick("");
    }
  }, [location.state, category]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setTagSubmit(true);
    setCountryClick("");
  };

  const handleResetTags = () => {
    setTagSubmit(true);
    setTagCheckList({
      priceList: [],
      familyList: [],
      themeList: [],
      seasonList: [],
    });
  };

  const handelCheck = (checked: boolean, type: string, id: number): void => {
    setTagCheckList((prevState) => {
      const updatedList = structuredClone(prevState);
      updatedList[type as keyof typeof updatedList] = checked
        ? [...updatedList[type as keyof typeof updatedList], id]
        : updatedList[type as keyof typeof updatedList].filter(
            (el) => el !== id
          );
      return updatedList;
    });
  };

  return (
    <div className="w-full h-auto flex flex-row gap-[1%] justify-center max-xsm:mb-[50px]">
      <TagBtnGroup
        name="우리"
        handleCheck={handelCheck}
        handleSubmit={handleSubmit}
        tagCheckList={tagCheckList}
        handleResetTags={handleResetTags}
      />
      <div className="flex flex-col grow max-w-[850px] mr-[12%] items-center gap-[16px] max-xsm:mr-0">
        <div className="bg-main-color h-[90px] rounded-b-[20px] absolute z-[-999] w-full hidden max-xsm:block" />
        <CountryBtns countryClick={countryClick} />
        <button
          type="button"
          className=" bg-main-color text-[16px] flex gap-[4px]
          text-[#FFF4E3] px-[22px] py-[4px] rounded-[12px] tracking-[-0.8px]"
          onClick={handleResetTags}
        >
          여행지역 초기화
        </button>
        {countryClick !== "" && <CountryInfo country={countryClick} />}
        <PackageBoxGroup
          setTagSubmit={setTagSubmit}
          tagSubmit={tagSubmit}
          countryClick={countryClick}
          tagCheckList={tagCheckList}
          setCountryClick={setCountryClick}
        />
      </div>
    </div>
  );
};

export default TravelProduct;
