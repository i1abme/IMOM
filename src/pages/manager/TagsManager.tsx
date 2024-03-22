import React, { useState } from "react";
import ManagerTitle from "../../components/Manager/ManagerTitle";
import { tagTitle } from "../../constants/data";
import { MdOutlineCancel } from "react-icons/md";
import { useGetTags } from "../../api/useGetTags";
import { baseInstance } from "../../api/instance";

type TagItem = {
  tagId: number;
  tagContent: string;
};

type TagTitle = {
  title: string;
  category: string;
};

const TagsManager = () => {
  const { tagsData, setFetchState, tagLengths } = useGetTags({
    params: "tags",
  });
  const [tagInputs, setTagInputs] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const truncatedValue = value.slice(0, 14);

    setTagInputs((prevInputs) => ({
      ...prevInputs,
      [name]: truncatedValue,
    }));
  };
  const handleEnterKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    el: TagTitle
  ) => {
    if (e.code === "Enter") {
      try {
        baseInstance.post("/tags/create", {
          tagType: el.title,
          tagContent: tagInputs[el.title],
        });
        setTagInputs((prevInputs) => ({
          ...prevInputs,
          [el.title]: "",
        }));
        setFetchState(true);
      } catch (error) {
        console.error("에러 발생:", error);
      }
    }
  };
  const handleDeleteClick = ({ itemId }: { itemId: number }) => {
    try {
      baseInstance.delete(`/tags/${itemId}`);
      setFetchState(true);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div className="w-full">
      <ManagerTitle title="태그목록" />
      {tagTitle.map((el: TagTitle, idx) => (
        <div key={idx}>
          <table className="border w-full bg-title-box">
            <tbody>
              <tr>
                <th className="border-r w-28">{el.title}</th>
                <td>
                  <input
                    type="text"
                    name={el.title}
                    placeholder="태그는 10개로 제한됩니다."
                    onChange={handleInputChange}
                    onKeyPress={(e) => handleEnterKeyDown(e, el)}
                    className="w-full outline-none"
                    value={tagInputs[el.title] || ""}
                    disabled={!tagLengths[el.category]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center flex-wrap overflow-hidden w-full">
            {tagsData[el.category] &&
              tagsData[el.category].map((item: TagItem) => (
                <div
                  className="flex items-center bg-title-box rounded-full px-2 whitespace-nowrap my-4 mx-2"
                  key={item.tagId}
                >
                  <div className="max-w-full overflow-hidden">
                    {item.tagContent}
                  </div>
                  <MdOutlineCancel
                    className="cursor-pointer hover:text-red-400"
                    key={item.tagId}
                    onClick={() => handleDeleteClick({ itemId: item.tagId })}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagsManager;
