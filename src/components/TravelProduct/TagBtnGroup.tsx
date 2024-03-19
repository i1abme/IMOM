import TagBtn from "../common/TagBtn";
import { TAG_TITLE } from "../../constants/tagdata";
import useGetTags from "../../queries/tags/useGetTags";
import { FormEvent } from "react";
import { TagBtnGroupProps, TagCheckList, TagData } from "../../types/tag";

const TagBtnGroup = ({
  name = "우리",
  handleCheck,
  handleSubmit,
  tagCheckList,
  handelResetTags,
}: TagBtnGroupProps) => {
  const { data, isPending, isError, error } = useGetTags();

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
    <form
      className="my-[66px] min-w-[200px] text-main-color"
      onSubmit={(e: FormEvent) => handleSubmit(e)}
    >
      <h1 className="text-[20px] font-bold">{name}(이)와 함께</h1>
      {data &&
        Object.entries(data).map(([key, value]) => (
          <div id={key} key={key} className="flex flex-col mb-[48px]">
            <h2 className="text-[14px] font-bold">
              {TAG_TITLE[key as keyof typeof TAG_TITLE]}
            </h2>
            <TagBtn
              list={value as TagData[]}
              tagStyle="flex-col"
              tagFor={key}
              handleCheck={handleCheck}
              checkList={tagCheckList[key as keyof TagCheckList]}
            />
          </div>
        ))}
      <div className="flex gap-[10px]">
        <button
          type="button"
          className="rounded-[15px] border-main-color border-[1px] text-sub-black text-[10px] text-center py-[4px] px-[20px] self-center"
          aria-label="초기화"
          onClick={handelResetTags}
        >
          초기화
        </button>
        <button
          type="submit"
          className="rounded-[15px] bg-main-color text-white text-[10px] text-center py-[4px] px-[20px] self-center"
          aria-label="태그 검색하기"
        >
          검색하기
        </button>
      </div>
    </form>
  );
};
export default TagBtnGroup;
