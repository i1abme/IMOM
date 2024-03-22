import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginCheck } from "../../../atom/atom";
import userInstance from "../../../api/userInstance";

const UserMenu = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);
  const handleLogoutClick = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      userInstance
        .patch("/auth/logout")
        .then((res) => {
          if (res.status === 200) {
            setIsLogin(false);
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("refreshToken");
            alert("로그아웃 완료!");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      {!isLogin ? (
        <div className="flex gap-[12px] justify-between text-[10px] mb-[18px] text-sub-black">
          <Link to={"/login"}>
            <img src="/login.svg" alt="login" className="w-[30px] h-[30px]" />
            <button type="button">로그인</button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center text-[10px] text-sub-black gap-[12px]">
          <Link
            to={"/editmember"}
            className="flex justify-center flex-col items-center"
          >
            <img
              src="/submypage.svg"
              alt="mypage"
              className="w-[30px] h-[30px]"
            />
            마이페이지
          </Link>
          <button
            className="flex justify-center flex-col items-center"
            onClick={handleLogoutClick}
          >
            <img
              src="/sublogout.svg"
              alt="logout"
              className="w-[30px] h-[30px]"
            />
            로그아웃
          </button>
        </div>
      )}
    </>
  );
};
export default UserMenu;
