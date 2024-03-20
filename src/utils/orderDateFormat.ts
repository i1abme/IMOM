export const orderDateFormat = (date: string) => {
  const dateAndTime = date.split(" ");
  const ymd = dateAndTime[0].split("-");
  const hms = dateAndTime[1].split(":");
  return `${ymd[0]}년 ${ymd[1]}월 ${ymd[2]}일 ${hms[0]}시 ${hms[1]}분`;
};
