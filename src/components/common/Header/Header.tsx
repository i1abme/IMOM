import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import AskBtn from "../AskBtn";

const Header = () => {
  return (
    <>
      <nav className="absolute flex-col w-full min-w-[823px] bg-white items-center max-xsm:hidden">
        <div className="justify-center flex top-0 h-[179px] items-end pb-[10px] w-full">
          <div className="flex gap-[30px] flex-grow-[0.3] items-center">
            <Link to={"/"}>
              <img src="/subLogo.svg" className="w-[224px] h-[70px]" />
            </Link>
          </div>
          <UserMenu />
        </div>
        <NavMenu />
      </nav>
      <AskBtn />
    </>
  );
};
export default Header;
