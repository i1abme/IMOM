import React from "react";

interface Day {
  day: number;
  scheduleId?: number;
  dayContent?:
    | string
    | {
        dayContentMd?: string;
        dayContentHtml?: string;
      }
    | string;
  hotel: string;
  meal: string;
  vehicle: string;
}

interface RegistProps {
  title: string;
  index: number;
  name: string;
  day: number;
  days?: Day[];
  handleDayInputChange: (value: string, name: string, index: number) => void;
}

const RegistSubInput = ({
  title,
  handleDayInputChange,
  index,
  name,
  days,
  day,
}: RegistProps) => {
  return (
    <div className="flex mt-5">
      <div className="bg-title-box w-20 px-3 whitespace-nowrap">{title}</div>
      <input
        className="border outline-none w-full"
        name={name}
        value={
          days &&
          (name === "hotel"
            ? days[day].hotel
            : name === "meal"
            ? days[day].meal
            : days[day].vehicle)
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleDayInputChange(e.currentTarget.value, e.target.name, index);
        }}
        required
      />
    </div>
  );
};

export default RegistSubInput;
