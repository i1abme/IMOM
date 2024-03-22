import { Link } from "react-router-dom";
import { MENU_LIST } from "../../../constants/menudata";
import NavDropdown from "./NavDropdown";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useRef, useState } from "react";
import IconHamburger from "/public/icon_hamburger.svg";
import IconCancel from "/public/icon_cancel.svg";

const NavMenu = () => {
  const dropdownRef = useRef(null);

  const closeDropdown = () => {
    handleMenuClose();
  };

  useOutsideClick(dropdownRef, closeDropdown);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFullMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    if (isMenuOpen) setIsMenuOpen((prev) => !prev);
  };

  return (
    <ul
      className="flex border-y-[1px] border-main-color h-[37px]
    items-center justify-center gap-[33px] text-[14px] w-full text-sub-black"
    >
      <li ref={dropdownRef}>
        <button
          className="flex gap-[15px] items-center"
          onClick={handleFullMenu}
        >
          {!isMenuOpen ? (
            <img src={IconHamburger} alt="menu" className="w-[16px] h-[16px]" />
          ) : (
            <img src={IconCancel} alt="close" className="w-[16px] h-[16px]" />
          )}
          <span>전체메뉴</span>
        </button>
        {isMenuOpen && <NavDropdown handleMenuClose={handleMenuClose} />}
      </li>
      {MENU_LIST.map((menu) => (
        <li key={menu.name}>
          {menu.path ? (
            <Link to={menu.path} state={menu.name}>
              {menu.name}
            </Link>
          ) : (
            menu.name
          )}
        </li>
      ))}
    </ul>
  );
};
export default NavMenu;
