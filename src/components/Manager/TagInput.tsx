import React from "react";

interface TagTitleProps {
  title: string;
  category: string;
  id: number;
  handleTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const TagInput = ({
  title,
  handleTagsChange,
  category,
  checked,
}: TagTitleProps) => {
  return (
    <div className="flex items-center max-w-full ">
      <input
        id={title}
        type="checkbox"
        className="w-full outline-none border border-black mx-2"
        onChange={(e) => handleTagsChange(e)}
        value={title}
        name={category}
        checked={checked}
      />
      <label htmlFor={title} className="whitespace-nowrap">
        {title}
      </label>
    </div>
  );
};

export default TagInput;
