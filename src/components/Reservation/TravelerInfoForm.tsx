import { useState } from "react";
import { TravelerInfoFormProps, travelerInfo } from "../../types/reservation";
import {
  birthFormat,
  checkValidDate,
  onlyEnglish,
  onlyKorean,
  phoneNumberFormat,
} from "../../utils/validationUtils";
import CustomRadioBtn from "../common/CustomRadionbtn";
import { WRONG_AGE_MESSAGES } from "../../constants/travelerdata";
import "./TravelerInfoForm.css";
import { calculateAge } from "../../utils/calculateAge";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";

const TravelerInfoForm = ({
  priceInfo,
  age,
  role,
  travelerId,
  isRepresentative,
  handleTravelerInfo,
  userInfo,
  startDate,
  handleChangeSort,
}: TravelerInfoFormProps) => {
  const [info, setInfo] = useState({
    travelerName: "",
    enFirstName: "",
    enLastName: "",
    gender: "남",
    birth: "",
    phoneNumber: "",
    representative: isRepresentative,
  });

  const [inputBirth, setInputBirth] = useState("");

  const [sameAsUserInfo, setSameAsUserInfo] = useState<boolean>(false);

  const [animationTrigger, setAnimationTrigger] = useState(false);

  const viewSizeState = useRecoilValue(viewSize);

  const handleSameAsUser = (checked: boolean) => {
    if (checked && userInfo) {
      // 성인 여부 확인
      if (calculateAge(userInfo.birth, startDate)[0] === "성인") {
        setSameAsUserInfo(true);
        const newInfo = {
          travelerName: userInfo.userName,
          enFirstName: userInfo.enFirstName,
          enLastName: userInfo.enLastName,
          gender: userInfo.gender,
          birth: userInfo.birth,
          phoneNumber: userInfo.phoneNumber,
          representative: isRepresentative,
        };
        setInfo(newInfo);
        setInputBirth(userInfo.birth);
        handleTravelerInfo(travelerId, newInfo);
        setAnimationTrigger(true);
        const timeoutId = setTimeout(() => setAnimationTrigger(false), 1000);
        return () => clearTimeout(timeoutId);
      }
      if (calculateAge(userInfo.birth, startDate)[0] !== "성인") {
        alert(WRONG_AGE_MESSAGES[role as keyof typeof WRONG_AGE_MESSAGES]);
        return;
      }
    }
    if (!checked) {
      setSameAsUserInfo(false);
      const newInfo = {
        travelerName: "",
        enFirstName: "",
        enLastName: "",
        gender: "남",
        birth: "",
        phoneNumber: "",
        representative: isRepresentative,
      };
      setInputBirth("");
      setInfo(() => ({ ...newInfo }));
      handleTravelerInfo(travelerId, newInfo);
    }
  };

  const handleInput = (id: keyof travelerInfo, value: string) => {
    const updatedInfo = { ...info, [id]: value };
    setInfo(() => updatedInfo);
    handleTravelerInfo(travelerId, updatedInfo);
  };

  const handleBirth = (id: keyof travelerInfo, date: string) => {
    const pickedRole = role === "대표1인" ? "성인" : role;
    setInputBirth(date);
    if (date.length < 10) return;
    if (checkValidDate(date)) {
      const realRole = calculateAge(date, startDate);
      const priceValue = priceInfo[realRole[1] as keyof typeof priceInfo];
      const isAbleToChange =
        typeof priceValue !== "number" && priceValue.price !== 0;
      if (realRole[0] !== pickedRole && isAbleToChange) {
        if (role === "대표1인") {
          alert(WRONG_AGE_MESSAGES[role]);
          setInputBirth("");
        } else {
          const changeAge = confirm(
            WRONG_AGE_MESSAGES[realRole[0] as keyof typeof WRONG_AGE_MESSAGES]
          );
          if (changeAge) {
            handleChangeSort(
              travelerId,
              realRole[0],
              realRole[1] as "adult" | "child" | "infant",
              age
            );
            setInfo((prev) => {
              const updatedInfo = { ...prev, [id]: date };
              return updatedInfo;
            });
            handleTravelerInfo(travelerId, date, id);
            setAnimationTrigger(true);
            const timeoutId = setTimeout(
              () => setAnimationTrigger(false),
              1000
            );
            return () => clearTimeout(timeoutId);
          } else {
            setInputBirth("");
          }
        }
      } else if (realRole[0] === pickedRole && isAbleToChange) {
        setInfo((prev) => {
          const updatedInfo = { ...prev, [id]: date };
          return updatedInfo;
        });
        handleTravelerInfo(travelerId, date, id);
      }
    }
    if (!checkValidDate(date)) {
      alert("유효한 생년월일이 아닙니다.");
    }
  };

  return (
    <div
      className={`${animationTrigger && role !== "대표1인" ? "animate" : ""}`}
    >
      <div className={`flex items-center justify-between`}>
        <h3 className="pb-[8px] max-xsm:text-[10px] max-xsm:pb-[6px]">
          {role}
        </h3>
        {role === "대표1인" && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="travelerInfo"
              checked={sameAsUserInfo}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
              onChange={(e) => handleSameAsUser(e.target.checked)}
            />
            <label
              htmlFor="travelerInfo"
              className="text-[14px] pl-[4px] max-xsm:text-[10px]"
            >
              예약자 정보와 일치합니다.
            </label>
          </div>
        )}
      </div>
      <div
        className={`flex flex-col flex-wrap gap-y-[16px] p-[22px] border-[1px] border-sub-black
        max-xsm:p-0 max-xsm:border-none max-xsm:gap-0 `}
      >
        <div
          className="flex text-sub-black text-[14px] gap-[20px] shrink-0 
        max-xsm:w-full max-xsm:border-t-[0.5px] max-xsm:border-main-color"
        >
          <label
            htmlFor="travelerName"
            className="max-xsm:bg-main-color/[.1] max-xsm:text-[12px] 
            max-xsm:py-[8px] max-xsm:w-[75px] max-xsm:text-center"
          >
            <span className="text-red-700">*</span>
            이름
          </label>
          <input
            className={`flex disabled:bg-transparent ${
              animationTrigger && role === "대표1인" ? "animate" : ""
            } max-xsm:text-[10px]`}
            type="text"
            id="travelerName"
            placeholder="이름을 입력하세요"
            value={info.travelerName}
            onChange={(e) =>
              handleInput(
                e.target.id as keyof travelerInfo,
                onlyKorean(e.target.value)
              )
            }
            disabled={sameAsUserInfo}
          />
        </div>
        {viewSizeState === "web" ? (
          <div className="flex text-sub-black text-[14px] gap-[20px] ">
            <label htmlFor="enFirstName" className="shrink-0">
              <span className="text-red-700">*</span>영문이름
            </label>
            <div className="shrink-0 gap-[10px] flex">
              <label htmlFor="enFirstName">성:</label>
              <input
                className={`disabled:bg-transparent ${
                  animationTrigger && role === "대표1인" ? "animate" : ""
                } w-[180px]`}
                id="enFirstName"
                placeholder="영문 성을 입력하세요"
                value={info.enFirstName}
                onChange={(e) =>
                  handleInput(
                    e.target.id as keyof travelerInfo,
                    onlyEnglish(e.target.value)
                  )
                }
                disabled={sameAsUserInfo}
              />
            </div>
            <div className="shrink-0 gap-[10px] flex">
              <span className="text-red-700">*</span>
              <label htmlFor="enLastName">이름:</label>
              <input
                className={`disabled:bg-transparent ${
                  animationTrigger && role === "대표1인" ? "animate" : ""
                } w-[180px]`}
                id="enLastName"
                placeholder="영문 이름을 입력하세요"
                value={info.enLastName}
                onChange={(e) =>
                  handleInput(
                    e.target.id as keyof travelerInfo,
                    onlyEnglish(e.target.value)
                  )
                }
                disabled={sameAsUserInfo}
              />
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex text-sub-black text-[14px] gap-[20px] shrink-0 
            max-xsm:border-t-[0.5px] max-xsm:border-main-color max-xsm:w-full"
            >
              <label
                htmlFor="enFirstName"
                className="shrink-0 max-xsm:bg-main-color/[.1] max-xsm:text-[12px] 
                        max-xsm:py-[8px] max-xsm:w-[75px] max-xsm:text-center"
              >
                <span className="text-red-700">*</span>영문 성
              </label>
              <input
                className={`disabled:bg-transparent ${
                  animationTrigger && role === "대표1인" ? "animate" : ""
                } max-xsm:text-[10px]`}
                id="enFirstName"
                placeholder="영문 성을 입력하세요"
                value={info.enFirstName}
                onChange={(e) =>
                  handleInput(
                    e.target.id as keyof travelerInfo,
                    onlyEnglish(e.target.value)
                  )
                }
                disabled={sameAsUserInfo}
              />
            </div>
            <div
              className="flex text-sub-black text-[14px] gap-[20px] 
            max-xsm:border-t-[0.5px] max-xsm:border-main-color max-xsm:w-full"
            >
              <label
                htmlFor="enLastName"
                className="shrink-0 max-xsm:bg-main-color/[.1] max-xsm:text-[12px] 
                        max-xsm:py-[8px] max-xsm:w-[75px] max-xsm:text-center"
              >
                <span className="text-red-700">*</span>영문 이름
              </label>
              <input
                className={`disabled:bg-transparent ${
                  animationTrigger && role === "대표1인" ? "animate" : ""
                } max-xsm:text-[10px]`}
                id="enLastName"
                placeholder="영문 이름을 입력하세요"
                value={info.enLastName}
                onChange={(e) =>
                  handleInput(
                    e.target.id as keyof travelerInfo,
                    onlyEnglish(e.target.value)
                  )
                }
                disabled={sameAsUserInfo}
              />
            </div>
          </>
        )}
        <div
          className="flex text-sub-black text-[14px] gap-[30px] 
        max-xsm:border-t-[0.5px] max-xsm:border-main-color max-xsm:w-full max-xsm:gap-[20px]"
        >
          <label
            className="shrink-0 max-xsm:bg-main-color/[.1] max-xsm:text-[12px] 
                        max-xsm:py-[8px] max-xsm:w-[75px] max-xsm:text-center"
          >
            <span className="text-red-700">*</span>성별
          </label>
          <CustomRadioBtn
            label="남"
            id="gender"
            checked={info.gender === "남"}
            handleInput={handleInput}
            disabled={sameAsUserInfo}
            animation={animationTrigger}
            role={role}
          />
          <CustomRadioBtn
            label="여"
            id="gender"
            checked={info.gender === "여"}
            handleInput={handleInput}
            disabled={sameAsUserInfo}
            animation={animationTrigger}
            role={role}
          />
        </div>
        <div
          className="flex text-sub-black text-[14px] gap-[20px] 
        max-xsm:border-t-[0.5px] max-xsm:border-main-color max-xsm:w-full"
        >
          <label
            htmlFor="birth"
            className="min-w-[55px] shrink-0 max-xsm:bg-main-color/[.1] max-xsm:text-[12px] 
                        max-xsm:py-[8px] max-xsm:w-[75px] max-xsm:text-center"
          >
            <span className="text-red-700">*</span>
            생년월일
          </label>
          <input
            type="text"
            id="birth"
            placeholder="생년월일을 입력하세요"
            className={`disabled:bg-transparent ${
              animationTrigger && role === "대표1인" ? "animate" : ""
            } max-xsm:text-[10px]`}
            value={inputBirth}
            onChange={(e) =>
              handleBirth(
                e.target.id as keyof travelerInfo,
                birthFormat(e.target.value)
              )
            }
            disabled={sameAsUserInfo}
          />
        </div>

        <div
          className="flex text-sub-black text-[14px] gap-[20px] 
        max-xsm:border-y-[0.5px] max-xsm:border-main-color max-xsm:w-full"
        >
          <label
            htmlFor="phoneNumber"
            className="shrink-0 max-xsm:bg-main-color/[.1] max-xsm:text-[12px] 
                        max-xsm:py-[8px] max-xsm:w-[75px] max-xsm:text-center"
          >
            {isRepresentative && <span className="text-red-700">*</span>}
            휴대폰번호
          </label>
          <input
            className={`disabled:bg-transparent ${
              animationTrigger && role === "대표1인" ? "animate" : ""
            } max-xsm:text-[10px]`}
            type="tell"
            id="phoneNumber"
            maxLength={13}
            placeholder="휴대폰번호를 입력하세요"
            value={info.phoneNumber}
            onChange={(e) =>
              handleInput(
                e.target.id as keyof travelerInfo,
                phoneNumberFormat(e.currentTarget.value)
              )
            }
            disabled={sameAsUserInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelerInfoForm;
