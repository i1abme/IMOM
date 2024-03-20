import React, { useState } from "react";
import MainManagerBtn from "../../components/Manager/MainManagerBtn";
import MainTitle from "../../components/Manager/ManagerTitle";
import ManagerTitleBox from "../../components/Manager/ManagerTitleBox";
import { baseInstance } from "../../api/instance";

const MainManager = () => {
  const [myImage, setMyImage] = useState<string[]>([]);
  const [sendImg, setSendImg] = useState<File[]>([]);
  console.log(sendImg);

  const handleImgSendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    sendImg.forEach((file) => {
      formData.append(`files`, file);
    });
    if (sendImg.length !== 0) {
      baseInstance
        .post("/images/banners", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("업로드가 완료 되었습니다.");
            setSendImg([]);
            setMyImage([]);
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("이미지를 한개 이상 올려주세요");
    }
  };

  return (
    <div className="flex flex-col items-center pl-36 h-full">
      <MainTitle title={"메인관리-배너수정"} />
      <ManagerTitleBox name="배너 등록" className="mb-2" />

      <form>
        <div className="flex justify-center items-center border p-2 w-[600px] ">
          <MainManagerBtn
            limitLength={3}
            myImage={myImage}
            setMyImage={setMyImage}
            sendImg={sendImg}
            setSendImg={setSendImg}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleImgSendClick}
            className="flex items-center justify-center border w-[32px] whitespace-nowrap px-10 py-1 mt-2  hover:bg-main-color hover:text-white"
          >
            <span>확인</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainManager;
