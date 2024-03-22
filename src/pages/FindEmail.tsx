import LoginInput from "../components/Login/LoginInput";
import LoginSignUpBtn from "../components/common/LoginSignUpBtn";
import Button from "../components/common/Button";
import { baseInstance } from "../api/instance";
import { useState } from "react";
import FIndEmailPopUp from "../components/Login/FIndEmailPopUp";

const FindEmail = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [findEmailActive, setFindEmailActive] = useState(false);
  const [selectEmail, setSelectEmail] = useState("");

  const handleLoginClick = () => {
    if (name !== "" && phoneNumber !== "") {
      setFindEmailActive(true);
      baseInstance
        .post("/users/find-id", {
          userName: name,
          phoneNumber: phoneNumber,
        })
        .then((res) => {
          if (res.status === 200) {
            setSelectEmail(res.data.data.email);
          }
        })
        .catch(() => {
          setSelectEmail("");
        });
    } else {
      alert("이메일과 핸드폰번호를 입력해주세요!");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-full items-center lg:w-[500px]">
        <div className="w-[170px] h-[50px] bg-main-color mb-[24px]" />
        <LoginInput
          placeholder={"이름"}
          setState={setName}
          name="이름"
          value={name}
        />
        <LoginInput
          placeholder={"핸드폰 번호"}
          setState={setPhoneNumber}
          name="핸드폰번호"
          value={phoneNumber}
        />
        <LoginSignUpBtn label="아이디 찾기" onClick={handleLoginClick} />
      </div>
      <Button label={"로그인 페이지"} loc="login" />
      {findEmailActive && (
        <FIndEmailPopUp
          setFindEmailActive={setFindEmailActive}
          selectEmail={selectEmail}
        />
      )}
    </>
  );
};
export default FindEmail;
