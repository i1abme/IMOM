import React, { SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { baseInstance } from "../../api/instance";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import UiViewer from "../common/Editor/UiViewer";

type DetailState = {
  setEditorActive: React.Dispatch<SetStateAction<boolean>>;
};
type DetailData = {
  title: string;
  createdDate: string;
  content: string;
};

const CommunityDetail = ({ setEditorActive }: DetailState) => {
  const { state } = useLocation();
  const { postId } = useParams();
  const [detailData, setDetailData] = useState<DetailData>();
  useEffect(() => {
    baseInstance
      .get(`/posts/${postId}`)
      .then((el) => {
        setDetailData(el.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [postId]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[1px]  bg-[#FBB03C]  mb-1" />
      <div className="w-full px-10 mb-2 flex justify-between border-y border-main-color bg-main-color bg-opacity-10">
        <div>{detailData?.title}</div>
        <div className="flex">
          <div className="mr-20">관리자</div>
          <div>{detailData?.createdDate}</div>
        </div>
      </div>
      <div className="border border-[#707070]  flex justify-center h-80 overflow-x-hidden">
        {detailData && <UiViewer content={detailData.content} />}
      </div>
      <div className="flex justify-end">
        <Link
          to={"/community"}
          state={state}
          onClick={() => setEditorActive(false)}
          className="mt-5 border border-main-color rounded-full px-5 hover:text-white hover:bg-main-color"
        >
          수정
        </Link>
      </div>
    </div>
  );
};

export default CommunityDetail;
