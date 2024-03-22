/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import SignUpInput from "../components/SignUp/SignUpInput";
import Button from "../components/common/Button";
import LoginSignUpBtn from "../components/common/LoginSignUpBtn";
import { useDebounce } from "../hooks/useDebounce";
import { baseInstance } from "../api/instance";
import { useNavigate } from "react-router-dom";
import SignUpTerms from "../components/SignUp/\bSignUpTerms";

const SignUp = () => {
  const navigation = useNavigate();
  // 입력정보
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [englishLastName, setEnglishLastName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [family, setFamily] = useState(0);
  const [baby, setBaby] = useState("");
  const [gender, setGender] = useState(""); // 남녀 라디오버튼
  const [marketCheck, setMarketCheck] = useState<number>(0);
  const [emailCheck, setEmailCheck] = useState(false);

  // debounce
  const debounceName = useDebounce(name, 300);
  const debounceEngilshName = useDebounce(englishName, 300);
  const debounceEnglishLastName = useDebounce(englishLastName, 300);
  const debounceBirth = useDebounce(birth, 300);
  const debounceEmail = useDebounce(email, 300);
  const debouncePassword = useDebounce(password, 300);
  const debouncePasswordConfirm = useDebounce(passwordConfirm, 300);
  const debouncePhone = useDebounce(phone, 300);

  // 정규식
  const nameRegex = /^[가-힣]+$/;
  const englishNameRegex = /^[a-zA-Z]+$/;

  const birthRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
  const phoneNumberRegex = /^010-\d{4}-\d{3,4}$/;

  // 유효성검사
  const isValidName = nameRegex.test(debounceName);
  const isValidEnglishName = englishNameRegex.test(debounceEngilshName);
  const isValidEnglishLastName = englishNameRegex.test(debounceEnglishLastName);
  const isValidBirth = birthRegex.test(debounceBirth);
  const isValidPhone = phoneNumberRegex.test(debouncePhone);
  const isValidEmail = emailRegex.test(debounceEmail);
  const isValidPassword = passwordRegex.test(debouncePassword);
  const isValidPasswordConfirm =
    isValidPassword && debouncePasswordConfirm === debouncePassword
      ? true
      : false;

  // 입력값 change함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue;
    let phoneValue;
    let transformedValue;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "englishName":
        transformedValue = value.toUpperCase();
        setEnglishName(transformedValue);
        break;
      case "englishLastName":
        transformedValue = value.toUpperCase();
        setEnglishLastName(transformedValue);
        break;
      case "birth":
        numericValue = value.replace(/\D/g, "");
        if (numericValue.length <= 4) {
          setBirth(numericValue);
        } else if (numericValue.length <= 6) {
          setBirth(`${numericValue.slice(0, 4)}-${numericValue.slice(4)}`);
        } else {
          setBirth(
            `${numericValue.slice(0, 4)}-${numericValue.slice(
              4,
              6
            )}-${numericValue.slice(6, 8)}`
          );
        }
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordconfirm":
        setPasswordConfirm(value);
        break;
      case "phone":
        phoneValue = value.replace(/\D/g, "");
        if (phoneValue.length <= 3) {
          setPhone(phoneValue);
        } else if (phoneValue.length <= 7) {
          setPhone(`${phoneValue.slice(0, 3)}-${phoneValue.slice(3)}`);
        } else {
          setPhone(
            `${phoneValue.slice(0, 3)}-${phoneValue.slice(
              3,
              7
            )}-${phoneValue.slice(7, 11)}`
          );
        }
        break;
      case "family":
        setFamily(Number(value));
        break;
      case "baby":
        if (/^[ㄱ-ㅎ|가-힣]+$/.test(value)) {
          setBaby(value.slice(0, 2));
        } else if (value === "") {
          setBaby("");
        } else {
          alert("한글 두글자만 입력가능합니다.");
        }

        break;
      default:
        break;
    }
  };
  console.log(baby);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  // 회원가입 버튼
  const handleSignUpClick = () => {
    if (
      isValidName &&
      isValidEnglishName &&
      isValidEnglishLastName &&
      gender !== "" &&
      isValidBirth &&
      isValidEmail &&
      isValidPassword &&
      isValidPasswordConfirm &&
      isValidPhone
    ) {
      if (emailCheck) {
        if (marketCheck >= 2) {
          baseInstance
            .post("/auth/signup", {
              userName: name,
              enFirstName: englishLastName,
              enLastName: englishName,
              gender: gender,
              birth: birth,
              email: email,
              password: passwordConfirm,
              phoneNumber: phone,
              headCount: family > 0 ? family : 0,
              childName: baby,
              marketing: marketCheck === 3 ? "동의" : "비동의",
            })
            .then((res) => {
              if (res.status === 200) {
                navigation("/login");
                alert("회원가입 완료!");
              }
            })
            .catch((err) => {
              alert(err.response.data.message);
            });
        } else {
          alert("필수약관 동의를 해주세요");
        }
      } else {
        alert("이메일 인증을 완료해주세요.");
      }
    } else {
      alert("필수 입력을 완료해주세요");
    }
  };

  const handleSendMailClick = () => {
    baseInstance
      .post("/users/send-mail/certified", { email: email })
      .then((res) => {
        if (res.status === 200) {
          alert("이메일 인증을 발송하였습니다.");
          setEmailCheck(true);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col w-full h-full justify-center items-center ">
        <img src="/subLogo.svg" className="w-[20%] mb-10" />
        <div className="w-full  border-y border-main-color py-10 flex justify-center ">
          <div className="flex w-1/3 flex-col justify-center items-center h-full rounded-3xl  sm:w-3/4 md:w-2/3 lg:w-1/2 ">
            <h2 className="font-bold text-2xl text-main-color mb-10">
              필수항목입력
            </h2>
            <div className="flex flex-col w-full">
              <SignUpInput
                value={email}
                name="email"
                title="이메일"
                placeholder="uriel@naver.com"
                onChange={handleInputChange}
                isValid={isValidEmail}
                length={email.length}
                type="email"
                message="올바른 이메일이 아닙니다"
              />

              {isValidEmail && (
                <div
                  className={`w-full flex flex-col items-center justify-center mb-5 animate-pulse`}
                >
                  <button
                    className="whitespace-nowrap z-0 w-1/3 bg-main-color text-white rounded-full"
                    onClick={handleSendMailClick}
                  >
                    인증메일발송
                  </button>
                  <div>발송된 이메일에서 '인증완료' 버튼을 눌러주세요</div>
                </div>
              )}
            </div>
            <SignUpInput
              value={name}
              name="name"
              title="이름"
              placeholder="이름"
              onChange={handleInputChange}
              isValid={isValidName}
              length={name.length}
              type="text"
              message="한글만 입력가능"
            />
            <SignUpInput
              value={englishName}
              name="englishName"
              title="영문이름"
              placeholder="여권에 표시된 영문 이름"
              onChange={handleInputChange}
              isValid={isValidEnglishName}
              length={englishName.length}
              type="text"
              message="영어만 입력가능"
            />

            <SignUpInput
              value={englishLastName}
              name="englishLastName"
              title="영문 성"
              placeholder="여권에 표시된 영문 성"
              onChange={handleInputChange}
              isValid={isValidEnglishLastName}
              length={englishLastName.length}
              type="text"
              message="영어만 입력가능"
            />
            <div className="flex justify-between items-center w-full">
              <div className="">성별</div>
              <div className="flex justify-between w-3/4 border border-main-color bg-white rounded-full py-3 pl-7 pr-16 mb-[5px]">
                {["남", "여"].map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      onChange={handleRadioChange}
                      className="mr-4"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <SignUpInput
              value={birth}
              name="birth"
              title="생년월일"
              placeholder="YYYY-MM-DD"
              onChange={handleInputChange}
              isValid={isValidBirth}
              length={birth.length}
              type="text"
              message="형식을 맞춰주세요"
            />

            <SignUpInput
              value={password}
              name="password"
              title="비밀번호"
              placeholder="6자리이상 대문자 1개이상 포함"
              onChange={handleInputChange}
              isValid={isValidPassword}
              length={password.length}
              type="password"
              message="비밀번호형식을 맞춰주세요"
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
            <SignUpInput
              value={phone}
              name="phone"
              title="핸드폰번호"
              placeholder="010-1234-5678"
              onChange={handleInputChange}
              isValid={isValidPhone}
              length={phone.length}
              type="text"
              message="핸드폰 형식을 맞춰주세요"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-1/3 mt-10  rounded-3xl  flex flex-col items-center  sm:w-3/4 md:w-2/3 lg:w-1/2">
            <h2 className="font-bold text-main-color my-10 text-2xl">
              선택입력항목
            </h2>
            <div className="w-full">
              <SignUpInput
                value={family}
                name="family"
                title="가족인원"
                placeholder="0"
                onChange={handleInputChange}
                type="number"
                min={0}
              />
              <SignUpInput
                value={baby}
                name="baby"
                title="자녀대표이름"
                placeholder="애기이름 (한글 두 글자로 입력해주세요.)"
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <SignUpTerms setMarketCheck={setMarketCheck} />
          </div>
        </div>
        <div className="w-1/3">
          <LoginSignUpBtn label="회원가입" onClick={handleSignUpClick} />
        </div>
      </div>
      <Button loc="login" label="로그인" />
    </>
  );
};

export default SignUp;
