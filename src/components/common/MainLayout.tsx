import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex-1 h-100vh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
