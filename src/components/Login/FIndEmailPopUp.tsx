import React, { SetStateAction } from "react";

type FindEmailType = {
  setFindEmailActive: React.Dispatch<SetStateAction<boolean>>;
  selectEmail: string;
};

const FIndEmailPopUp = ({ setFindEmailActive, selectEmail }: FindEmailType) => {
  return (
    <div className="w-[500px] h-[240px] border border-main-color rounded-2xl absolute centerPosition bg-white">
      <div className="flex text-sm flex-col h-full leading-10 justify-center items-center">
        {selectEmail !== "" ? (
          <>
            <div>회원님의 아이디는</div>
            <div>{selectEmail}</div>
            <div>입니다.</div>
          </>
        ) : (
          <div>회원님이 입력하신 정보와 일치하는 정보가 없습니다.</div>
        )}
      </div>
      <button
        className="absolute  top-5 right-5"
        onClick={() => setFindEmailActive(false)}
      >
        X
      </button>
    </div>
  );
};

export default FIndEmailPopUp;
