import { Link } from "react-router-dom";

import "./NavDropdown.css";
import useGetCountries from "../../../queries/countries/useGetCountries";

type NavDropdownProps = {
  handleMenuClose: () => void;
};
const NavDropdown = ({ handleMenuClose }: NavDropdownProps) => {
  const { data } = useGetCountries();

  const travelProductList = data?.reduce<{ [key: string]: string }>(
    (acc, countryName) => {
      acc[countryName] = `/travelproduct/${countryName}`;
      return acc;
    },
    {}
  );

  const FULL_MENU_LIST = [
    {
      title: "아이맘투어소개",
      list: {
        아이맘투어소개: "/intro",
      },
    },
    {
      title: "여행상품보기",
      list: travelProductList,
    },
    {
      title: "커뮤니티",
      list: {
        여행이야기: "/community",
        자주묻는질문: "/community",
        공지사항: "/community",
      },
    },
  ];

  return (
    <div className="absolute w-fit overflow-hidden bg-white z-10 top-full px-[35px] py-[24px] flex flex-row gap-[20px] shadow">
      {FULL_MENU_LIST.map((menu) => (
        <div key={menu.title} className="w-fit">
          <h2 className="text-main-color text-[14px] border-b-[1px] border-main-color mb-[10px]">
            {menu.title}
          </h2>
          {menu.list && (
            <ul className="text-sub-black text-[10px] flex gap-y-[6px] first-letter:font-thin flex-col h-[140px] flex-wrap w-fit">
              {Object.entries(menu.list).map(([key, value]) => (
                <li key={key} onClick={handleMenuClose} className="mr-[30px]">
                  <Link to={value} state={key}>
                    {key}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
export default NavDropdown;
