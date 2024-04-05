import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetTags from "../../queries/tags/useGetTags";
import { TagCheckList } from "../../types/tag";
import useGetUserChildName from "../../queries/users/useGetUserChildName";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginCheck, userChildName } from "../../atom/atom";
import FilterBoxImg from "/public/main_filterbox.png";
import TagDropdown from "./TagDropdown";

const FilterBox = () => {
  const isLogin = useRecoilValue(loginCheck);
  const [name, setName] = useRecoilState(userChildName);
  const { data, isPending, isError, error } = useGetTags();
  const { data: childNameData } = useGetUserChildName(isLogin);
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
    if (childNameData && childNameData.childName.length > 0)
      setName(childNameData?.childName);
  }, [childNameData, setName]);

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
        <div
          className="w-[850px] justify-between h-fit rounded-[40px] flex px-[35px] py-[35px] items-center
        text-sub-black text-[18px] border-main-color border-[2px] tracking-[-0.9px] max-xsm:max-w-[342px] 
        max-xsm:h-[217px] max-xsm:text-[12px] max-xsm:py-[24px] max-xsm:px-[16px] max-xsm:justify-center max-xsm:rounded-[20px]
        max-xsm:w-full"
        >
          <div className="flex flex-col gap-[20px] max-xsm:gap-1 max-xsm:w-full">
            <div className="flex flex-row max-xsm:flex-col max-xsm:gap-[6px]">
              <span className="max-xsm:hidden">{name}(이)네는</span>
              <span className="hidden max-xsm:flex">
                어떤 여행을 희망하세요?
              </span>
              <TagDropdown
                list={data.familyList}
                id={"familyList"}
                handleClick={handleClick}
                label="구성원"
              />
            </div>
            <div className="flex flex-row max-xsm:flex-col">
              <span>여행 시기는</span>
              <TagDropdown
                list={data.seasonList}
                id={"seasonList"}
                handleClick={handleClick}
                label="시기"
              />
            </div>
            <div className="flex flex-row max-xsm:flex-col">
              <span>예산은</span>
              <TagDropdown
                list={data.priceList}
                id={"priceList"}
                handleClick={handleClick}
                label="예산"
              />
            </div>
            <div className="flex flex-row max-xsm:flex-col">
              <span>{name}(이)하고</span>
              <TagDropdown
                list={data.themeList}
                id={"themeList"}
                handleClick={handleClick}
                label="테마"
              />
            </div>
            <div className="flex flex-col gap-[12px] items-center max-xsm:hidden">
              <span>
                오랫동안 추억에 남을 {name}(이)네 가족여행을 추천해 주세요!
              </span>
              <button
                className="rounded-[20px] bg-main-color text-white text-[18px] py-[8px] px-[36px] w-fit max-xsm:hidden"
                onClick={handleSubmit}
              >
                추천받기
              </button>
            </div>
          </div>
          <div
            className="w-[327px] h-[250px] rounded-[40px] overflow-hidden bg-cover bg-center max-xsm:hidden"
            style={{ backgroundImage: `url(${FilterBoxImg})` }}
          />
        </div>
      )}
      <button
        className="hidden rounded-[20px] tracking-[-0.9px] bg-main-color text-white text-[18px] py-[6px] px-[36px] w-fit max-xsm:block"
        onClick={handleSubmit}
      >
        추천받기
      </button>
    </>
  );
};
export default FilterBox;
