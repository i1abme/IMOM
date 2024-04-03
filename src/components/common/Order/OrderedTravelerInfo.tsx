import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import { TravelerInfoData } from "../../../types/manager";
import {
  birthFormat,
  checkValidDate,
  onlyEnglish,
  onlyKorean,
  phoneNumberFormat,
} from "../../../utils/validationUtils";
import CustomRadioBtn from "../CustomRadionbtn";
import OrderDetailBtn from "./OrderDetailBtn";
import { calculateAge } from "../../../utils/calculateAge";
import {
  REQUIRED_TRAVELER_DATA,
  WRONG_AGE_MESSAGES,
} from "../../../constants/travelerdata";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../../atom/atom";
import TableRow from "./TableRow";

const OrderedTravelerInfo = ({
  data,
  representative,
  id,
  handleDelete,
  handleEdit,
  startDate,
  role,
  orderState,
}: {
  startDate?: string;
  data: TravelerInfoData;
  representative?: boolean;
  id?: number;
  handleDelete?: (id: number, name: string, role: string) => void;
  handleEdit?: (
    id: number,
    info: TravelerInfoData,
    changedRole?: string,
    orderdRole?: string
  ) => void;
  role?: string;
  orderState?: string;
}) => {
  const [travelerInfo, setTravlerInfo] = useState<TravelerInfoData>({
    travelerName: "",
    enFirstName: "",
    enLastName: "",
    gender: "남",
    birth: "",
    phoneNumber: "",
    representative: false,
  });
  const [editable, setEditable] = useState(false);

  const [birth, setBrith] = useState("");

  const viewSizeState = useRecoilValue(viewSize);

  const handleInput = (id: string, value: string) => {
    setTravlerInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleEditable = (role?: string) => {
    if (!editable) {
      setEditable(true);
      return;
    }
    if (role === "cancel") {
      setTravlerInfo(() => ({ ...data }));
    }
    if (birth.length < 10) {
      alert("필수 여행자정보를 모두 기입해주세요.");
      return;
    }
    if (role === "submit" && (id === 0 || id) && handleEdit && startDate) {
      // 기본적인 필수 정보 존재 여부 확인
      const isAllValid = REQUIRED_TRAVELER_DATA.every(
        (field) => travelerInfo[field as keyof typeof travelerInfo] !== ""
      );
      // 대표 1인의 핸드폰 번호 존재 여부 확인
      const isRepresenterValid =
        !travelerInfo.representative || travelerInfo.phoneNumber !== "";

      if (isRepresenterValid && isAllValid) {
        data.birth !== ""
          ? handleEdit(
              id,
              travelerInfo,
              calculateAge(birth, startDate)[1],
              calculateAge(data.birth, startDate)[1]
            )
          : handleEdit(id, travelerInfo, calculateAge(birth, startDate)[1]);
      } else {
        alert("필수 여행자정보를 모두 기입해주세요.");
        return;
      }
    }
    setEditable(!editable);
  };

  const handleDeleteClick = () => {
    if (startDate && handleDelete && id) {
      handleDelete(
        id,
        travelerInfo.travelerName,
        calculateAge(data.birth, startDate)[0]
      );
    }
  };

  const handleBirth = (date: string) => {
    setBrith(date);
  };

  useEffect(() => {
    if (data) {
      setTravlerInfo(data);
    }
  }, [data]);

  useEffect(() => {
    if (data.birth !== birth && birth.length === 10) {
      if (checkValidDate(birth) && startDate) {
        const changedRole = calculateAge(birth, startDate)[0]; // 바뀌는 나이 카테고리
        const orderedRole = calculateAge(data.birth, startDate)[0];
        if (orderedRole !== changedRole) {
          // 나이 카테고리가 변경되어야 할 시
          const changeAge = confirm(
            WRONG_AGE_MESSAGES[changedRole as keyof typeof WRONG_AGE_MESSAGES]
          );
          if (changeAge) {
            setTravlerInfo((prev) => ({ ...prev, birth: birth }));
          } else if (!changeAge) {
            setBrith("");
            return;
          }
        } else if (orderedRole === changedRole) {
          setTravlerInfo((prev) => ({ ...prev, birth: birth }));
        }
      }
      if (!checkValidDate(birth)) {
        alert("유효한 생년월일이 아닙니다.");
        setBrith(birth.slice(0, -1));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birth, startDate, id]);

  useEffect(() => {
    setTravlerInfo((prev) => ({ ...prev, ...data }));
    if (!data.travelerName) {
      setEditable(true);
    }
    if (data.travelerName && startDate) {
      setBrith(data.birth);
    }
    if (representative) {
      setBrith(data.birth);
    }
  }, [data, startDate, representative]);

  return (
    <div className={`flex flex-col items-end w-full min-w-max`}>
      {!representative && role === "admin" && orderState !== "취소" && (
        <div className="flex gap-[12px] mb-[4px]">
          {id !== null && !editable ? (
            <OrderDetailBtn handleClick={handleEditable} label="수정하기" />
          ) : (
            <>
              <OrderDetailBtn
                handleClick={handleEditable}
                role="submit"
                label="작성완료"
              />
              {data.travelerName && (
                <OrderDetailBtn
                  handleClick={handleEditable}
                  role="cancel"
                  label="작성취소"
                />
              )}
            </>
          )}
          {!travelerInfo.representative && handleDelete && !editable && (
            <OrderDetailBtn handleClick={handleDeleteClick} label="삭제하기" />
          )}
        </div>
      )}
      {viewSizeState === "web" && (
        <div
          className={`w-full min-w-max ${
            !representative && !editable ? "border-y border-black" : ""
          } ${editable ? "border-[2px] border-main-color" : ""}`}
        >
          <div className="flex items-center border-b border-sub-black w-ful min-w-max">
            <div className="flex items-center w-[33.3%] min-w-max">
              <TableHeader smallHeader={true} category="이름" />
              <input
                className={`disabled:bg-transparent px-[24px] w-full min-w-max`}
                id="travelerName"
                value={travelerInfo.travelerName}
                onChange={(e) =>
                  handleInput(e.target.id, onlyKorean(e.target.value))
                }
                disabled={!editable}
              />
            </div>
            <div className="flex items-center w-[33.3%] min-w-max">
              <TableHeader smallHeader={true} category="영문 이름" />
              <input
                className={`disabled:bg-transparent px-[24px] w-full min-w-max`}
                id="enFirstName"
                value={travelerInfo.enFirstName}
                onChange={(e) =>
                  handleInput(e.target.id, onlyEnglish(e.target.value))
                }
                disabled={!editable}
              />
            </div>
            <div className="flex items-center w-[33.3%] min-w-max">
              <TableHeader smallHeader={true} category="영문 성" />
              <input
                className={`disabled:bg-transparent px-[24px] w-full min-w-max`}
                id="enLastName"
                value={travelerInfo.enLastName}
                onChange={(e) =>
                  handleInput(e.target.id, onlyEnglish(e.target.value))
                }
                disabled={!editable}
              />
            </div>
          </div>
          <div className="flex items-center w-full min-w-max">
            <div className="flex items-center  w-[33.3%] min-w-max">
              <TableHeader smallHeader={true} category="성별" />
              <div className="flex gap-[20px] px-[24px] w-full">
                <CustomRadioBtn
                  label="남"
                  id="gender"
                  checked={travelerInfo.gender === "남"}
                  handleInput={handleInput}
                  disabled={!editable}
                />
                <CustomRadioBtn
                  label="여"
                  id="gender"
                  checked={travelerInfo.gender === "여"}
                  handleInput={handleInput}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="flex items-center w-[33.3%] min-w-max">
              <TableHeader smallHeader={true} category="생년월일" />
              <input
                className={`disabled:bg-transparent px-[24px] w-full min-w-max`}
                type="text"
                id="birth"
                value={birth}
                onChange={(e) => handleBirth(birthFormat(e.target.value))}
                disabled={!editable}
              />
            </div>
            <div className="flex items-center w-[33.3%] min-w-max ">
              <TableHeader smallHeader={true} category="휴대폰" />
              <input
                className={`disabled:bg-transparent px-[24px] w-full min-w-max`}
                maxLength={13}
                type="tell"
                id="phoneNumber"
                value={travelerInfo.phoneNumber ?? ""}
                onChange={(e) =>
                  handleInput(e.target.id, phoneNumberFormat(e.target.value))
                }
                disabled={!editable}
              />
            </div>
          </div>
        </div>
      )}
      {viewSizeState === "mobile" && role === "user" && (
        <div
          className={`w-full flex ${
            !representative && `border-y-[0.5px] border-main-color`
          }`}
        >
          {!representative && <TableHeader category="여행자" />}
          <div className="w-full flex flex-col">
            <div className="flex">
              <TableRow
                category="이름"
                content={travelerInfo.travelerName}
                headerStyle={
                  "tracking-[-0.5px] !text-[10px] max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px] max-xsm:max-w-[68px]"
                }
              />
              <TableRow
                category="영문 이름"
                content={travelerInfo.enLastName}
                headerStyle={
                  "tracking-[-0.5px] !text-[10px] max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px] max-xsm:max-w-[68px]"
                }
              />
            </div>
            <div className="flex border-t-[0.5px] border-main-color">
              <TableRow
                category="영문성"
                content={travelerInfo.enFirstName}
                headerStyle={
                  "tracking-[-0.5px] !text-[10px] max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px] max-xsm:max-w-[68px]"
                }
              />
              <TableRow
                category="성별"
                content={travelerInfo.gender}
                headerStyle={
                  "tracking-[-0.5px] !text-[10px] max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px] max-xsm:max-w-[68px]"
                }
              />
            </div>
            <TableRow
              category="휴대폰"
              content={travelerInfo.phoneNumber ? travelerInfo.phoneNumber : ""}
              rowStyle={"border-y-[0.5px] border-main-color"}
              headerStyle={
                "tracking-[-0.5px] !text-[10px] max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px] max-xsm:max-w-[68px]"
              }
            />
            <TableRow
              category="생년월일"
              content={travelerInfo.enFirstName}
              headerStyle={
                "!text-[10px] tracking-[-0.5px] max-xsm:bg-[#F5F5F4] max-xsm:h-fit max-xsm:py-[8px] max-xsm:w-full max-xsm:px-[10px] max-xsm:max-w-[68px]"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderedTravelerInfo;
