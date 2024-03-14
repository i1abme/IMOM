import TagDropdown from "./TagDropdown.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetTags from "../../queries/tags/useGetTags";
import { TagCheckList } from "../../types/tag";

const FilterBox = ({ name = "우리" }) => {
  const { data, isPending, isError, error } = useGetTags();
  const navigate = useNavigate();

  const [tagCheckList, setTagCheckList] = useState<TagCheckList>({
    priceList: [],
    familyList: [],
    themeList: [],
    seasonList: [],
  });

  const handleClick = (value: string, id: string) => {
    const tagId = +value;
    if (tagCheckList[id as keyof typeof tagCheckList]) {
      setTagCheckList((prevState) => {
        let updatedList = structuredClone(prevState);
        updatedList = { ...updatedList, [id]: [tagId] };
        return updatedList;
      });
    }
  };

  const handleSubmit = () => {
    navigate("/travelproduct", { state: { tagCheckList } });
  };

  useEffect(() => {
    if (data) {
      setTagCheckList((prevState) => ({
        ...prevState,
        priceList: data.priceList ? [data.priceList[0].tagId] : [],
        familyList: data.familyList ? [data.familyList[0].tagId] : [],
        themeList: data.themeList ? [data.themeList[0].tagId] : [],
        seasonList: data.seasonList ? [data.seasonList[0].tagId] : [],
      }));
    }
  }, [data]);

  useEffect(() => {
    console.log(tagCheckList);
  }, [tagCheckList]);

  if (isPending) {
    return <div>로딩 중...</div>;
  }
  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  return (
    <>
      {data && (
        <div className="w-[850px] justify-between h-[320px] rounded-[40px] flex px-[35px] py-[35px] text-sub-black text-[20px] border-main-color border-[2px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-row gap-[24px]">
              <span>{name}는</span>
              <TagDropdown
                list={data.familyList}
                id={"familyList"}
                handleClick={handleClick}
              />
              <span>입니다.</span>
            </div>
            <div className="flex flex-row gap-[24px]">
              <span>아이들은</span>
              <TagDropdown
                list={data.priceList}
                id={"priceList"}
                handleClick={handleClick}
              />
              <span>입니다.</span>
            </div>
            <div className="flex flex-row gap-[24px]">
              <span>특별히</span>
              <TagDropdown
                list={data.seasonList}
                id={"seasonList"}
                handleClick={handleClick}
              />
              <span>으로</span>
            </div>
            <div className="flex flex-row gap-[24px]">
              <TagDropdown
                list={data.themeList}
                id={"themeList"}
                handleClick={handleClick}
              />
              <span>시기에</span>
            </div>
            <span>추억에 남는 여행을 떠나려고 합니다 :)</span>
          </div>
          <div
            className="w-[327px] h-[250px] rounded-[40px] overflow-hidden bg-main-color hover:bg-sub-black hover:bg-opacity-[0.5]"
            onClick={handleSubmit}
          >
            <img
              className="w-[327px] h-[250px]"
              src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=5108&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default FilterBox;
