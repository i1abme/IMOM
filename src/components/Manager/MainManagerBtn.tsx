import "../../App.css";

interface BannerProps {
  myImage: string[];
  sendImg: File[];
  limitLength: number;
  setMyImage: React.Dispatch<React.SetStateAction<string[]>>;
  setSendImg: React.Dispatch<React.SetStateAction<File[]>>;
}

const MainManagerBtn = ({
  myImage,
  sendImg,
  setMyImage,
  setSendImg,
  limitLength,
}: BannerProps) => {
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImageList = e.target.files;

    const nowImgURLList = [...myImage];
    const nowFilesList = [...sendImg];

    if (nowSelectImageList && myImage.length < limitLength) {
      for (let i = 0; i < nowSelectImageList.length; i++) {
        nowFilesList.push(nowSelectImageList[i]);
        const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
        nowImgURLList.push(nowImageUrl);
      }
      setSendImg(nowFilesList);
      setMyImage(nowImgURLList);

      e.target.value = "";
    } else {
      alert(`이미지는 ${limitLength}개까지만 업로드 가능합니다.`);
    }
  };
  const handleDeleteImage = (idx: number) => {
    setMyImage((prevMyImage) => prevMyImage.filter((_, i) => i !== idx));
    setSendImg((prevMyImage) => prevMyImage.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col items-center w-full m-1">
      <div className="w-full">
        <input
          id="banner"
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={addImage}
        />
        <label
          htmlFor="banner"
          className="w-full flex justify-center items-center"
        >
          <input
            readOnly
            className="border w-full outline-none mr-2 text-center p-2"
            placeholder={
              (sendImg.length !== 0
                ? sendImg.map((el) => el.name)
                : "이미지 형식만 가능합니다.") as string | undefined
            }
          />
          <span className="border p-2 cursor-pointer whitespace-nowrap">
            업로드
          </span>
        </label>
      </div>
      <div className="flex w-full">
        {myImage &&
          myImage.map((src, idx) => {
            return (
              <div key={src} className="relative">
                <button
                  className="absolute top-2 right-2 text-main-color"
                  onClick={() => handleDeleteImage(idx)}
                >
                  삭제
                </button>
                <img src={src} className="h-48 w-96 object-cover" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MainManagerBtn;
