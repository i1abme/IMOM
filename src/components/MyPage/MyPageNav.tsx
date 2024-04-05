import React, { useState } from "react";
import { mbMyPageNavTitle, myPageNavTitle } from "../../constants/data";
import { Outlet, useNavigate } from "react-router-dom";
import userInstance from "../../api/userInstance";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { loginCheck, userChildName } from "../../atom/atom";
import SectionTitle from "../common/SectionTitle";

const MyPageNav = () => {
  const navigation = useNavigate();
  const [clickedButton, setClickedButton] = useState<null | number>(null);

  const setLoginCheck = useSetRecoilState(loginCheck);
  const resetName = useResetRecoilState(userChildName);
  const handleSideClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (name !== "secession") {
      navigation(name);
    } else {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        userInstance.delete("/users/withdraw").then((res) => {
          if (res.status === 200) {
            alert("아이맘을 이용해주셔서 감사합니다.");
            setLoginCheck(false);
            navigation("/");
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("refreshToken");
            window.localStorage.removeItem("admin");
            resetName();
          }
        });
      }
    }
  };
  const handleButtonClick = (index: number, params: string) => {
    setClickedButton(index);
    navigation(params);
  };
  return (
    <div className="w-full flex h-full max-xsm:flex-col">
      <div className="h-full flex flex-col p-10 border-r border-main-color mr-20 max-xsm:hidden">
        {myPageNavTitle.map((el, index) => {
          return (
            <button
              className="flex whitespace-nowrap p-7 border-b border-main-color border-dotted"
              key={index}
              name={el.prams}
              onClick={handleSideClick}
            >
              <span>{el.title}</span>
            </button>
          );
        })}
      </div>
      <SectionTitle title="마이페이지" divStyle="xsm:hidden" />
      <div className="hidden w-full h-full mt-10 max-xsm:flex max-xsm:justify-start">
        {mbMyPageNavTitle.map((el, index) => {
          return (
            <button
              className={`flex whitespace-nowrap p-2 mr-2 border border-main-color rounded-lg border-dotted ${
                clickedButton === index ? "bg-main-color text-white" : ""
              }`}
              key={index}
              name={el.prams}
              onClick={() => handleButtonClick(index, el.prams)}
            >
              <span>{el.title}</span>
            </button>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageNav;
