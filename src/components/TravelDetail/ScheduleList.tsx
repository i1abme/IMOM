import { useRecoilValue } from "recoil";
import {
  Schedule,
  ScheduleItemProps,
  ScheduleListProps,
} from "../../types/product";
import UiViewer from "../common/Editor/UiViewer";
import { viewSize } from "../../atom/atom";
import { useState } from "react";
import SortIcon from "../../../public/icon_down.svg";

const ScheduleItem = ({ title, content, viewSize }: ScheduleItemProps) => {
  return (
    <div
      className={`flex gap-[28px] text-[14px] items-baseline max-xsm:border-[0.5px] 
    max-xsm:border-main-color max-xsm:flex-col max-xsm:gap-[10px] max-xsm:py-[8px] 
    max-xsm:px-[16px] max-xsm:font-bold max-xsm:rounded-[22px] max-xsm:self-center max-xsm:w-full`}
    >
      {title &&
        (viewSize === "mobile" ? (
          <></>
        ) : (
          <span className="text-main-color w-[60px] flex-shrink-0">
            {title}
          </span>
        ))}
      <UiViewer content={content} />
    </div>
  );
};

const ScheduleList = ({ scheduleListData }: ScheduleListProps) => {
  const viewSizeState = useRecoilValue(viewSize);
  const [showSchedule, setShowSchedule] = useState<number[]>([]);

  const handleSchedule = (day: number) => {
    setShowSchedule((prev) => {
      const isDayIncluded = prev.includes(day);
      return isDayIncluded ? prev.filter((d) => d !== day) : [...prev, day];
    });
  };

  return (
    <>
      {scheduleListData?.map((list: Schedule) => (
        <div
          key={`${list.day}일차`}
          className="border-main-color rounded-[40px] border-[1px] w-[765px] min-h-[200px] py-[25px] px-[45px] 
          max-xsm:w-full max-xsm:max-w-[343px] max-xsm:rounded-[22px] max-xsm:p-0 max-xsm:border-none max-xsm:gap-[10px]
          max-xsm:flex max-xsm:flex-col max-xsm:min-h-fit"
        >
          {viewSizeState === "mobile" && (
            <div
              onClick={() => handleSchedule(list.day)}
              className="h-[28px] w-full bg-main-color bg-opacity-[0.1] text-[10px] font-bold flex justify-between px-[16px]
              items-center text-main-color rounded-[14px]"
            >
              <span>{`${list.day}일차`}</span>
              <img
                src={SortIcon}
                className={`${
                  showSchedule.includes(list.day)
                    ? "rotate-180 transition-transform duration-300 ease-in-out"
                    : "rotate-0 transition-transform duration-300 ease-in-out"
                }`}
              />
            </div>
          )}
          {(viewSizeState === "web" || showSchedule.includes(list.day)) && (
            <div className="flex flex-col gap-[15px] w-full">
              <ScheduleItem
                title={`${list.day}일차`}
                content={list.dayContent}
                viewSize={viewSizeState}
              />
              <ScheduleItem title="숙소" content={list.hotel} />
              <ScheduleItem title="식사" content={list.meal} />
              <ScheduleItem title="이동방법" content={list.vehicle} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};
export default ScheduleList;
