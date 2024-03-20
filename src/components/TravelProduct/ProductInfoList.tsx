import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import usePostProducts from "../../queries/products/usePostProducts";
import {
  ProductList,
  ProductListInfo,
  ProductListRequest,
} from "../../types/product";
import { dateFormat } from "../../utils/dateFormat";
import "./ProductLists.css";
import ProductCalendar from "./ProductCalendar";
import CustomPagination from "../common/CustomPagination";
import { fillData } from "../../utils/fillData";
import { EMPTY_TABLE_DATA } from "../../constants/packagedata";
import { amountFormat } from "../../utils/amountFormat";

const ProductInfoList = ({ packageId }: { packageId: number }) => {
  const [request, setRequest] = useState<ProductListRequest>({
    packageId: packageId | 0,
    offset: 0,
    limit: 5,
  });
  const { mutate, data, isError, error } = usePostProducts(request);
  const [tableData, setTableData] = useState<ProductListInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasSchedule, setHasSchedule] = useState(false);

  const columnHelper = createColumnHelper<ProductListInfo>();
  const columns = [
    columnHelper.accessor("productId", { header: "상품번호" }),
    columnHelper.accessor("startDate", { header: "출발일시" }),
    columnHelper.accessor("endDate", { header: "도착일시" }),
    columnHelper.accessor("airline", { header: "항공" }),
    columnHelper.accessor("price", { header: "가격" }),
    columnHelper.accessor("productState", { header: "상태" }),
    columnHelper.accessor("detail", {
      header: "상세확인하기",
      cell: ({ row }) => row.original.detail,
    }),
  ];

  const handlePageClick = (selected: number) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      offset: selected,
    }));
  };

  useEffect(() => {
    mutate();
  }, [request, mutate]);

  useEffect(() => {
    if (data && data.content.length > 0) {
      setHasSchedule(true);
      setTableData(() => {
        const newTableData = data.content.map((item: ProductList) => ({
          ...item,
          price: `${amountFormat(+item.price)}원`,
          startDate: dateFormat(item.startDate),
          endDate: dateFormat(item.endDate),
          id: item.productId,
          detail: (
            <button
              type="button"
              className="bg-main-color py-[2px] px-[20px] rounded-[12px] text-white"
            >
              <Link to={`/traveldetail/${item.productId}`}>확인하기</Link>
            </button>
          ),
        }));
        return fillData(newTableData, 5, EMPTY_TABLE_DATA);
      });
      setTotalPages(data.totalPages);
    } else if (data && data.content.length === 0) {
      setHasSchedule(false);
    }
  }, [data]);

  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
  }
  if (!hasSchedule) {
    return <div>추후 일정 업데이트 예정입니다.</div>;
  }
  return (
    <>
      <ProductCalendar packageId={packageId} />
      <Table
        data={tableData}
        columns={columns}
        tableStyle={
          "text-center w-[750px] border-main-color border-t-[0.5px] border-b-[0.5px]"
        }
        theadStyle={
          "bg-main-color bg-opacity-10 h-[24px] mt-[1px] border-t-[0.5px] border-b-[0.5px] border-main-color"
        }
        thStyle={"text-[12px] font-medium"}
        tbodyStyle={"text-[10px]"}
        tbodyTrStyle={"border-t-[0.5px] border-dashed border-main-color"}
        tdStyle={"h-[36px] font-light"}
      />
      <CustomPagination
        totalPage={totalPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
export default ProductInfoList;
