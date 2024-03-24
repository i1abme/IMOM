import { ko } from "date-fns/locale";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const ProductDatePicker = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
}: DatePickerProps) => {
  const handleStartDateChange = (date: Date | null) => {
    if (date && endDate && date.getTime() > endDate.getTime()) {
      setEndDate(date);
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && startDate && date.getTime() < startDate.getTime()) {
      setStartDate(date);
    }
    setEndDate(date);
  };

  return (
    <div className="flex">
      <DatePicker
        className="border border-black w-52 outline-none"
        dateFormat="yyyy년 MM월 dd일 HH:mm"
        locale={ko}
        showTimeSelect
        selected={startDate}
        onChange={handleStartDateChange}
        timeIntervals={5}
        startDate={startDate}
        endDate={endDate}
        selectsStart
      />
      <span className="mx-2">~</span>
      <DatePicker
        className="border border-black w-52 outline-none"
        dateFormat="yyyy년 MM월 dd일 HH:mm"
        locale={ko}
        timeIntervals={5}
        showTimeSelect
        selected={endDate}
        onChange={handleEndDateChange}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        selectsEnd
      />
    </div>
  );
};

export default ProductDatePicker;
