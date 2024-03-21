import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import AskBtn from "../AskBtn";
import Logo from "/public/logo.svg";

const Header = () => {
  return (
    <>
      <nav className="absolute flex-col w-full min-w-[823px] bg-white items-center">
        <div className="justify-center flex top-0 h-[179px] items-end pb-[10px] w-full">
          <div className="flex gap-[30px] flex-grow-[0.3] items-center">
            <Link to={"/"}>
              <div
                className="w-[224px] h-[70px] bg-center bg-cover"
                style={{
                  backgroundImage: `url(${Logo})`,
                }}
              />
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
