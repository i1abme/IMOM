import { useNavigate } from "react-router-dom";
import IconHamburger from "/public/icon_mb_hamburger.svg";
// import IconCommunity from "/public/icon_mb_community.svg";
import IconProduct from "/public/icon_mb_product.svg";
import IconMyPage from "/public/icon_mb_mypage.svg";
import IconMain from "/public/icon_mb_main.svg";
import { useState } from "react";
import NavDropdown from "./Header/NavDropdown";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../atom/atom";

const MbNav = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const viewSizeState = useRecoilValue(viewSize);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  return (
    <>
      {showMenu && viewSizeState === "mobile" && (
        <NavDropdown handleMenuClose={handleMenuClose} />
      )}
      <div className="z-[999] fixed bottom-0 w-full h-[75px] hidden max-xsm:flex bg-main-color justify-between px-[32px] rounded-t-[20px]">
        <button
          id="menu"
          className="flex flex-col justify-center items-center shrink-0 gap-[6px]"
          onClick={handleMenu}
        >
          <img
            src={IconHamburger}
            alt="askicon"
            className="w-[32px] h-[30px]"
          />
          <span className="text-[9px] text-sub-black">전체메뉴</span>
        </button>
        <button
          id="community"
          className="flex flex-col justify-center items-center shrink-0 gap-[6px]"
          onClick={() => navigate("/travelproduct")}
        >
          <img src={IconProduct} alt="askicon" className="w-[32px] h-[30px]" />
          <span className="text-[9px] text-sub-black">여행상품</span>
        </button>
        <button
          className="bg-white rounded-[9999px] w-[64px] h-[64px] border border-[#707070] 
      relative bottom-[8px] flex justify-center items-center"
          onClick={() => navigate("/")}
        >
          <img src={IconMain} alt="askicon" className="w-[34px] h-[44px]" />
        </button>
        <button
          id="travelproduct"
          className="flex flex-col justify-center items-center shrink-0 gap-[6px]"
          onClick={() => navigate("/community")}
        >
          <img src={IconProduct} alt="askicon" className="w-[32px] h-[30px]" />
          <span className="text-[9px] text-sub-black">커뮤니티</span>
        </button>

        <button
          id="mypage"
          className="flex flex-col justify-center items-center shrink-0 gap-[6px]"
          onClick={() => navigate("/mypageorderinfo")}
        >
          <img src={IconMyPage} alt="askicon" className="w-[32px] h-[30px]" />
          <span className="text-[9px] text-sub-black">마이페이지</span>
        </button>
      </div>
    </>
  );
};

export default MbNav;
