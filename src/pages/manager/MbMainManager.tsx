import ManagerTitleBox from "../../components/Manager/ManagerTitleBox";
import MainManagerBtn from "../../components/Manager/MainManagerBtn";
import { useEffect, useState } from "react";
import { baseInstance } from "../../api/instance";

const MbMainManager = () => {
  const [myImage, setMyImage] = useState<string[]>([]);
  const [sendImg, setSendImg] = useState<File[]>([]);
  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");
  const [banner3, setBanner3] = useState("");

  useEffect(() => {
    baseInstance.get("/images/banners/mobile").then((res) => {
      if (res.status === 200 && res.data.data) {
        const imageData = res.data.data;
        setBanner1(imageData[0].link);
        setBanner2(imageData[1].link);
        setBanner3(imageData[2].link);
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
    const jsonData = {
      link1: banner1,
      link2: banner2,
      link3: banner3,
    };
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );
    sendImg.forEach((file) => {
      formData.append(`files`, file);
    });

    if (sendImg.length < 3) {
      alert("이미지를 3개 이상 올려주세요.");
      return;
    }

    baseInstance
      .post("/images/banners/mobile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("업로드가 완료 되었습니다.");
          setBanner1("");
          setBanner2("");
          setBanner3("");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleBannerLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "1배너") {
      setBanner1(value);
    } else if (name === "2배너") {
      setBanner2(value);
    } else if (name === "3배너") {
      setBanner3(value);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <ManagerTitleBox name="모바일 배너 등록" className="mb-2" />

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
        <div className="w-full flex flex-col items-center justify-center">
          {["1배너", "2배너", "3배너"].map((el, index) => (
            <div className="flex w-full my-3" key={index}>
              <div className="whitespace-nowrap mr-5">{el}</div>
              <input
                className="border w-full"
                name={el}
                onChange={handleBannerLink}
                value={
                  el === "1배너" ? banner1 : el === "2배너" ? banner2 : banner3
                }
              />
            </div>
          ))}
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

export default MbMainManager;
