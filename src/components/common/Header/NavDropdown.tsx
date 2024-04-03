import { Link } from "react-router-dom";
import "./NavDropdown.css";
import useGetCountries from "../../../queries/countries/useGetCountries";
import UserMenu from "./UserMenu";
import { useRecoilValue } from "recoil";
import { viewSize } from "../../../atom/atom";
import { useEffect, useRef } from "react";

const NavDropdown = ({ handleMenuClose }: { handleMenuClose: () => void }) => {
  const { data } = useGetCountries();
  const viewSizeState = useRecoilValue(viewSize);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  const travelProductList = data?.reduce<{ [key: string]: string }>(
    (acc, countryName) => {
      acc[countryName] = `/travelproduct/${countryName}`;
      return acc;
    },
    {}
  );

  const handleDragStart = (event: MouseEvent | TouchEvent) => {
    console.log("start");
    const clientY =
      event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;

    console.log(clientY);
    startYRef.current = clientY;
    event.preventDefault();
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent) => {
    console.log("end");

    const clientY =
      event instanceof TouchEvent
        ? event.changedTouches[0].clientY
        : event.clientY;

    if (clientY - startYRef.current >= 80) {
      handleMenuClose();
    }
  };

  useEffect(() => {
    const element = dropdownRef.current;
    if (viewSizeState === "mobile" && element) {
      element.addEventListener("touchstart", handleDragStart, {
        passive: false,
      });
      element.addEventListener("touchend", handleDragEnd, { passive: false });
      element.addEventListener("mousedown", handleDragStart, {
        passive: false,
      });
      element.addEventListener("mouseup", handleDragEnd, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleDragStart);
        element.removeEventListener("touchend", handleDragEnd);
        element.removeEventListener("mousedown", handleDragStart);
        element.removeEventListener("mouseup", handleDragEnd);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewSizeState]);

  const FULL_MENU_LIST = [
    {
      title: "아이맘투어소개",
      list: {
        아이맘투어소개: "/intro",
      },
    },
    {
      title: "여행상품보기",
      list: travelProductList,
    },
    {
      title: "커뮤니티",
      list: {
        여행이야기: "/community",
        자주묻는질문: "/community",
        공지사항: "/community",
      },
    },
  ];

  return (
    <div
      className={`dropdown absolute w-fit overflow-hidden bg-white z-[100] px-[35px] 
      py-[24px] flex flex-row gap-[20px]
      max-xsm:fixed max-xsm:w-full max-xsm:flex-col
      max-xsm:h-fit  max-xsm:px-[50px] max-xsm:pb-[99px]
      max-xsm:rounded-t-[20px] max-xsm:py-0 select-none`}
      ref={dropdownRef}
    >
      <div className="w-[50px] h-[3px] rounded-[10px] bg-main-color  self-center mb-[12px] mt-[12px] hidden max-xsm:block" />
      <div className="flex justify-between items-start">
        <div className="flex justify-between items-start gap-[20px] max-xsm:flex-col max-xsm:gap-[10px]">
          {FULL_MENU_LIST.map((menu) => (
            <div key={menu.title} className="w-fit max-xsm:h-fit">
              <h2 className="text-main-color text-[14px] border-b-[1px] border-main-color mb-[10px]">
                {menu.title}
              </h2>
              {menu.list && (
                <ul
                  className="text-sub-black text-[10px] flex gap-y-[6px] first-letter:font-thin 
                flex-col h-[140px] flex-wrap w-fit max-xsm:h-fit max-xsm:text-[11px] max-xsm:tracking-[-0.6px]"
                >
                  {Object.entries(menu.list).map(([key, value]) => (
                    <li
                      key={key}
                      onClick={handleMenuClose}
                      className="mr-[30px]"
                    >
                      <Link to={value} state={key}>
                        {key}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        {viewSizeState === "mobile" && <UserMenu />}
      </div>
    </div>
  );
};
export default NavDropdown;
// const handleTouchStart = (event: TouchEvent | MouseEvent) => {
//   const startY =
//     event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;
//   setStartY(startY);
//   event.preventDefault();
// };

// const handleTouchMove = (event: TouchEvent | MouseEvent) => {
//   if (!dropdownRef.current) return;
//   const moveY =
//     event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;

//   if (moveY - startY > 200) {
//     setIsVisible(false);
//     handleMenuClose();
//     event.preventDefault();
//   }
// };

// useEffect(() => {
//   const element = dropdownRef.current;
//   if (viewSizeState === "mobile" && element) {
//     element.addEventListener("touchstart", handleTouchStart, {
//       passive: false,
//     });
//     element.addEventListener("touchmove", handleTouchMove, {
//       passive: false,
//     });
//     element.addEventListener("mousedown", handleTouchStart, {
//       passive: false,
//     });
//     element.addEventListener("mousemove", handleTouchMove, {
//       passive: false,
//     });
//   }

//   return () => {
//     if (element) {
//       element.removeEventListener("touchstart", handleTouchStart);
//       element.removeEventListener("touchmove", handleTouchMove);
//       element.removeEventListener("mousedown", handleTouchStart);
//       element.removeEventListener("mousemove", handleTouchMove);
//     }
//   };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [viewSizeState]);

// const handleStart = (event: TouchEvent | MouseEvent) => {
//   console.log("start");
//   const clientY =
//     event instanceof TouchEvent ? event.touches[0].clientY : event.clientY;
//   setStartY(clientY);
//   event.preventDefault();
// };

// const handleEnd = (event: TouchEvent | MouseEvent) => {
//   console.log("end");
//   const clientY =
//     event instanceof TouchEvent
//       ? event.changedTouches[0].clientY
//       : event.clientY;
//   if (clientY - startY > 200) {
//     // 드래그 거리가 200px 이상이면
//     setIsVisible(false);
//     handleMenuClose();
//     event.preventDefault();
//   }
// };

// useEffect(() => {
//   const element = dropdownRef.current;
//   if (element && viewSizeState === "mobile") {
//     element.addEventListener("touchstart", handleStart, { passive: false });
//     element.addEventListener("touchend", handleEnd, { passive: false });
//     element.addEventListener("mousedown", handleStart, { passive: false });
//     window.addEventListener("mouseup", handleEnd, { passive: false });

//     return () => {
//       element.removeEventListener("touchstart", handleStart);
//       element.removeEventListener("touchend", handleEnd);
//       element.removeEventListener("mousedown", handleStart);
//       window.removeEventListener("mouseup", handleEnd);
//     };
//   }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [viewSizeState]);
