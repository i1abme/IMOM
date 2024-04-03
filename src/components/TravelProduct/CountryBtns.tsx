import { useNavigate } from "react-router-dom";
import useGetCountries from "../../queries/countries/useGetCountries";
import "./CountryBtns.css";

const CountryBtns = ({ countryClick }: { countryClick: string }) => {
  const navigate = useNavigate();
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

  const handleCountryClick = (country: string) => {
    navigate(`/travelproduct/${country}`);
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
      className="w-full overflow-hidden grid grid-cols-5
    box-border border-[1px] border-main-color rounded-[15px] mt-[33px] 
    max-xsm:max-w-[345px] max-xsm:shadow"
    >
      {fillEmptySpace(data).map((item, idx) => (
        <button
          key={item || idx}
          type="button"
          className={`placeBtn p-[10px] text-sub-black cursor-pointer 
          transition-colors duration-300 border-r-[1px] border-main-color 
          border-b-[1px] box-border max-xsm:text-[10px] max-xsm:tracking-[-0.5px]
          ${
            item
              ? countryClick === item
                ? "bg-main-color text-white"
                : "bg-white hover:text-main-color"
              : "bg-transparent text-gray-500 pointer-events-none"
          }`}
          disabled={!item}
          onClick={() => handleCountryClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
export default CountryBtns;
