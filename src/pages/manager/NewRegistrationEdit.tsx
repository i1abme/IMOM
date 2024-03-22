import { useEffect, useState } from "react";
import { packageTitle, registSubTitle } from "../../constants/data";
import UiEditor from "../../components/common/UiEditor";
import ManagerTitleBox from "../../components/Manager/ManagerTitleBox";
import MainManagerBtn from "../../components/Manager/MainManagerBtn";
import TagInput from "../../components/Manager/TagInput";
import PackageEditorList from "../../components/Manager/package/PackageEditorList";
import RegistSubInput from "../../components/Manager/RegistSubInput";
import { useGetTags } from "../../api/useGetTags";
import { useGetContries } from "../../api/useGetContries";
import { useNavigate, useParams } from "react-router-dom";
import { baseInstance } from "../../api/instance";

interface DayContent {
  dayContentMd: string;
  dayContentHtml: string;
}

interface DateProps {
  day: number;
  scheduleId?: number;
  dayContent: {
    dayContentMd: string;
    dayContentHtml?: string;
  };
  hotel: string;
  meal: string;
  vehicle: string;
}

interface ListsType {
  [key: string]: string[];
}
const NewRegistrationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const ref = useRef<Editor[] | null>(null);
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
  const [days, setDays] = useState<DateProps[]>([]);

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
  const [lists, setLists] = useState<ListsType>({
    themeList: [],
    familyList: [],
    seasonList: [],
    priceList: [],
  });

  useEffect(() => {
    baseInstance.get(`/packages/${id}`).then((res) => {
      if (res.status === 200) {
        const {
          countryName,
          hashTag,
          period,
          privacy,
          summary,
          packageName,
          regionInfo,
          terms,
          hotelInfo,
          checkedTagList,
          scheduleList,
          thumbnailList,
        } = res.data.data;
        const transformedScheduleList = scheduleList.map((item: DateProps) => {
          return {
            day: item.day,
            dayContent: {
              dayContentMd: item.dayContent,
              dayContentHtml: "",
            },
            hotel: item.hotel,
            meal: item.meal,
            vehicle: item.vehicle,
          };
        });
        setPrivacy(privacy);
        setSelectCountry(countryName);
        setPackageName(packageName);
        setPackageSummary(summary);
        setPeriod(period);
        setTaggedValue(hashTag);
        setHotelInfoMd(hotelInfo);
        setRegionInfoMd(regionInfo);
        setTermsMd(terms);
        setDays(transformedScheduleList);
        setLists((prevLists) => {
          const newLists = { ...prevLists };
          checkedTagList.forEach(
            (item: { tagContent: string; tagType: string }) => {
              const { tagContent, tagType } = item;
              switch (tagType) {
                case "테마":
                  newLists.themeList = [...newLists.themeList, tagContent];
                  break;
                case "구성원":
                  newLists.familyList = [...newLists.familyList, tagContent];
                  break;
                case "시기":
                  newLists.seasonList = [...newLists.seasonList, tagContent];
                  break;
                case "비용":
                  newLists.priceList = [...newLists.priceList, tagContent];
                  break;
                default:
                  break;
              }
            }
          );
          return newLists;
        });
        const filesToSend = Promise.all(
          thumbnailList.map(
            (thumbnail: { imageUrl: string; originalImageName: string }) => {
              const { imageUrl, originalImageName } = thumbnail;
              return fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => new File([blob], originalImageName));
            }
          )
        );

        filesToSend.then((files) => {
          setSendImg(files);
        });

        setMyImage(
          thumbnailList.map((thumbnail: { imageUrl: string }) => {
            const { imageUrl } = thumbnail;
            return imageUrl;
          })
        );
      }
    });
  }, [id]);

  // 핸들
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;

    if (checked) {
      // 새로운 태그가 추가되는 경우
      if (!lists[name].includes(value)) {
        // 해당하는 리스트에 값 추가
        setLists((prevLists) => ({
          ...prevLists,
          [name]: [...prevLists[name], value],
        }));
      }
    } else {
      // 기존에 체크된 태그가 해제되는 경우
      setLists((prevLists) => ({
        ...prevLists,
        [name]: prevLists[name].filter((item) => item !== value),
      }));
    }
  };

  /* 폼데이터 post요청 */
  const handleOnSubmit = () => {
    const jsonData = {
      packageName: packageName,
      summary: packageSummary,
      period: period,
      privacy: privacy,
      countryName: selectCountry,
      themeList: lists.themeList,
      familyList: lists.familyList,
      priceList: lists.priceList,
      seasonList: lists.seasonList,
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
    if (packageName !== "" && dayEmptyContent) {
      baseInstance
        .put(`/packages/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/packagemanager");
            alert("수정이 완료됐습니다");
          }
        });
    } else {
      alert("일차,패키지이름은 필수 값 입니다.");
    }
  };
  // 임시저장
  const handleTemporarySave = () => {
    const jsonData = {
      packageName: packageName,
      summary: packageSummary,
      period: period,
      privacy: privacy,
      countryName: selectCountry,
      themeList: lists.themeList,
      familyList: lists.familyList,
      priceList: lists.priceList,
      seasonList: lists.seasonList,
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
      termMd !== "" &&
      hotelInfoMd !== "" &&
      regionInfoMd !== ""
    ) {
      baseInstance
        .put(`/packages/save/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/packagemanager");
            alert("저장이 완료됐습니다");
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
        dayContent: { dayContentMd: "", dayContentHtml: "" },
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
    value: string | DayContent,
    name: string,
    index: number
  ) => {
    const updatedDays = [...days];
    const newDays = updatedDays.map((_item, _index) => {
      if (_index === index) {
        if (name === "dayContent") {
          const updatedDayContent: DayContent =
            typeof value === "string"
              ? { dayContentMd: value, dayContentHtml: "" }
              : value;

          return {
            ..._item,
            dayContent: updatedDayContent,
          };
        } else {
          return {
            ..._item,
            [name]: value,
          };
        }
      } else {
        return { ..._item };
      }
    });

    setDays(newDays);
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
      setPeriod(parseInt(value, 10));
    }
  };

  return (
    <div className="w-full h-full">
      {/* 이름 요약 여행지 */}
      <h2>패키지 수정</h2>
      <div className="flex flex-col w-full">
        <div className="flex justify-center">
          <ManagerTitleBox
            className="border-y border-l border-black"
            name="패키지 이름"
          />
          <input
            name="패키지 이름"
            onChange={handlePackageChange}
            value={packageName}
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
            value={packageSummary}
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
            value={period}
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
            value={selectCountry}
            onChange={(e) => setSelectCountry(e.target.value)}
          >
            <option disabled value="default" hidden>
              전체 여행지
            </option>

            {countrys.map((el, idx) => {
              return (
                <option key={`countrys-option-${idx}`} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex w-full mb-16">
          <div className="bg-title-box px-5 py-3 w-36">공개여부</div>
          <select
            defaultValue="default"
            className="border border-black w-56"
            onChange={(e) => setPrivacy(e.target.value)}
            value={privacy}
          >
            <option disabled value="default" hidden>
              공개여부
            </option>

            {["공개", "비공개"].map((el, idx) => {
              return (
                <option key={`privacy-option-${idx}`} value={el}>
                  {el}
                </option>
              );
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
                      checked={lists[category].includes(value.tagContent)}
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
            <div className="flex w-full mb-20" key={`day-${index}`}>
              <div>
                <ManagerTitleBox
                  name={`${index + 1}일차`}
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
                  name="dayContent"
                  index={index}
                  handleDayInputChange={handleDayInputChange}
                  initialValue={day.dayContent.dayContentMd}
                />
                {registSubTitle.map((el, idx) => {
                  return (
                    <RegistSubInput
                      key={idx}
                      title={el.title}
                      handleDayInputChange={handleDayInputChange}
                      index={index}
                      days={days}
                      day={index}
                      name={el.name}
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
                hotelInfo={hotelInfoMd}
                regionInfo={regionInfoMd}
                terms={termMd}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-full h-[1px] my-16 bg-black" />
          <div className="flex mb-10">
            <button
              onClick={handleTemporarySave}
              className="bg-title-box px-20 py-3 mr-2 border border-black"
            >
              저장하기
            </button>
            <button
              onClick={handleOnSubmit}
              className="bg-title-box px-20 py-3 border border-black"
            >
              수정하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRegistrationEdit;
