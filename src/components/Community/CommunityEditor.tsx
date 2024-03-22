import React, { useEffect, useState } from "react";
import UiEditor from "../common/UiEditor";
import { baseInstance } from "../../api/instance";
import { useLocation, useNavigate } from "react-router-dom";

type CommunityDataType = {
  title: string;
  postId: number;
  type: string;
  content: string;
  bolgUrl: string;
};
type CommunityType = {
  active: string;
};

const CommunityEditor = ({ active }: CommunityType) => {
  // 공지사항,자주묻는질문,여행이야기
  const navigation = useNavigate();
  const { state } = useLocation();

  const [title, setTitle] = useState<string>("");
  const [communityMd, setCommunityMd] = useState<string>("");
  const [communityHtml, setCommunityHtml] = useState<string>("");
  const [blogLink, setBlogLink] = useState<string>("");
  const [editData, setEditData] = useState<CommunityDataType | null>(null);
  const [selectCategory, setSelectCategory] = useState<string>("");

  useEffect(() => {
    if (state) {
      baseInstance.get(`/posts/update/${state}`).then((res) => {
        setEditData(res.data.data);
      });
    }
  }, [state]);
  useEffect(() => {
    if (editData) {
      setSelectCategory(editData.type);
      setCommunityMd(editData.content);
      setTitle(editData.title);
      setBlogLink(editData.bolgUrl);
    }
  }, [editData]);

  const handleCommunityChange = ({
    target,
  }: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = target as HTMLSelectElement;
    if (name === "category") {
      setSelectCategory(value);
    } else if (name === "title") {
      setTitle(value);
    } else if (name === "blog") {
      setBlogLink(value);
    }
  };

  // 에디터 값
  const handleEditorChange = (htmlContent: string, markdownContent: string) => {
    setCommunityHtml(htmlContent);
    setCommunityMd(markdownContent);
  };
  // 등록하기 클릭
  const handleRegisterClick = () => {
    if (selectCategory !== "" && title !== "" && communityHtml !== "") {
      baseInstance
        .post("/posts", {
          type: selectCategory,
          title: title,
          contentHtml: communityHtml,
          contentMd: communityMd,
          blogUrl: blogLink,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("등록완료!");
            navigation(`/community/${res.data.data.postId}`);
          }
        });
    } else {
      alert("*표시는 필수 입력해주세요.");
    }
  };

  // 수정하기 클릭
  const handleEditClick = () => {
    if (selectCategory !== "" && title !== "" && communityHtml !== "") {
      baseInstance
        .put(`/posts/${state}`, {
          type: selectCategory,
          title: title,
          contentHtml: communityHtml,
          contentMd: communityMd,
          blogUrl: blogLink,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("수정완료!");
            navigation(`/community/${state}`);
          }
        });
    } else {
      alert("*표시는 필수 입력해주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex">
        <span className="text-red-500 mr-2">*</span>
        <select
          className="w-1/3 px-5 border border-main-color outline-none communitySelect mb-5"
          name="category"
          onChange={handleCommunityChange}
          value={selectCategory}
        >
          <option disabled hidden>
            카테고리
          </option>
          {["카테고리", "공지사항", "여행이야기", "자주묻는질문"].map(
            (el, idx) => (
              <option hidden={idx === 0 ? true : false} key={idx}>
                {el}
              </option>
            )
          )}
        </select>
      </div>
      <div className="w-full flex  mb-2">
        <span className="text-red-500 mr-2">*</span>
        <div className="whitespace-nowrap bg-title-box px-2 py-1">제목</div>
        <input
          name="title"
          className="w-full outline-none border border-title-box"
          onChange={handleCommunityChange}
          value={title}
        />
      </div>
      <div className="flex w-full">
        <span className="text-red-500 mr-2">*</span>
        <UiEditor onChange={handleEditorChange} initialValue={communityMd} />
      </div>
      <div className="flex w-full mt-2">
        <div className="w-full flex items-center">
          {(state === "여행이야기" || active === "여행이야기") && (
            <>
              <div className="whitespace-nowrap">네이버 블로그 링크 : </div>
              <input
                name="blog"
                className="border w-full outline-none focus:border-main-color"
                onChange={handleCommunityChange}
                value={blogLink}
              />
            </>
          )}
        </div>
        {typeof state === "string" || !state ? (
          <button
            onClick={handleRegisterClick}
            className="px-5 py-1 ml-5 bg-main-color whitespace-nowrap rounded-full text-white"
          >
            등록하기
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="px-5 py-1 ml-5 bg-main-color whitespace-nowrap rounded-full text-white"
          >
            수정하기
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityEditor;
