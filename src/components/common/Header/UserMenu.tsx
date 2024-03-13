import { useState } from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const [isLogin] = useState(true);
  return (
    <>
      {isLogin ? (
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
            to={"/mypage"}
            className="flex justify-center flex-col items-center"
          >
            <div>icon</div>
            마이페이지
          </Link>
        </div>
      )}
    </>
  );
};
export default UserMenu;
