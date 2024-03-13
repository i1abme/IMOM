import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState<string>(
    location.pathname
  );
  const managerNavOption = [
    { title: "홈으로 가기", prams: "/" },
    { title: "메인 관리 페이지", prams: "/mainmanager" },
    { title: "패키지 관리 페이지", prams: "/packagemanager" },
    { title: "상품 관리 페이지", prams: "/productmanager" },
    { title: "주문 관리 페이지", prams: "/ordermanager" },
    { title: "태그 관리 페이지", prams: "/tagsmanager" },
  ];
  const handleSideClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    navigation(name);
    setSelectedButton(name);
  };
  return (
    <div className="w-full flex h-full">
      <div className="h-full flex flex-col p-10 border-r border-main-color mr-20">
        {managerNavOption.map((el, index) => {
          return (
            <button
              className={`flex whitespace-nowrap p-7 border-b border-main-color border-dotted hover:bg-main-color hover:text-white ${
                selectedButton === el.prams ? "bg-main-color text-white" : ""
              }`}
              key={index}
              name={el.prams}
              onClick={handleSideClick}
            >
              <span>{el.title}</span>
            </button>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
export default SideNav;
