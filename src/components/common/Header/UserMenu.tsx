import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { loginCheck, userChildName } from "../../../atom/atom";
import userInstance from "../../../api/userInstance";
const UserMenu = ({ handleMenuClose }: { handleMenuClose?: () => void }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);
  const isAdmin =
    window.localStorage.getItem("role") === "ROLE_ADMIN" ? true : false;
  const resetName = useResetRecoilState(userChildName);

  const handleLogoutClick = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      userInstance
        .patch("/auth/logout")
        .then((res) => {
          if (res.status === 200) {
            setIsLogin(false);
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("refreshToken");
            window.localStorage.removeItem("role");
            resetName();
            navigate("/");
            alert("로그아웃 완료!");
            if (handleMenuClose) {
              handleMenuClose();
            }
          }
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <>
      {!isLogin ? (
        <div className="flex gap-[12px] justify-between text-[10px] text-sub-black max-xsm:items-center max-xsm:text-[11px]">
          <button
            onClick={() => navigate("/login")}
            onTouchStart={() => navigate("/login")}
            className="max-xsm:flex-row max-xsm:gap-[5px] flex items-center flex-col"
          >
            <img
              src="/login.svg"
              alt="login"
              className="w-[30px] h-[30px] max-xsm:w-[18px] max-xsm:h-[21px] "
            />
            <button type="button">로그인</button>
          </button>
          <button
            onClick={() => navigate("/signup")}
            onTouchStart={() => navigate("/signup")}
            className="hidden max-xsm:inline"
          >
            <button type="button">회원가입</button>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center text-[10px] text-sub-black gap-[12px]">
          {!isAdmin ? (
            <button
              onClick={() => navigate("/mypageorderinfo")}
              onTouchStart={() => navigate("/mypageorderinfo")}
              className="flex justify-center flex-col items-center max-xsm:hidden"
            >
              <img
                src="/submypage.svg"
                alt="mypage"
                className="w-[30px] h-[30px]"
              />
              마이페이지
            </button>
          ) : (
            <button
              onClick={() => navigate("/mainmanager")}
              className="flex justify-center flex-col items-center max-xsm:hidden"
            >
              <img
                src="/submypage.svg"
                alt="mypage"
                className="w-[30px] h-[30px]"
              />
              관리자페이지
            </button>
          )}
          <button
            className="flex justify-center flex-col items-center max-xsm:flex-row max-xsm:gap-[5px]"
            onClick={handleLogoutClick}
            onTouchStart={handleLogoutClick}
          >
            <img
              src="/sublogout.svg"
              alt="logout"
              className="w-[30px] h-[30px] max-xsm:w-[18px] max-xsm:h-[21px]"
            />
            로그아웃
          </button>
        </div>
      )}
    </>
  );
};
export default UserMenu;
