import { FilterDropdownProps } from "../../types/dropdown";

const FilterDropdown = ({
  list,
  id,
  handleClick,
  label,
  divStyle,
  labeStyle,
  selectStyle,
  optionStyle,
}: FilterDropdownProps<string | number>) => {
  return (
    <div className={`${divStyle ? divStyle : ""}`}>
      {label && (
        <label htmlFor={id} className={`${labeStyle ? labeStyle : ""}`}>
          {label}
        </label>
      )}
      <select
        id={id}
        onChange={(e) => handleClick(e.target.value, id)}
        className={`${selectStyle ? selectStyle : ""}`}
      >
        {list.map((data) => (
          <option
            key={data}
            value={data}
            className={`${optionStyle ? optionStyle : ""}`}
          >
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
