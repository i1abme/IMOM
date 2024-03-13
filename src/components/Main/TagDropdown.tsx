import { FilterDropdownProps } from "../../types/dropdown";
import { TagData } from "../../types/tag";

const TagDropdown = ({
  list,
  id,
  handleClick,
  label,
  divStyle,
}: FilterDropdownProps<TagData>) => {
  return (
    <div
      className={`border-b-[2px] border-main-color px-[30px] ${
        divStyle ? divStyle : ""
      }`}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} onChange={(e) => handleClick(e.target.value, id)}>
        {list.map((data) => (
          <option key={data.tagContent} value={data.tagId}>
            {data.tagContent}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagDropdown;
