export const dateFormat = (date: string, split?: string) => {
  const dayOfWeekList = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = dayOfWeekList[new Date(date).getDay()];
  const dateArr = date.split("T");
  const ymd = dateArr[0].split("-");
  const hms = dateArr[1].split(":");

  return split === "split"
    ? [`${ymd[0]}.${ymd[1]}.${ymd[2]}`, `(${dayOfWeek}) ${hms[0]}:${hms[1]}`]
    : `${ymd[0]}.${ymd[1]}.${ymd[2]}(${dayOfWeek}) ${hms[0]}:${hms[1]}`;
};
