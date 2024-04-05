import { TagBtnProps } from "../../types/tag";

const TagBtn = ({
  list = [],
  tagStyle = "",
  tagFor = "",
  handleCheck,
  checkList = [],
}: TagBtnProps) => {
  return (
    <div
      className={`flex text-sub-black text-[14px] justify-center gap-[7px] font-light ${tagStyle}`}
    >
      {list.map((item) => (
        <div className="flex cursor-pointer" key={item.tagContent}>
          <input
            type="checkbox"
            id={item.tagContent}
            className="mb-[2px] ml-[2px] cursor-pointer"
            onChange={(e) =>
              handleCheck && handleCheck(e.target.checked, tagFor, item.tagId)
            }
            checked={checkList.includes(item.tagId)}
          />
          <label htmlFor={item.tagContent} className="px-[4px] cursor-pointer">
            {item.tagContent}
          </label>
        </div>
      ))}
    </div>
  );
};
export default TagBtn;
