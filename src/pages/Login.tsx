import LoginInput from "../components/Login/LoginInput";
import LoginSignUpBtn from "../components/common/LoginSignUpBtn";
import Button from "../components/common/Button";
import KakaoLogin from "../components/Login/KakaoLogin";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "../api/instance";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginCheck } from "../atom/atom";
import NaverLogin from "../components/Login/NaverLogin";

const Login = () => {
  const navigation = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const setLoginCheck = useSetRecoilState(loginCheck);

  const handleLoginClick = () => {
    if (id !== "" && password !== "") {
      baseInstance
        .post("/auth/login", {
          email: id,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            setLoginCheck(true);
            window.localStorage.setItem("token", res.data.data.accessToken);
            window.localStorage.setItem(
              "refreshToken",
              res.data.data.refreshToken
            );
            if (res.data.data.role === "ROLE_ADMIN")
              window.localStorage.setItem("admin", res.data.data.role);
            alert("로그인 완료!");
            navigation("/");
          } else if (res.data.code === "40003") {
            alert(res.data.message);
          } else if (res.data.code === "40004") {
            alert(res.data.massage);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            alert("존재하지 않는 이메일 입니다.");
          }
        });
    } else {
      alert("이메일 비밀번호를 입력해주세요!");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col justify-center h-full items-center lg:w-[500px]">
        <img src="/subLogo.svg" />
        <LoginInput
          placeholder={"이메일 계정"}
          setState={setId}
          name="이메일"
          value={id}
        />
        <LoginInput
          placeholder={"비밀번호"}
          setState={setPassword}
          name="비밀번호"
          value={password}
        />
        <LoginSignUpBtn label="로그인" onClick={handleLoginClick} />
        <div className="flex justify-between w-full px-4 my-5 text-xs">
          <div className="flex">
            <button className="mr-4" onClick={() => navigation("/findemail")}>
              아이디 찾기
            </button>
            <button onClick={() => navigation("/resetpassword")}>
              비밀번호 초기화
            </button>
          </div>
          <button onClick={() => navigation("/signup")}>회원가입</button>
        </div>
        <div className="bg-main-color w-full h-[1px]" />
        <div className="flex flex-col justify-center items-center w-full">
          <KakaoLogin />
          <NaverLogin />
        </div>
      </div>
      <Button label={"홈으로 가기"} loc="" />
    </div>
  );
};
export default Login;
