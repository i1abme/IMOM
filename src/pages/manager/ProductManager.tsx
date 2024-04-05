import React, { useEffect, useState } from "react";
import { productHeaders } from "../../constants/data";
// import Pagination from "../../components/common/Pagination";
import CustomDatePicker from "../../components/common/CustomDatePicker";
import { useNavigate } from "react-router-dom";
import { baseInstance } from "../../api/instance";
import PackageSelect from "../../components/Manager/package/PackageSelect";
import { useGetPackage } from "../../api/useGetPackage";
import { useSetRecoilState } from "recoil";
import { saveState } from "../../atom/atom";
import CustomPagination from "../../components/common/CustomPagination";
import ManagerTitle from "../../components/Manager/ManagerTitle";

type ProductData = {
  endDate: string;
  maxCount: number;
  minCount: number;
  nowCount: number;
  packageName: string;
  privacy: string;
  productCode: string;
  productId: number;
  productState: string;
  saveState: string;
  startDate: string;
};

const ProductManager = () => {
  const navagation = useNavigate();
  // 체크된 리스트
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  // 패키지 리스트
  const { packagesList, setPackagesList, setResetActive } = useGetPackage();
  // 패키지 아이디
  const [packageId, setPackageId] = useState<number | null>(null);
  // 예약 상태
  const [reserveState, setReserveState] = useState<string>("");
  // 기간
  const [period, setPeriod] = useState<string>("");
  //공개여부
  const [privacy, setPrivacy] = useState<string | null>(null);
  //공개변경
  const [privacyState, setPrivacyState] = useState<string | null>(null);
  //저장여부
  const [save, setSave] = useState<string | null>(null);
  // 시작일 / 종료일
  const [endQuarterDate, setEndQuarterDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  // 상품 데이터
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  // 함수 날짜 변환
  const formatDateToISOString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // 공개 비공개 active
  const [changeActive, setChangeActive] = useState<boolean>(false);
  // 삭제 active
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  // 복사 active
  const [copyActive, setCopyActive] = useState<boolean>(false);
  const [arrowState, setArrowState] = useState<{
    [key: string]: boolean | null;
  }>({
    arrivalTime: false,
    departureTime: false,
  });

  // 페이지 네이션 페이지갯수
  const [totalPage, setTotalPage] = useState(0);
  const [offset, setOffset] = useState(0);
  // 페이징 함수
  const handlePageChange = (selected: number) => {
    setOffset(selected);
  };
  // 임시수정 acitve
  const setTemporaryActive = useSetRecoilState(saveState);
  const handleToggleAll = () => {
    if (selectedItems.length === productsData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(productsData.map((item) => item.productId));
    }
  };

  const handleToggleItem = (key: number): void => {
    if (selectedItems.includes(key)) {
      setSelectedItems(selectedItems.filter((id) => id !== key));
    } else {
      setSelectedItems([...selectedItems, key]);
    }
  };
  // 삭제/신규/복사/수정 버튼
  const handleProductBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget;
    const dataset = (e.currentTarget as HTMLButtonElement).dataset;
    const saveData = dataset?.save;
    if (name === "신규등록") {
      navagation("/productdetail");
    } else if (name === "선택삭제") {
      selectedItems.length === 0
        ? alert("하나이상 체크해주세요")
        : baseInstance
            .post("/products/batch-delete", {
              operation: "삭제",
              ids: selectedItems,
            })
            .then((res) => {
              if (res.status === 200) {
                setDeleteActive(true);
                alert("삭제 완료!");
              }
            })
            .catch((err) => console.error(err));
    } else if (name === "수정" && saveData) {
      navagation(`/productdetail/${value}`);
      setTemporaryActive(saveData);
    } else if (name === "복사") {
      baseInstance
        .get(`/products/duplicate/${value}`)
        .then((res) => {
          if (res.status === 200) {
            setCopyActive(true);
            alert("복사완료!");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  // 기간 버튼 필터링
  const handlePeriodClick = (value: string) => {
    if (period === value) {
      setPeriod("");
      setEndQuarterDate(null);
    } else {
      setPeriod(value);
      const nowDate = new Date();
      const newStartDate = new Date(nowDate);
      if (value === "하루") {
        setEndQuarterDate(nowDate);
      } else if (value === "일주일") {
        newStartDate.setDate(nowDate.getDate() - 7);
        setEndQuarterDate(newStartDate);
      } else if (value === "1달이내") {
        newStartDate.setMonth(nowDate.getMonth() - 1);
        setEndQuarterDate(newStartDate);
      }
    }
  };

  // 수정
  useEffect(() => {
    if (changeActive) {
      if (selectedItems.length > 0) {
        baseInstance
          .post("/products/batch-update", {
            operation: privacyState,
            ids: selectedItems,
          })
          .then((res) => {
            if (res.status === 200) {
              setChangeActive(false);
              alert("수정완료!");
            }
          });
      } else {
        alert("선택된 항목이 없습니다.");
      }
    }
  }, [changeActive, privacyState]);

  // 상품부르고 보내기
  useEffect(() => {
    baseInstance
      .post("/products", {
        packageId: packageId ? packageId : null,
        productState:
          reserveState === "" || reserveState === "전체" ? null : reserveState,
        privacy: privacy === "" || privacy === "전체" ? null : privacy,
        saveState: save === "" || save === "전체" ? null : save,
        startDateMin: endQuarterDate
          ? formatDateToISOString(endQuarterDate)
          : startDate,
        startDateMax: endQuarterDate
          ? formatDateToISOString(new Date())
          : endDate,
        endDateOrder: arrowState.arrivalTime
          ? 1
          : arrowState.departureTime
          ? 0
          : null,
        startDateOrder: arrowState.departureTime
          ? 1
          : arrowState.arrivalTime
          ? 0
          : null,

        offset: offset,
        limit: 10,
      })
      .then((res) => {
        setProductsData(res.data.data.content);
        setTotalPage(res.data.data.totalPages);
        setDeleteActive(false);
        setCopyActive(false);
      })
      .catch((err) => console.error(err));
  }, [
    endDate,
    endQuarterDate,
    packageId,
    reserveState,
    privacy,
    save,
    changeActive,
    deleteActive,
    copyActive,
    arrowState.departureTime,
    arrowState.arrivalTime,
    offset,
  ]);

  const handleDateFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const packageValue = e.currentTarget.dataset
      .product as keyof typeof arrowState;

    setArrowState((prevState) => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key, value]) => {
          if (key === packageValue) return [key, !value];
          if (key !== packageValue && value !== null) return [key, null];
          return [key, value];
        })
      ),
    }));
  };
  const handleResetClick = () => {
    setPackageId(null);
    setReserveState("");
    setPrivacy("");
    setSave("");
    setStartDate(new Date());
    setEndDate(null);
    setEndQuarterDate(null);
    setPeriod("");
    setPackagesList([]);
    setResetActive(true);
  };

  return (
    <div className="w-full pr-10">
      <ManagerTitle title="상품 목록" />
      <div className="mb-2">
        <div className="flex  border-y w-full h-10 items-center ">
          <div className="h-full w-40 flex justify-center items-center bg-gray-300">
            패키지 이름
          </div>
          <select
            className="ml-5 border pl-4 py-2 border-black w-80 outline-none"
            onChange={(e) => setPackageId(Number(e.target.value))}
          >
            <option>패키지 목록</option>
            {packagesList.length !== 0 ? (
              packagesList.map((el) => (
                <option key={el.packageId} value={el.packageId}>
                  {el.packageName}
                </option>
              ))
            ) : (
              <option disabled>패키지가 없습니다.</option>
            )}
          </select>
        </div>
        <div className="flex  border-b w-full h-10 items-center">
          <div className="h-full flex w-40 justify-center items-center bg-gray-300">
            상품 상태
          </div>
          <select
            className="ml-5 pl-4 py-2 border border-black w-80 outline-none"
            onChange={(e) => setReserveState(e.target.value)}
            value={reserveState}
          >
            {["전체", "예약 가능", "예약 마감"].map((el, idx) => (
              <option key={idx} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="flex  border-b w-full h-10 items-center">
          <div className="h-full flex w-40 mr-5 justify-center items-center bg-gray-300">
            공개 상태별 보기
          </div>
          <PackageSelect
            onChange={setPrivacy}
            value={privacy}
            options={["전체", "공개", "비공개"]}
            className="w-80 py-2"
          />
        </div>
        <div className="flex  border-b w-full border-black h-10 items-center">
          <div className="h-full flex w-40 mr-5 justify-center items-center bg-gray-300">
            저장 상태별 보기
          </div>
          <PackageSelect
            onChange={setSave}
            value={save}
            className="w-80 py-2"
            options={["전체", "저장", "임시저장"]}
          />
        </div>
      </div>

      <div className="h-20 w-full flex items-center border-y border-black mb-5">
        <div className="w-40 bg-gray-200 flex justify-center items-center border-r border-black h-full">
          출시 일시
        </div>
        <div className="w-full">
          <div className="border-b w-full flex items-center py-3">
            {["하루", "일주일", "1달이내"].map((el, index) => {
              return (
                <button
                  className={`border border-black px-5 ml-5 disabled:bg-gray-300 ${
                    period === el ? "bg-main-color text-white" : ""
                  }`}
                  key={index}
                  onClick={() => handlePeriodClick(el)}
                  disabled={endDate ? true : false}
                >
                  {el}
                </button>
              );
            })}
          </div>
          <div className="flex">
            <CustomDatePicker
              className="mx-5"
              setStartDate={setStartDate}
              startDate={startDate}
              setEndDate={setEndDate}
              endDate={endDate}
              endQuarterDate={endQuarterDate}
            />
          </div>
        </div>
      </div>

      <>
        <div className="flex w-full justify-center">
          <button
            className="border border-black px-16"
            onClick={handleResetClick}
          >
            필터 초기화
          </button>
        </div>
        <div className="w-full flex justify-between items-center mb-3">
          <div>
            <button
              className="border border-black px-5 mr-2 mt-2"
              onClick={handleProductBtn}
              name="선택삭제"
            >
              선택삭제
            </button>
            <PackageSelect
              onChange={setPrivacyState}
              value={privacyState}
              options={["공개", "비공개"]}
              className="mr-3 py-1"
              disabledOption="공개변경"
              setChangeActive={setChangeActive}
            />
          </div>
        </div>
        <table className="table-auto w-full border-collapse border border-black">
          <thead className="bg-[rgba(0,0,0,0.1)] h-[45px] 2sm:h-[50px]">
            <tr>
              <th className="p-2 ">
                <input
                  type="checkbox"
                  onChange={handleToggleAll}
                  checked={selectedItems.length === productsData.length}
                />
              </th>
              {productHeaders.map((el, index) => (
                <th key={index} className="p-2 border border-black">
                  <div className="flex justify-center items-center">
                    <div className="whitespace-nowrap">{el.text}</div>
                    {["arrivalTime", "departureTime"].includes(el.value) && (
                      <button
                        onClick={handleDateFilter}
                        data-product={el.value}
                      >
                        {arrowState[el.value] ? (
                          <img src="icon_down.svg" className="rotate-180" />
                        ) : (
                          <img src="icon_down.svg" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productsData.map((el) => (
              <tr
                className="h-[45px] text-center whitespace-nowrap"
                key={el.productId}
              >
                <td className="border-black border">
                  <input
                    type="checkbox"
                    onChange={() => handleToggleItem(el.productId)}
                    checked={selectedItems.includes(el.productId)}
                  />
                </td>
                <td className="border  border-black p-2">
                  <button
                    name="수정"
                    value={el.productId}
                    data-save={el.saveState}
                    onClick={handleProductBtn}
                  >
                    수정
                  </button>
                </td>
                <td className="border  border-black p-2">
                  <button
                    name="복사"
                    value={el.productId}
                    onClick={handleProductBtn}
                  >
                    복사
                  </button>
                </td>
                <td className="border  border-black p-2">{el.packageName}</td>
                <td className="border border-black p-2">{el.productCode}</td>
                <td className="border border-black p-2">{el.startDate}</td>
                <td className="border border-black p-2">{el.endDate}</td>
                <td className="border border-black p-2">{el.minCount}</td>
                <td className="border border-black p-2">{el.nowCount}</td>
                <td className="border border-black p-2">{el.maxCount}</td>
                <td className="border border-black p-2">{el.productState}</td>
                <td className="border border-black p-2">{el.saveState}</td>
                <td className="border border-black p-2">{el.privacy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end w-full">
          <button
            className="border border-black px-5 py-2 ml-2 mt-2"
            onClick={handleProductBtn}
            name="신규등록"
          >
            신규등록
          </button>
        </div>
        <div className="w-full flex justify-center mt-2">
          <CustomPagination
            totalPage={totalPage}
            handlePageClick={handlePageChange}
          />
        </div>
      </>
    </div>
  );
};

export default ProductManager;
