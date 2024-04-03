import useGetCountryImg from "../../queries/imgs/useGetCountryImg";

const CountryInfo = ({ country }: { country: string }) => {
  const { data } = useGetCountryImg(country);
  console.log(data);
  return (
    <div className="w-fit h-fit overflow-hidden bg-cover bg-center max-xsm:mx-[16px]">
      <img src={data} alt="countryInfo" className=""></img>
    </div>
  );
};

export default CountryInfo;
