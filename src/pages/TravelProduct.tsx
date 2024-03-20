import { FormEvent, useEffect, useState } from "react";
import TagBtnGroup from "../components/TravelProduct/TagBtnGroup";
import CountryBtns from "../components/TravelProduct/CountryBtns";
import { useLocation, useParams } from "react-router-dom";
import PackageBoxGroup from "../components/TravelProduct/PackageBoxGroup";
import { TagCheckList } from "../types/tag";

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
    }
    if (!category) {
      setCountryClick("");
    }
  }, [location.state, category]);

  useEffect(() => {
    console.log(tagCheckList);
  }, [tagCheckList]);

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
    <div className="w-full h-auto flex flex-row gap-[1%] justify-center py-[216px]">
      <TagBtnGroup
        name="우리"
        handleCheck={handelCheck}
        handleSubmit={handleSubmit}
        tagCheckList={tagCheckList}
        handleResetTags={handleResetTags}
      />
      <div className="flex flex-col grow max-w-[850px] mr-[12%] items-center">
        <CountryBtns countryClick={countryClick} />
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
