import ManagerTitle from "../components/Manager/ManagerTitle";
import { useEffect, useState } from "react";
import PasswordEditModal from "../components/MyPage/PasswordEditModal";
import { baseInstance } from "../api/instance";
import SignUpInput from "../components/SignUp/SignUpInput";
import { useDebounce } from "../hooks/useDebounce";
import userInstance from "../api/userInstance";
import { useSetRecoilState } from "recoil";
import { userChildName } from "../atom/atom";

type EditType = {
  token: string | null;
  refreshToken: string | null;
};

const EditMember = ({ refreshToken, token }: EditType) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [userData, setUserData] = useState("");
  const [birth, setBirth] = useState("");
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [englishLastName, setEnglishLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [headCount, setHeadCount] = useState<number | null>(null);
  const debounceName = useDebounce(name, 300);
  const debounceEngilshName = useDebounce(englishName, 300);
  const debounceEnglishLastName = useDebounce(englishLastName, 300);
  const debounceBirth = useDebounce(birth, 300);
  const debouncePhone = useDebounce(phone, 300);
  // 정규식
  const nameRegex = /^[가-힣]/;
  const englishNameRegex = /^[a-zA-Z]+$/;
  const birthRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  const phoneNumberRegex = /^010-\d{4}-\d{3,4}$/;
  // 유효성
  const isValidName = nameRegex.test(debounceName);
  const isValidEnglishName = englishNameRegex.test(debounceEngilshName);
  const isValidEnglishLastName = englishNameRegex.test(debounceEnglishLastName);
  const isValidBirth = birthRegex.test(debounceBirth);
  const isValidPhone = phoneNumberRegex.test(debouncePhone);

  //리코일 아이 이름 교체
  const setUserChild = useSetRecoilState(userChildName);

  const handlePasswordModalClick = () => {
    setModalActive(true);
  };
  useEffect(() => {
    userInstance.get("/users/mypage").then((res) => {
      if (res.status === 200) {
        setUserData(res.data.data);
        setEmail(res.data.data.email);
        setGender(res.data.data.gender);
        setName(res.data.data.userName);
        setEnglishLastName(res.data.data.enLastName);
        setEnglishName(res.data.data.enFirstName);
        setPhone(res.data.data.phoneNumber);
        setChildName(res.data.data.childName);
        setHeadCount(res.data.data.headCount);
        setBirth(res.data.data.birth);
      }
    });
  }, []);

  const keyToKorean = (key: string) => {
    switch (key) {
      case "birth":
        return "생년월일";
      case "childName":
        return "자녀대표이름";
      case "email":
        return "이메일";
      case "gender":
        return "성별";
      case "headCount":
        return "가족인원";
      case "phoneNumber":
        return "핸드폰번호";
      case "userName":
        return "사용자이름";
      case "enLastName":
        return "영문이름";
      case "enFirstName":
        return "영문성";
      default:
        return key;
    }
  };
  const valueState = (
    key: string
  ): string | number | readonly string[] | undefined => {
    switch (key) {
      case "birth":
        return birth;
      case "childName":
        return childName;
      case "email":
        return email;
      case "headCount":
        return typeof headCount === "number" ? headCount : undefined;
      case "phoneNumber":
        return phone;
      case "userName":
        return name;
      case "enLastName":
        return englishLastName;
      case "enFirstName":
        return englishName;
      default:
        return undefined;
    }
  };
  const isValid = (key: string): string | boolean | undefined => {
    switch (key) {
      case "birth":
        return isValidBirth;
      case "phoneNumber":
        return isValidPhone;
      case "userName":
        return isValidName;
      case "enLastName":
        return isValidEnglishLastName;
      case "enFirstName":
        return isValidEnglishName;
      default:
        return undefined;
    }
  };
  const isValidLength = (key: string): number | undefined => {
    switch (key) {
      case "birth":
        return birth.length;
      case "phoneNumber":
        return phone.length;
      case "userName":
        return name.length;
      case "enLastName":
        return englishLastName.length;
      case "enFirstName":
        return englishName.length;
      default:
        return undefined;
    }
  };

  const keysToDisplay = [
    "email",
    "userName",
    "gender",
    "birth",
    "phoneNumber",
    "headCount",
    "childName",
    "enLastName",
    "enFirstName",
  ];
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue;
    let phoneValue;
    let transformedValue;

    switch (name) {
      case "userName":
        setName(value);
        break;
      case "enFirstName":
        transformedValue = value.toUpperCase();
        setEnglishName(transformedValue);
        break;
      case "enLastName":
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
      case "phoneNumber":
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
      case "headCount":
        setHeadCount(parseInt(value));
        break;
      case "childName":
        if (value.length <= 2) {
          setChildName(value);
        }
        break;
      default:
        break;
    }
  };

  const handleEditBtnClick = () => {
    if (
      name !== "" &&
      birth !== "" &&
      phone !== "" &&
      englishName !== "" &&
      englishLastName !== "" &&
      isValidName &&
      isValidEnglishName &&
      isValidEnglishLastName &&
      isValidBirth &&
      isValidPhone
    ) {
      baseInstance
        .put("/users", {
          userName: name,
          enFirstName: englishLastName,
          enLastName: englishName,
          gender: gender,
          birth: birth,
          email: email,
          phoneNumber: phone,
          headCount: headCount,
          childName: childName,
          headers: {
            Authorization: `Bearer ${token}`,
            Refresh: `Bearer ${refreshToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("수정완료!");
            setUserChild(childName); // 성공시 리코일 아이 이름 수정
          }
        });
    } else {
      alert("*의 내용과 형식을 맞춰주세요.");
    }
  };

  return (
    <div className="w-full relative">
      <ManagerTitle title="회원 정보 수정" />
      <div className="border-t border-gray-200">
        {Object.entries(userData)
          .filter(([key]) => keysToDisplay.includes(key))
          .map(([key, value]) => (
            <table key={key} className="flex border-b border-gray-200 w-full ">
              <tbody>
                <tr className="flex items-center">
                  <th className="border-r w-40 whitespace-nowrap border-gray-200 bg-main-color text-white py-3">
                    {keyToKorean(key)}
                  </th>
                  {key !== "email" ? (
                    <td className="ml-4">
                      {key === "gender" ? (
                        <div>
                          {["남", "여"].map((option) => (
                            <label className="mr-5" key={option}>
                              <input
                                className="mr-2"
                                type="radio"
                                name="gender"
                                value={option}
                                checked={option === gender}
                                onChange={handleRadioChange}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="flex relative">
                          {key !== "headCount" && key !== "childName" && (
                            <div className="text-red-500">*</div>
                          )}
                          <SignUpInput
                            padding={true}
                            title=""
                            type={key === "headCount" ? "number" : "text"}
                            isValid={isValid(key)}
                            name={key}
                            placeholder={keyToKorean(key)}
                            value={valueState(key)}
                            onChange={handleInputChange}
                            message="형식을 맞춰주세요"
                            length={isValidLength(key)}
                            min={0}
                          />
                        </div>
                      )}
                    </td>
                  ) : (
                    <td className="ml-4">{value}</td>
                  )}
                </tr>
              </tbody>
            </table>
          ))}
      </div>

      <div className="flex justify-end items-center mt-3">
        <button
          className="px-14 border border-main-color mr-5 hover:bg-main-color hover:text-white"
          onClick={handlePasswordModalClick}
        >
          <span>비밀번호변경하기</span>
        </button>
        <button
          className="px-14 border border-main-color hover:bg-main-color hover:text-white"
          onClick={handleEditBtnClick}
        >
          <span>수정하기</span>
        </button>
      </div>
      {modalActive && (
        <PasswordEditModal
          setModalActive={setModalActive}
          token={token}
          refreshToken={refreshToken}
          email={email}
        />
      )}
    </div>
  );
};

export default EditMember;
