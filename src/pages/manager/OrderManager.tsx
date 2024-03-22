import ManagerTitle from "../../components/Manager/ManagerTitle";
import { ORDER_EMPTYDATA, ORDER_STATES } from "../../constants/managerdata";
import CustomPagination from "../../components/common/CustomPagination";
import { dateFormat } from "../../utils/dateFormat";
import ManagerDateBtns from "../../components/Manager/ManagerDateBtns";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import usePostMangerOrders from "../../queries/orders/usePostOrderList";
import { ManagerColumns, OrderList, OrderRequest } from "../../types/manager";
import { fillData } from "../../utils/fillData";
import ManagerTable from "../../components/Manager/ManagerTable";
import useGetCountries from "../../queries/countries/useGetCountries";
import FilterDropdown from "../../components/common/FilterDropdown";
import PackageDropdown from "../../components/Manager/order/PackageDropdown";
import useGetOrderList from "../../queries/orders/useGetOrderList";
import ExcelDownload from "../../components/Manager/ExcelDownload";
import { ORDER_EXCEL_HEADER } from "../../constants/managerdata";

const OrderManager = () => {
  const navigate = useNavigate();
  const { data: excelData } = useGetOrderList();
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const [orderReq, setOrderReq] = useState<OrderRequest>({
    orderDateMin: null,
    orderDateMax: null,
    packageId: null, // 패키지명 드롭다운
    country: null,
    orderState: null,
    userNameOrder: null, //
    order: null, // 주문일시 오름차순 : 0 , 내림차순 : 1
    start: null, // 출발일 오름차순 : 0 , 내림차순 : 1
    type: "", // 검색어 타입
    target: "", // 검색어
    offset: 0,
  });
  const [sortState, setSortState] = useState<{ [key: string]: number | null }>({
    startDate: null,
    orderDate: null,
    reserveUser: null,
  });

  const [totalPages, setTotalPages] = useState<number>(0);

  const [countries, setCountries] = useState<string[]>(["전체"]);
  const [selectedPackage, setSelectedPackage] = useState("전체");

  const [search, setSearch] = useState<{
    [key: string]: string | number | boolean | null;
  }>({ type: "예약자명", target: "", state: false });

  const { mutate, data, isPending, isError, error } =
    usePostMangerOrders(orderReq);

  const {
    data: countryData,
    isPending: countryIsPending,
    isError: countryIsError,
    error: countryError,
  } = useGetCountries();

  useEffect(() => {
    if (
      (orderReq.orderDateMin && orderReq.orderDateMax) ||
      (!orderReq.orderDateMin && !orderReq.orderDateMax)
    ) {
      console.log(orderReq);
      mutate();
    }
  }, [orderReq, mutate]);

  useEffect(() => {
    if (data) {
      setOrderList(() => fillData(data.content, 10, ORDER_EMPTYDATA));
      setTotalPages(data.totalPages);
      console.log(data);
    }
    return;
  }, [data]);

  useEffect(() => {
    if (search.state === true) {
      setOrderReq((prev) => ({
        ...prev,
        type: search.type as string,
        target: search.target as string,
      }));
      setSearch((prev) => ({
        ...prev,
        state: false,
      }));
    }
  }, [search]);

  useEffect(() => {
    if (countryData) {
      setCountries(() => ["전체", ...countryData]);
    }
  }, [countryData]);

  // table header의 주문일시, 출발일 정렬
  const handleSortOrder = (category: string) => {
    const sortCategories = ["startDate", "orderDate", "userNameOrder"];
    const otherCategories = sortCategories.filter((el) => el !== category);
    setSortState((prev) => ({
      // 정렬 하려는 카테고리 이외에는 null값으로 전환
      [category]: !prev[category as keyof OrderRequest] ? 1 : null,
      [otherCategories[0]]: null,
      [otherCategories[1]]: null,
    }));
    const reqCategory =
      category !== "reserveUser"
        ? category.replace("Date", "") // "start" || "order"
        : "userNameOrder";
    const otherCategoriesReqName = otherCategories.map((el) => {
      if (el === "userNameOrder") {
        return "reserveUser";
      }
      return el.replace("Date", "");
    });
    console.log(otherCategoriesReqName);
    setOrderReq((prev) => ({
      ...prev,
      [reqCategory]: prev[reqCategory as keyof OrderRequest] === 0 ? 1 : 0,
      [otherCategoriesReqName[0]]: null,
      [otherCategoriesReqName[1]]: null,
    }));
  };

  const handlePageClick = (selected: number) => {
    setOrderReq((prev) => ({
      ...prev,
      offset: selected,
    }));
  };

  const handleTableRow = (orderId: string) => {
    if (orderId !== "null") {
      navigate(`/orderdetail/${orderId}`);
    }
    return;
  };

  const handleDateBtns = (dates: { [key: string]: string | null }) => {
    setOrderReq((prev) => ({
      ...prev,
      orderDateMin: dates.dateMin ? dates.dateMin : null,
      orderDateMax: dates.dateMax ? dates.dateMax : null,
    }));
  };

  const handleDropdown = (
    value: string | number,
    id: string,
    packageName?: string
  ) => {
    if (packageName) setSelectedPackage(packageName);
    console.log(packageName);
    setOrderReq((prev) => ({
      ...prev,
      [id]: value === "전체" ? null : value,
    }));
  };

  const handleSearch = (value: string, id: string) => {
    const searchKey = id === "searchType" ? "type" : "target";
    setSearch((prev) => ({ ...prev, [searchKey]: value }));
  };

  const handleSearchBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearch((prev) => ({ ...prev, state: true }));
  };

  const handleResetBtn = () => {
    setSearch({ type: "예약자명", target: "", state: false });
    setSortState({
      startDate: null,
      orderDate: null,
      reserveUser: null,
    });
    setOrderReq({
      orderDateMin: null,
      orderDateMax: null,
      packageId: null, // 패키지명 드롭다운
      country: null,
      orderState: null,
      userNameOrder: null, //
      order: null, // 주문일시 오름차순 : 0 , 내림차순 : 1
      start: null, // 출발일 오름차순 : 0 , 내림차순 : 1
      type: "", // 검색어 타입
      target: "", // 검색어
      offset: 0,
    });
    setSelectedPackage("전체");
  };

  const columns: ManagerColumns<OrderList> = [
    {
      key: "imomOrderId",
      label: "주문번호",
      sortable: false,
    },
    {
      key: "reserveUser",
      label: "예약자명",
      sortable: true,
      onClick: () => handleSortOrder("reserveUser"),
    },
    {
      key: "productCode",
      label: "상품코드",
      sortable: false,
    },
    {
      key: "orderDate",
      label: "주문일시",
      sortable: true,
      render: (value) => (value ? dateFormat(`${value}`) : ""),
      onClick: () => handleSortOrder("orderDate"),
    },
    {
      key: "packageName",
      label: "패키지명",
      sortable: false,
    },
    {
      key: "country",
      label: "지역",
      sortable: false,
    },
    {
      key: "startDate",
      label: "출발일",
      sortable: true,
      render: (value) => (value ? dateFormat(`${value}`) : ""),
      onClick: () => handleSortOrder("startDate"),
    },
    {
      key: "email",
      label: "이메일(ID)",
      sortable: false,
    },
    {
      key: "phoneNumber",
      label: "핸드폰",
      sortable: false,
    },
    {
      key: "totalCount",
      label: "총인원",
      sortable: false,
    },
    {
      key: "orderState",
      label: "결제상태",
      sortable: false,
    },
  ];
  console.log(excelData);

  return (
    <div className="w-full flex flex-col gap-[27px] mr-20 items-center min-w-fit">
      <div className="flex self-start w-fit gap-[30px] ">
        <ManagerTitle title="주문목록" />
        {excelData && excelData.length > 0 && (
          <ExcelDownload
            data={excelData}
            headers={ORDER_EXCEL_HEADER}
            title="전체목록 다운로드"
            fileName="아이맘_주문목록.csv"
          />
        )}
      </div>
      <section className="w-full">
        <ManagerDateBtns title="주문 일시" handleDateBtns={handleDateBtns} />
        <div className="h-20 w-full flex items-center border-b border-black">
          <div className="w-40 bg-gray-200 flex justify-center items-center border-r border-black h-full flex-shrink-0">
            주문 필터
          </div>
          <div className="flex flex-row gap-5 px-5 h-[24px] items-center flex-shrink-0">
            <FilterDropdown
              label="결제 상태 :"
              list={ORDER_STATES}
              id={"orderState"}
              handleClick={handleDropdown}
              divStyle="flex p-[3px] gap-3"
              selectStyle="border border-sub-black"
              selected={orderReq.orderState}
            />
            {countryIsPending ? (
              <div>로딩중</div>
            ) : countryIsError ? (
              <div>{countryError?.message}</div>
            ) : (
              <FilterDropdown
                label="지역 :"
                list={countries}
                id={"country"}
                handleClick={handleDropdown}
                divStyle="flex p-[3px] gap-3"
                selectStyle="border border-sub-black"
                selected={orderReq.country}
              />
            )}
            <PackageDropdown
              handleClick={handleDropdown}
              divStyle="flex p-[3px] gap-3"
              selectStyle="border border-sub-black"
              label="패키지 검색 :"
              selected={selectedPackage}
            />
            <FilterDropdown
              label="주문 검색 :"
              list={["예약자명", "핸드폰", "이메일", "주문번호", "상품코드"]}
              id={"searchType"}
              handleClick={handleSearch}
              divStyle="flex p-[3px] gap-3 "
              selectStyle="border border-sub-black h-[24px]"
              selected={search.type as typeof orderReq.target}
            />
            <input
              type="text"
              className="border border-sub-black h-[24px] text-center"
              placeholder="검색어를 입력하세요"
              id={"searchTarget"}
              value={search.target ? (search.target as string) : ""}
              onChange={(e) => handleSearch(e.target.value, e.target.id)}
            />
            <button
              className="ml-1 border-sub-black border px-2 h-full bg-gray-200 active:bg-gray-400"
              onClick={(e) => handleSearchBtn(e)}
            >
              검색
            </button>
            <button
              className="ml-1 border-sub-black border px-2 h-full bg-gray-200 active:bg-gray-400"
              onClick={handleResetBtn}
            >
              필터초기화
            </button>
          </div>
        </div>
      </section>
      {isPending ? (
        <div>로딩중</div>
      ) : isError ? (
        <div>{error?.message}</div>
      ) : (
        <section className="w-full items-center gap-5 flex flex-col">
          <ManagerTable
            data={orderList}
            columns={columns}
            navigateId={"imomOrderId"}
            handleTableRow={handleTableRow}
            sortState={sortState}
          />
          <CustomPagination
            totalPage={totalPages}
            handlePageClick={handlePageClick}
          />
        </section>
      )}
    </div>
  );
};

export default OrderManager;
