import { useEffect, useState } from "react";
import ManagerTitle from "../components/Manager/ManagerTitle";
import { baseInstance } from "../api/instance";
import CustomPagination from "../components/common/CustomPagination";
import { useNavigate } from "react-router-dom";

type EditType = {
  token: string | null;
  refreshToken: string | null;
};
type OrderInfoType = {
  imomOrderId: string;
  orderDate: string;
  orderState: string;
  packageName: string;
  productState: string;
  startDate: string;
  totalCount: number;
};
const MyPageOrderInfo = ({ refreshToken, token }: EditType) => {
  const navigation = useNavigate();
  const [offset, setOffset] = useState(0);
  const [orderSort, setOrderSort] = useState<{
    bool: boolean;
    sort: number | null;
  }>({ bool: false, sort: 0 });
  const [startSort, setStartSort] = useState<{
    bool: boolean;
    sort: number | null;
  }>({ bool: false, sort: 0 });
  const [orderInfoData, setOrderInfoData] = useState<OrderInfoType[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    baseInstance
      .get(
        `/orders?offset=${offset}${
          orderSort.bool ? `&order=${orderSort.sort}` : ""
        }${startSort.bool ? `&start=${startSort.sort}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Refresh: `Bearer ${refreshToken}`,
          },
        }
      )
      .then((res) => {
        setOrderInfoData(res.data.data.content);
        setTotalPage(res.data.data.totalPages);
      });
  }, [offset, orderSort, startSort]);

  const handlePageChange = (selected: number) => {
    setOffset(selected);
  };

  const orderHeaders = [
    {
      key: 1,
      text: "주문번호",
      value: "order",
    },
    {
      key: 2,
      text: "주문일자",
      value: "orderDate",
    },
    {
      key: 3,
      text: "패키지이름",
      value: "packageName",
    },
    {
      key: 4,

      text: "출발일시",
      value: "startDate",
    },
    {
      key: 5,

      text: "예약인원",
      value: "personal",
    },
    {
      key: 6,

      text: "상품상태",
      value: "productState",
    },
    {
      key: 7,

      text: "결제상태",
      value: "payment",
    },
  ];

  const handleFilter = (text: string) => {
    if (text === "주문일자" && !orderSort.bool) {
      setOrderSort((prev) => ({
        ...prev,
        bool: true,
        sort: prev.sort === null ? 0 : prev.sort === 0 ? 1 : 0,
      }));
      setStartSort((prev) => ({
        ...prev,
        bool: false,
      }));
    } else if (text === "출발일시" && !startSort.bool) {
      setStartSort((prev) => ({
        ...prev,
        bool: true,
        sort: prev.sort === null ? 0 : prev.sort === 0 ? 1 : 0,
      }));
      setOrderSort((prev) => ({
        ...prev,
        bool: false,
      }));
    } else {
      if (text === "주문일자") {
        setOrderSort((prev) => ({
          ...prev,
          sort: prev.sort === null ? 0 : prev.sort === 0 ? 1 : 0,
        }));
      } else if (text === "출발일시") {
        setStartSort((prev) => ({
          ...prev,
          sort: prev.sort === null ? 0 : prev.sort === 0 ? 1 : 0,
        }));
      }
    }
  };

  return (
    <div className="w-full">
      <ManagerTitle title="마이 우리엘" />
      <table className="table-auto w-full border-collapse border border-main-color mb-3">
        <thead className="bg-main-color text-white h-[45px] 2sm:h-[50px]">
          <tr>
            {orderHeaders.map((el, index) => (
              <th
                key={index}
                className="p-2 border border-white"
                onClick={() => handleFilter(el.text)}
              >
                <div className="flex justify-center">
                  {el.text}
                  {el.text === "주문일자" && orderSort && (
                    <div className="cursor-pointer">
                      {orderSort.sort === 0 ? "↑" : "↓"}
                    </div>
                  )}
                  {el.text === "출발일시" && startSort && (
                    <div className="cursor-pointer">
                      {startSort.sort === 0 ? "↑" : "↓"}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderInfoData.map((el, idx) => (
            <tr className=" h-[45px] 2sm:h-[50px] text-center" key={idx}>
              <td className="border border-main-color p-2">{el.imomOrderId}</td>
              <td className="border border-main-color p-2">{el.orderDate}</td>
              <td className="border border-main-color p-2">
                <button
                  onClick={() => navigation(`/orderconfirm/${el.imomOrderId}`)}
                >
                  {el.packageName}
                </button>
              </td>
              <td className="border border-main-color p-2">{el.startDate}</td>
              <td className="border border-main-color p-2">{el.totalCount}</td>
              <td className="border border-main-color p-2">
                {el.productState}
              </td>
              <td className="border border-main-color p-2">{el.orderState}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center">
        <CustomPagination
          handlePageClick={handlePageChange}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default MyPageOrderInfo;
