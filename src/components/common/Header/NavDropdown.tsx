import { Link } from "react-router-dom";

import "./NavDropdown.css";

type NavDropdownProps = {
  handleMenuClose: () => void;
};
const NavDropdown = ({ handleMenuClose }: NavDropdownProps) => {
  const FULL_MENU_LIST = [
    {
      title: "아이맘투어소개",
      list: {
        아이맘투어소개: "/intro",
      },
    },
    {
      title: "여행상품보기",
      list: {
        동유럽: "/travelproduct",
        프랑스위스: "/travelproduct",
        스페인: "/travelproduct",
        이탈리아: "/travelproduct",
        호주: "/travelproduct",
        뉴질랜드: "/travelproduct",
        대만: "/travelproduct",
        일본: "/travelproduct",
      },
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
