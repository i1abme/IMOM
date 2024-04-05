import { addMonths } from "date-fns";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import useGetProductDates from "../../queries/products/useGetProductDates";
import { useNavigate } from "react-router-dom";
import { CalendarProductDates } from "../../types/product";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./ProductCalendar.css";

const ProductCalendar = ({ packageId }: { packageId: number }) => {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useGetProductDates(packageId);
  const [highlightDates, setHighlightDates] = useState<CalendarProductDates>(
    {}
  );

  const handleCalendar = (e: [Date | null, Date | null]) => {
    if (!e[0]) return;
    const matchedId = Object.keys(highlightDates).find((item) => {
      return (
        highlightDates[+item].toISOString().split("T")[0] ===
        e[0]?.toISOString().split("T")[0]
      );
    });
    navigate(`/traveldetail/${matchedId}`);
  };

  useEffect(() => {
    if (data) {
      setHighlightDates(() => {
        const highlights = data.reduce(
          (highlightedDates: CalendarProductDates, item) => {
            highlightedDates[item.productId] = new Date(
              new Date(item.startDate).setHours(0, 0, 0, 0)
            );
            return highlightedDates;
          },
          {}
        );
        return highlights;
      });
    }
  }, [data]);

  const filterDate = (date: Date) => {
    return Object.values(highlightDates).some(
      (highlightDate) =>
        date.getDate() === highlightDate.getDate() &&
        date.getMonth() === highlightDate.getMonth() &&
        date.getFullYear() === highlightDate.getFullYear()
    );
  };

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
  }
  return (
    <ReactDatePicker
      locale={ko}
      selected={null}
      onChange={(e) => handleCalendar(e)}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 2)}
      monthsShown={2}
      selectsRange
      inline
      showDisabledMonthNavigation
      highlightDates={Object.values(highlightDates)}
      filterDate={filterDate}
    />
  );
};
export default ProductCalendar;
