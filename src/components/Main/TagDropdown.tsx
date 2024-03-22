import { useRef, useState } from "react";
import { FilterDropdownProps } from "../../types/dropdown";
import { TagData } from "../../types/tag";
import IconDown from "../../../public/icon_down.svg";
import IconCheck from "../../../public/icon_check.svg";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const TagDropdown = ({
  list,
  id,
  handleClick,
  label,
}: FilterDropdownProps<TagData>) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSeleted] = useState(label);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleTagClick = (tagId: number, tagContent: string) => {
    closeDropdown();
    handleClick(`${tagId}`, id);
    setSeleted(tagContent);
  };

  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      <div
        className={`border-b-[2px] border-main-color px-[30px] inline-flex justify-center text-main-color`}
        ref={dropdownRef}
      >
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex justify-center w-full pl-2 items-center min-w-[200px] gap-[4px]"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span className="w-full">{selected}</span>
          <img src={IconDown} alt="arrow" />
        </button>
        {isOpen && (
          <ul
            className="absolute rounded-md shadow-lg flex flex-col py-[12px] w-fit overflow-y-scroll
             bg-white max-h-[150px] h-fit mt-[30px] text-[16px] text-sub-black"
          >
            {list.map((data) => (
              <li
                key={data.tagContent}
                value={data.tagId}
                className={`${
                  data.tagContent === selected && "bg-slate-100 justify-between"
                } cursor-pointer flex gap-[4px] px-[24px] py-[6px] hover:bg-slate-50 justify-end`}
                onClick={() => handleTagClick(data.tagId, data.tagContent)}
              >
                {data.tagContent === selected && (
                  <img src={IconCheck} alt="check" />
                )}
                <span>{data.tagContent}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TagDropdown;
