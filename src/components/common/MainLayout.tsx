import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer";
import MbNav from "./MbNav";
import MbHeader from "./Header/MbHeader";
function MainLayout() {
  return (
    <>
      <Header />
      <MbHeader />
      <div className="flex-1 h-full w-full py-[216px] flex max-xsm:p-0 max-xsm:pt-16 max-xsm:pb-20">
        <Outlet />
      </div>
      <Footer />
      <MbNav />
    </>
  );
}

export default MainLayout;
