import { useEffect, useState } from "react";
import ManagerDatePicker from "./ManagerDatePicker";
import { format } from "date-fns";

const ManagerDateBtns = ({
  title,
  handleDateBtns,
}: {
  title: string;
  handleDateBtns: (dates: { [key: string]: string | null }) => void;
}) => {
  const [active, setActive] = useState("전체");
  const [selectedDates, setSelectedDates] = useState<{
    [key: string]: string | null;
  }>({
    dateMin: null,
    dateMax: null,
  });

  useEffect(() => {
    if (
      (selectedDates.dateMin && selectedDates.dateMax) ||
      (!selectedDates.dateMin && !selectedDates.dateMax)
    ) {
      handleDateBtns(selectedDates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  const handleDate = (date: string) => {
    const days = { 하루: 1, 일주일: 7, "1달이내": 30 };
    setActive(date);
    if (date !== "customDate") {
      if (date !== "전체") {
        setSelectedDates(() => ({
          dateMin:
            new Date(
              new Date().setDate(
                new Date().getDate() - days[date as keyof typeof days]
              )
            )
              .toISOString()
              .split("T")[0] + "T00:00:00",
          dateMax: new Date().toISOString().split("T")[0] + "T00:00:00",
        }));
      }
      if (date === "전체") {
        setSelectedDates(() => ({
          dateMin: null,
          dateMax: null,
        }));
      }
    }
  };

  const handleDatePicker = (e: Date | null, id: string) => {
    if (e) {
      setSelectedDates((prev) => {
        const newSelect = {
          ...prev,
          [id]: format(e, "yyyy-MM-dd'T'00:00:00"),
        };
        if (
          newSelect.dateMin &&
          newSelect.dateMax &&
          newSelect.dateMin > newSelect.dateMax
        ) {
          newSelect.dateMax = newSelect.dateMin;
        }
        return newSelect;
      });
    }
  };

  return (
    <div className="h-20 w-full flex items-center border-y border-black ">
      <div className="w-40 bg-gray-200 flex justify-center items-center border-r border-black h-full flex-shrink-0">
        {title}
      </div>
      <div className="flex item items-center gap-5 flex-shrink-0">
        <div className="flex items-center">
          {["전체", "하루", "일주일", "1달이내"].map((el) => {
            return (
              <button
                className={` px-5 ml-5 ${
                  active === el
                    ? "bg-main-color text-white"
                    : "border border-sub-black"
                }`}
                key={el}
                onClick={() => handleDate(el)}
              >
                {el}
              </button>
            );
          })}
        </div>
        <div
          className={`flex text-sub-black ${
            active === "customDate"
              ? "border-main-color border-[3px]"
              : "border border-sub-black"
          }  `}
          onClick={() => handleDate("customDate")}
        >
          <ManagerDatePicker
            className={`border-none`}
            handleDatePicker={handleDatePicker}
            id="dateMin"
          />
          <span>~</span>
          <ManagerDatePicker
            className={`border-none`}
            handleDatePicker={handleDatePicker}
            id="dateMax"
            date={selectedDates.dateMin ? selectedDates.dateMin : new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerDateBtns;
