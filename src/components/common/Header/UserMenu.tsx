import { Link } from "react-router-dom";
import IconUser from "/public/icon_user.svg";
import { useRecoilValue } from "recoil";
import { loginCheck } from "../../../atom/atom";

const UserMenu = () => {
  const isLogin = useRecoilValue(loginCheck);
  return (
    <>
      {!isLogin ? (
        <div className="flex gap-[12px] justify-between text-[10px] mb-[18px] text-sub-black">
          <Link to={"/login"}>
            <button type="button">로그인</button>
          </Link>
          <Link to={"/signup"}>
            <button type="button">회원가입</button>
          </Link>
        </div>
      ) : (
        <div className="flex text-[10px] text-sub-black">
          <Link
            to={"/editmember"}
            className="flex justify-center flex-col items-center"
          >
            <img src={IconUser} />
            마이페이지
          </Link>
        </div>
      )}
    </>
  );
};
export default UserMenu;
