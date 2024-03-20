import React, { SetStateAction } from "react";

type FindEmailType = {
  setFindEmailActive: React.Dispatch<SetStateAction<boolean>>;
  resetData: boolean;
};

const ResetPasswordPopUp = ({
  setFindEmailActive,
  resetData,
}: FindEmailType) => {
  return (
    <div className="w-[500px] h-[240px] border border-main-color rounded-2xl absolute centerPosition bg-white">
      <div className="flex text-sm flex-col h-full leading-10 justify-center items-center">
        {resetData ? (
          <div>변경 된 비밀번호가 귀하의 메일주소로 발송 되었습니다</div>
        ) : (
          <div>회원님이 입력하신 정보와 일치하는 정보가 없습니다.</div>
        )}
        <button
          className="px-14 py-1 rounded-2xl bg-main-color"
          onClick={() => setFindEmailActive(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPopUp;
