import React from "react";
import { myPageNavTitle } from "../../constants/data";
import { Outlet, useNavigate } from "react-router-dom";

const MyPageNav = () => {
  const navigation = useNavigate();
  const handleSideClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { name } = e.currentTarget as HTMLButtonElement;
    navigation(name);
  };
  return (
    <div className="w-full flex h-full">
      <div className="h-full flex flex-col p-10 border-r border-main-color mr-20">
        {myPageNavTitle.map((el, index) => {
          return (
            <button
              className="flex whitespace-nowrap p-7 border-b border-main-color border-dotted"
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

export default MyPageNav;
