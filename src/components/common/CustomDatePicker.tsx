import { ko } from "date-fns/locale";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  className?: string;
  startDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endQuarterDate?: Date | null;
}

const CustomDatePicker = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  endQuarterDate,
}: DatePickerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="flex items-center ml-5">
      <DatePicker
        className="border border-black w-96 outline-none"
        dateFormat="yyyy년 MM월 dd일"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        locale={ko}
        selectsRange
        disabled={endQuarterDate ? true : false}
      />
    </div>
  );
};

export default CustomDatePicker;
