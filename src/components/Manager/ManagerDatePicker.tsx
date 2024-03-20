import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const ManagerDatePicker = ({
  className,
  date,
  handleDatePicker,
  id,
}: {
  className: string;
  date?: string | Date;
  handleDatePicker: (e: Date | null, id: string) => void;
  id: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  // minDate가 maxDate 이후 일 경우 maxDate를 minDate와 동일하게
  useEffect(() => {
    if (date && selectedDate && selectedDate < new Date(date)) {
      setSelectedDate(new Date(date));
    }
  }, [date, selectedDate]);

  const handleDate = (e: Date | null) => {
    if (e) {
      setSelectedDate(e);
      handleDatePicker(e, id);
    }
  };

  return (
    <div>
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect
        minDate={date ? new Date(date) : null}
        maxDate={new Date()}
        selected={selectedDate}
        onChange={(e) => handleDate(e)}
        className={`outline-none border text-center border-black ${className}`}
        value={selectedDate ? format(selectedDate, "yyyy.MM.dd") : "0000.00.00"}
      />
    </div>
  );
};

export default ManagerDatePicker;
