import LoginInput from "../components/Login/LoginInput";
import LoginSignUpBtn from "../components/common/LoginSignUpBtn";
import Button from "../components/common/Button";
import { baseInstance } from "../api/instance";
import { useState } from "react";
import ResetPasswordPopUp from "../components/Login/ResetPasswordPopUp";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigation = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resetPasswordActive, setResetPasswordActive] = useState(false);
  const [resetData, setResetDate] = useState(false);

  const handleResetPasswordClick = () => {
    if (name !== "" && email !== "") {
      setResetPasswordActive(true);
      baseInstance
        .post("/users/send-mail", {
          userName: name,
          email: email,
        })
        .then((res) => {
          if (res.status === 200) {
            setResetDate(true);
          } else {
            setResetDate(false);
          }
        })
        .catch(() => setResetDate(false));
    } else {
      alert("이메일과 휴대폰번호를 입력해주세요!");
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-full items-center lg:w-[500px]">
        <img src="/mainLogo.svg" onClick={() => navigation("/")} />
        <LoginInput
          placeholder={"이름"}
          setState={setName}
          name="이름"
          value={name}
        />
        <LoginInput
          placeholder={"이메일"}
          setState={setEmail}
          name="이메일"
          value={email}
        />
        <LoginSignUpBtn
          label="비밀번호 초기화 메일 발송"
          onClick={handleResetPasswordClick}
        />
      </div>
      <Button label={"로그인 페이지"} loc="login" />
      {resetPasswordActive && (
        <ResetPasswordPopUp
          setFindEmailActive={setResetPasswordActive}
          resetData={resetData}
        />
      )}
    </>
  );
};
export default ResetPassword;
