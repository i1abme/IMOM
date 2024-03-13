import useGetCountries from "../../queries/countries/useGetCountries";
import "./TravelPlaceBtns.css";

const TravelPlaceBtns = ({
  handleCountry,
  countryClick,
}: {
  handleCountry: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    country: string
  ) => void;
  countryClick: string;
}) => {
  const { data, isPending, isError, error } = useGetCountries();
  const fillEmptySpace = (data: string[]) => {
    // grid 빈자리 채우기용 요소 추가
    if (data && Array.isArray(data)) {
      while (data.length % 5 !== 0) {
        data.push("");
      }
    }
    return data;
  };

  if (isPending) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    return <div>에러 발생: {error?.message}</div>;
  }
  if (!data) {
    return <div>데이터가 없습니다.</div>;
  }
  return (
    <div
      className=" w-full overflow-hidden grid grid-cols-5
    box-border border-[1px] border-main-color rounded-[25px] my-[33px]"
    >
      {fillEmptySpace(data).map((item, idx) => (
        <button
          key={item || idx}
          type="button"
          className={`placeBtn p-[10px] text-sub-black cursor-pointer 
          transition-colors duration-300 border-r-[1px] border-main-color 
          border-b-[1px] box-border
          ${
            item
              ? countryClick === item
                ? "bg-main-color text-white"
                : "bg-white hover:text-main-color"
              : "bg-transparent text-gray-500 pointer-events-none"
          }`}
          disabled={!item}
          onClick={(e) => handleCountry(e, item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
export default TravelPlaceBtns;
