import React, { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import SignUpInput from "../SignUp/SignUpInput";
import { baseInstance } from "../../api/instance";

interface ModalProps {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  refreshToken: string | null;
  token: string | null;
  email: string | null;
}

const PasswordEditModal = ({
  setModalActive,
  refreshToken,
  token,
  email,
}: ModalProps) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const debouncePassword = useDebounce(password, 300);
  const debouncePasswordConfirm = useDebounce(passwordConfirm, 300);
  const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
  const isValidPassword = passwordRegex.test(debouncePassword);
  const isValidPasswordConfirm =
    isValidPassword && debouncePasswordConfirm === debouncePassword
      ? true
      : false;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "passwordconfirm":
        setPasswordConfirm(value);
        break;
      default:
        break;
    }
  };
  const handlePasswordEditClick = () => {
    if (passwordConfirm !== "" && isValidPasswordConfirm) {
      baseInstance
        .put("/users/reset-pw", {
          email: email,
          password: passwordConfirm,
          headers: {
            Authorization: `Bearer ${token}`,
            Refresh: `Bearer ${refreshToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("비밀번호 변경 완료!");
            setModalActive(false);
          } else {
            alert("비밀번호 형식을 맞춰주세요");
          }
        });
    } else {
      alert("비밀번호를 입력해주세요");
    }
  };
  return (
    <>
      <div className="bg-gray-300 opacity-80 absolute top-0 w-full h-full right-0" />
      <div className="absolute centerPosition h-96 border border-main-color bg-white w-1/3 rounded-2xl ">
        <div className="flex flex-col justify-center items-center w-full h-full px-10">
          <SignUpInput
            value={password}
            name="password"
            title="변경 비밀번호"
            placeholder="6자리이상 대문자 1개이상 포함"
            onChange={handleInputChange}
            isValid={isValidPassword}
            length={password.length}
            type="password"
          />
          <SignUpInput
            value={passwordConfirm}
            name="passwordconfirm"
            title="비밀번호확인"
            placeholder="비밀번호 확인"
            onChange={handleInputChange}
            isValid={isValidPasswordConfirm}
            length={passwordConfirm.length}
            type="password"
            message="비밀번호 불일치"
          />

          <div className="mt-10">
            <button
              className="border border-main-color mr-5 px-14 rounded-2xl hover:bg-main-color hover:text-white"
              onClick={handlePasswordEditClick}
            >
              <span>변경하기</span>
            </button>
            <button
              onClick={() => setModalActive(false)}
              className="border border-main-color px-14 rounded-2xl hover:bg-main-color hover:text-white"
            >
              <span>닫기</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordEditModal;
