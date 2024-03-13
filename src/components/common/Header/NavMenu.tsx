import { Link } from "react-router-dom";
import { MENU_LIST } from "../../../constants/menudata";
import NavDropdown from "./NavDropdown";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useRef, useState } from "react";

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
        <button className="flex gap-[15px]" onClick={handleFullMenu}>
          {!isMenuOpen ? <span>≣</span> : <span>x</span>}
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
