import ReactPaginate from "react-paginate";

const CustomPagination = ({
  totalPage = 0,
  handlePageClick,
}: {
  totalPage: number;
  handlePageClick: (selected: number) => void;
}) => {
  return (
    <ReactPaginate
      className="flex gap-[5px] text-[12px] items-center"
      nextLabel=">"
      onPageChange={(e) => handlePageClick(e.selected)}
      pageRangeDisplayed={5}
      pageCount={totalPage}
      previousLabel="<"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active text-main-color"
      renderOnZeroPageCount={null}
    />
  );
};
export default CustomPagination;
