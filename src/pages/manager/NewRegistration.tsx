import { useState } from "react";
import { packageTitle, registSubTitle } from "../../constants/data";
import UiEditor from "../../components/common/UiEditor";
import ManagerTitleBox from "../../components/Manager/ManagerTitleBox";
import MainManagerBtn from "../../components/Manager/MainManagerBtn";
import TagInput from "../../components/Manager/TagInput";
import PackageEditorList from "../../components/Manager/package/PackageEditorList";
import RegistSubInput from "../../components/Manager/RegistSubInput";
import { useGetTags } from "../../api/useGetTags";
import { useGetContries } from "../../api/useGetContries";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "../../api/instance";

interface DateProps {
  day: number;
  dayContent?: {
    dayContentMd?: string;
    dayContentHtml?: string;
  };
  hotel: string;
  meal: string;
  vehicle: string;
}
const NewRegistration = () => {
  const navigate = useNavigate();
  // 패키지 이름
  const [packageName, setPackageName] = useState<string>("");
  // 패키지 요약
  const [packageSummary, setPackageSummary] = useState<string>("");
  // 기간
  const [period, setPeriod] = useState<number>(0);
  // 여행지 선택
  const [selectCountry, setSelectCountry] = useState<string>("");
  // 공개여부
  const [privacy, setPrivacy] = useState<string>("");
  // 여행지
  const { countrys } = useGetContries();
  // 자유태그
  const [inputValue, setInputValue] = useState("");
  const [taggedValue, setTaggedValue] = useState("");
  // 썸네일 이미지
  const [myImage, setMyImage] = useState<string[]>([]);
  const [sendImg, setSendImg] = useState<File[]>([]);
  // 에디터 및 input 형식
  const [days, setDays] = useState<DateProps[]>([
    {
      day: 1,
      dayContent: {},
      hotel: "",
      meal: "",
      vehicle: "",
    },
  ]);
  const { tagsData } = useGetTags({
    params: "tags",
  });
  // 호텔안내
  const [hotelInfoMd, setHotelInfoMd] = useState<string>("");
  const [hotelInfoHtml, setHotelInfoHtml] = useState<string>("");
  // 지역정보
  const [regionInfoMd, setRegionInfoMd] = useState<string>("");
  const [regionInfoHtml, setRegionInfoHtml] = useState<string>("");
  // 여행약관
  const [termMd, setTermsMd] = useState<string>("");
  const [termHtml, setTermsHtml] = useState<string>("");
  /* 태그 */
  // 테마 리스트
  const [themeList, setThemeList] = useState<string[]>([]);
  // 가족 리스트
  const [familyList, setFamilyList] = useState<string[]>([]);
  // 시기 리스트
  const [seasonList, setSeasonList] = useState<string[]>([]);
  // 비용 리스트
  const [priceList, setPriceList] = useState<string[]>([]);
  // 태그 onChange함수
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;

    if (checked) {
      if (name === "themeList") {
        setThemeList((prev) => [...prev, value]);
      } else if (name === "familyList") {
        setFamilyList((prev) => [...prev, value]);
      } else if (name === "seasonList") {
        setSeasonList((prev) => [...prev, value]);
      } else if (name === "priceList") {
        setPriceList((prev) => [...prev, value]);
      }
    } else {
      if (name === "themeList") {
        setThemeList((prev) => prev.filter((item) => item !== value));
      } else if (name === "familyList") {
        setFamilyList((prev) => prev.filter((item) => item !== value));
      } else if (name === "seasonList") {
        setSeasonList((prev) => prev.filter((item) => item !== value));
      } else if (name === "priceList") {
        setPriceList((prev) => prev.filter((item) => item !== value));
      }
    }
  };

  /* 폼데이터 */
  /* 폼데이터 post요청 */
  const handleOnSubmit = () => {
    const jsonData = {
      packageName: packageName,
      summary: packageSummary,
      period: period,
      privacy: privacy,
      countryName: selectCountry,
      themeList: themeList,
      familyList: familyList,
      priceList: priceList,
      seasonList: seasonList,
      hashTag: taggedValue,
      hotelInfoMd: hotelInfoMd,
      hotelInfoHtml: hotelInfoHtml,
      regionInfoMd: regionInfoMd,
      regionInfoHtml: regionInfoHtml,
      termsMd: termMd,
      termsHtml: termHtml,
      scheduleList: days,
    };
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );
    sendImg.forEach((file) => {
      formData.append("files", file);
    });

    const dayEmptyContent = days.some((el) => el.dayContent);
    if (
      packageName !== "" &&
      packageSummary !== "" &&
      period !== 0 &&
      selectCountry !== "" &&
      privacy !== "" &&
      sendImg.length > 0 &&
      dayEmptyContent &&
      days.some((el) => el.dayContent?.dayContentMd !== "") &&
      termMd !== "" &&
      hotelInfoMd !== "" &&
      regionInfoMd !== ""
    ) {
      baseInstance
        .post("/packages/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 2000) {
            navigate("/packagemanager");
            alert("등록이 완료됐습니다");
          }
        });
    } else {
      alert("값을 전부 채워주세요");
    }
  };
  // 날짜추가
  const addDay = () => {
    const newDay = days.length + 1;
    setDays([
      ...days,
      {
        day: newDay,
        dayContent: {},
        hotel: "",
        meal: "",
        vehicle: "",
      },
    ]);
  };
  // 날짜 삭제
  const removeDay = () => {
    if (days.length > 1) {
      const updatedDays = [...days.slice(0, -1)];
      setDays(updatedDays);
    }
  };
  // 에디터  + input 데이터 배열에 넣기
  const handleDayInputChange = (
    value: string | { dayContentMd: string; dayContentHtml: string },
    name: string,
    index: number
  ) => {
    const updatedDays = [...days];
    updatedDays[index] = { ...updatedDays[index], [name]: value };
    setDays(updatedDays);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 엔터 누르면 tag입력
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim() !== "") {
        setTaggedValue((prev) =>
          prev ? `${prev}#${inputValue}` : `#${inputValue}`
        );
        setInputValue("");
      }
    }
  };
  // 태그지우기
  const handleTagRemove = () => {
    setTaggedValue((prev) => {
      const parts = prev.split("#");
      parts.pop();
      return parts.join("#");
    });
  };
  const handlePackageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "패키지 이름") {
      setPackageName(value);
    } else if (name === "패키지 요약") {
      setPackageSummary(value);
    } else if (name === "기간") {
      setPeriod(Number(value));
    }
  };
  // 임시저장 함수
  const handleTemporarySaveClick = () => {
    const jsonData = {
      packageName: packageName,
      summary: packageSummary,
      period: period,
      privacy: privacy,
      countryName: selectCountry,
      themeList: themeList,
      familyList: familyList,
      priceList: priceList,
      seasonList: seasonList,
      hashTag: taggedValue,
      hotelInfoMd: hotelInfoMd,
      hotelInfoHtml: hotelInfoHtml,
      regionInfoMd: regionInfoMd,
      regionInfoHtml: regionInfoHtml,
      termsMd: termMd,
      termsHtml: termHtml,
      scheduleList: days,
    };
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );
    sendImg.forEach((file) => {
      formData.append("files", file);
    });
    const dayEmptyContent = days.some((el) => el.dayContent);
    if (
      packageName !== "" &&
      selectCountry !== "" &&
      privacy !== "" &&
      dayEmptyContent &&
      days.some((el) => el.dayContent?.dayContentMd !== "")
    ) {
      baseInstance
        .post("/packages/temp-create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("임시저장 완료!");
            navigate("/packagemanager");
          }
        });
    } else {
      alert("여행지,패키지이름,공개여부,일정안내는 필수 입력값 입니다.");
    }
  };

  return (
    <div className="w-full h-full">
      {/* 이름 요약 여행지 */}
      <h2>패키지 신규/수정 등록</h2>
      <div className="flex flex-col w-full">
        <div className="flex justify-center">
          <ManagerTitleBox
            className="border-y border-l border-black"
            name="패키지 이름"
          />
          <input
            name="패키지 이름"
            onChange={handlePackageChange}
            className="border pl-5  border-black outline-none w-full flex items-center"
          ></input>
        </div>
        <div className="flex w-full mb-3">
          <ManagerTitleBox
            className="border-l border-b border-black"
            name="패키지 요약"
          />
          <input
            name="패키지 요약"
            onChange={handlePackageChange}
            className="pl-5 border-x border-b border-black outline-none w-full flex items-center"
          ></input>
        </div>
        <div className="flex w-full mb-3">
          <ManagerTitleBox
            className="border-l border-y  border-black"
            name="기간"
          />
          <input
            onChange={handlePackageChange}
            name="기간"
            type="number"
            className="pl-5 border-x border-y border-black outline-none w-full flex items-center"
            placeholder="숫자만 입력 가능합니다."
          ></input>
        </div>
        <div className="flex w-full mb-16">
          <div className="bg-title-box px-5 py-3 w-36">여행지</div>
          <select
            defaultValue="default"
            className="border border-black w-56"
            onChange={(e) => setSelectCountry(e.target.value)}
          >
            <option disabled value="default" hidden>
              전체 여행지
            </option>

            {countrys.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
        </div>
        <div className="flex w-full mb-16">
          <div className="bg-title-box px-5 py-3 w-36">공개여부</div>
          <select
            defaultValue="default"
            className="border border-black w-56"
            onChange={(e) => setPrivacy(e.target.value)}
          >
            <option disabled value="default" hidden>
              공개여부
            </option>

            {["공개", "비공개"].map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
        </div>
      </div>
      {/* 패키지 썸네일 */}

      <div className="w-full mb-10">
        <ManagerTitleBox name="패키지 썸네일" className="mb-2" />
        <div className="w-full flex">
          <MainManagerBtn
            myImage={myImage}
            setMyImage={setMyImage}
            sendImg={sendImg}
            setSendImg={setSendImg}
            limitLength={6}
          />
        </div>
      </div>
      {/* 태그 */}
      <div className="flex flex-col w-full mb-36">
        <div className="flex w-full mb-9">
          <ManagerTitleBox name="태그" className="h-10 mr-10" />

          <div className="flex flex-col w-full">
            {Object.keys(tagsData).map((category, outerIndex) => {
              let customTitle = "";
              if (category === "themeList") {
                customTitle = "테마";
              } else if (category === "familyList") {
                customTitle = "구성원";
              } else if (category === "seasonList") {
                customTitle = "시기";
              } else if (category === "priceList") {
                customTitle = "비용";
              }
              return (
                <div key={outerIndex} className="flex items-center w-full mb-5">
                  <div className="whitespace-nowrap w-14">{customTitle}</div>
                  {tagsData[category].map((value, innerIndex) => (
                    <TagInput
                      id={value.tagId}
                      title={value.tagContent}
                      key={innerIndex}
                      category={category}
                      handleTagsChange={handleTagsChange}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center">
          <ManagerTitleBox name="자유태그" className="mr-10" />
          {/* 자유태그 input */}
          <div className="w-full flex flex-col">
            <input
              className="w-full outline-none border border-black"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              placeholder="태그입력 후 엔터를 눌러주세요"
            />
            <div className="flex mt-2">
              <div className="mr-2">{taggedValue}</div>
              {taggedValue && (
                <button
                  onClick={handleTagRemove}
                  className="rounded-full bg-main-color px-2 text-white hover:text-red-500"
                >
                  지우기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 일정안내 */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="w-full">
          <h2 className="font-bold text-xl mb-4">일정 안내</h2>
          {days.map((day, index) => (
            <div className="flex w-full mb-20" key={index}>
              <div>
                <ManagerTitleBox
                  name={`${day.day}일차`}
                  className="border border-black mr-4"
                />
                {index > 0 && index === days.length - 1 && (
                  <div>
                    <button
                      className="bg-title-box px-5 py-3 w-36 flex justify-center border border-black"
                      onClick={removeDay}
                    >
                      삭제하기
                    </button>
                  </div>
                )}
                {index === days.length - 1 && (
                  <button
                    className="bg-title-box px-5 py-3 w-36 flex justify-center border border-black"
                    onClick={addDay}
                  >
                    +
                  </button>
                )}
              </div>
              <div className=" w-full">
                <UiEditor
                  name={Object.keys(day)[1]}
                  index={index}
                  handleDayInputChange={handleDayInputChange}
                />
                {registSubTitle.map((el, idx) => {
                  return (
                    <RegistSubInput
                      key={idx}
                      title={el.title}
                      handleDayInputChange={handleDayInputChange}
                      index={index}
                      name={el.name}
                      day={index}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div>
          {packageTitle.map((el, index) => {
            return (
              <PackageEditorList
                key={index}
                title={el}
                setHotelInfoMd={setHotelInfoMd}
                setHotelInfoHtml={setHotelInfoHtml}
                setRegionInfoMd={setRegionInfoMd}
                setRegionInfoHtml={setRegionInfoHtml}
                setTermsMd={setTermsMd}
                setTermsHtml={setTermsHtml}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-full h-[1px] my-16 bg-black" />
          <div className="flex mb-10">
            <button
              onClick={handleTemporarySaveClick}
              className="bg-title-box mr-3 px-20 py-3 border border-black"
            >
              임시저장
            </button>
            <button
              onClick={handleOnSubmit}
              className="bg-title-box px-20 py-3 border border-black"
            >
              등록하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRegistration;
