import React, { useEffect, useState } from "react";
import MainManagerBtn from "../../components/Manager/MainManagerBtn";
import MainTitle from "../../components/Manager/ManagerTitle";
import ManagerTitleBox from "../../components/Manager/ManagerTitleBox";
import { baseInstance } from "../../api/instance";
import ExcelDownload from "../../components/Manager/ExcelDownload";
import { USER_EXCEL_HEADER } from "../../constants/managerdata";

const MainManager = () => {
  const [myImage, setMyImage] = useState<string[]>([]);
  const [sendImg, setSendImg] = useState<File[]>([]);
  const [userExcelData, setUserExcelData] = useState([]);

  useEffect(() => {
    baseInstance.get("/users/excel").then((res) => {
      if (res.status === 200) {
        setUserExcelData(res.data.data);
      }
    });
  }, []);
  useEffect(() => {
    baseInstance.get("/images/banners").then((res) => {
      if (res.status === 200) {
        const filesToSend = Promise.all(
          res.data.data.map(
            (thumbnail: { imageUrl: string; originalImageName: string }) => {
              const { imageUrl, originalImageName } = thumbnail;
              return fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => new File([blob], originalImageName));
            }
          )
        );

        filesToSend.then((files) => {
          setSendImg(files);
        });

        setMyImage(
          res.data.data.map((thumbnail: { imageUrl: string }) => {
            const { imageUrl } = thumbnail;
            return imageUrl;
          })
        );
      }
    });
  }, []);

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
      {userExcelData && (
        <ExcelDownload
          data={userExcelData}
          headers={USER_EXCEL_HEADER}
          title="유저목록.csv"
          fileName="아이맘_유저목록.csv"
          className="mt-10 text-white bg-main-color px-10 py-4 hover:bg-opacity-50"
        />
      )}
    </div>
  );
};

export default MainManager;
