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

const ProductInfoList = ({ packageId }: { packageId: number }) => {
  const [request, setRequest] = useState<ProductListRequest>({
    packageId: packageId | 0,
    offset: 0,
    limit: 5,
  });
  const { mutate, data, isPending, isError, error } = usePostProducts(request);
  const [tableData, setTableData] = useState<ProductListInfo[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

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
    if (data) {
      console.log(data);
      setTableData(() => {
        const newTableData = data.content.map((item: ProductList) => ({
          ...item,
          startDate: dateFormat(item.startDate),
          endDate: dateFormat(item.endDate),
          id: item.productId,
          detail: (
            <button type="button">
              <Link to={`/traveldetail/${item.productId}`}>자세히</Link>
            </button>
          ),
        }));
        return newTableData;
      });
      setTotalPages(data.totalPages);
    }
  }, [data]);

  if (isPending) {
    <div></div>;
  }
  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
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
        thStyle={"text-[12px]"}
        tbodyStyle={"text-[10px]"}
        tbodyTrStyle={"border-t-[0.5px] border-dashed border-main-color"}
        tdStyle={"py-[14px]"}
      />
      <CustomPagination
        totalPage={totalPages}
        handlePageClick={handlePageClick}
      />
    </>
  );
};
export default ProductInfoList;
