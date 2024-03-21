import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SideNav from "./components/common/SideNav";
import MainManager from "./pages/manager/MainManager";
import OrderManager from "./pages/manager/OrderManager";
import PackageManager from "./pages/manager/PackageManager";
import ProductManager from "./pages/manager/ProductManager";
import Main from "./pages/Main";
import Community from "./pages/Community";
import TravelDetail from "./pages/TravelDetail";
import TravelProduct from "./pages/TravelProduct";
import Reservation from "./pages/Reservation";
import Intro from "./pages/Intro";
import NewRegistration from "./pages/manager/NewRegistration";
import ProductDetail from "./pages/manager/ProductDetail";
import OrderDetail from "./pages/manager/OrderDetail";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import PaymentSuccess from "./pages/PaymentSuccess";
import TagsManager from "./pages/manager/TagsManager";
import MyPageNav from "./components/MyPage/MyPageNav";
import EditMember from "./pages/EditMember";
import MyPageOrderInfo from "./pages/MyPageOrderInfo";
import { TopScroll } from "./hooks/TopScroll";
import AuthenticationPage from "./pages/AuthenticationPage";
import NewRegistrationEdit from "./pages/manager/NewRegistrationEdit";
import FindEmail from "./pages/FindEmail";
import ResetPassword from "./pages/ResetPassword";
import EasySignUp from "./pages/EasySignUp";
import KakaoOAuthCallback from "./components/Login/KakaoOAuthCallback";
import NaverOAuthCallback from "./components/Login/NaverOAuthCallback";
import OrderConfirm from "./pages/OrderConfirm";
import MainLayout from "./components/common/MainLayout";

function App() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => console.log(`${error.message}`),
    }),
  });
  const token = window.localStorage.getItem("token");
  const refreshToken = window.localStorage.getItem("refreshToken");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TopScroll />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/easysignup" element={<EasySignUp />} />
          <Route path="/test" element={<AuthenticationPage />} />
          <Route path="/findemail" element={<FindEmail />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/kakao/oauth" element={<KakaoOAuthCallback />} />
          <Route path="/naver/oauth" element={<NaverOAuthCallback />} />
          <Route element={<MyPageNav />}>
            <Route
              path="/editmember"
              element={<EditMember token={token} refreshToken={refreshToken} />}
            />
            <Route
              path="/mypageorderinfo"
              element={
                <MyPageOrderInfo token={token} refreshToken={refreshToken} />
              }
            />
            <Route path="/orderconfirm/:orderId" element={<OrderConfirm />} />
          </Route>
          {/* 본문 네비게이션바 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:postId" element={<Community />} />
            <Route path="/traveldetail/:id" element={<TravelDetail />} />
            <Route path="/travelproduct" element={<TravelProduct />} />
            <Route
              path="/travelproduct/:category"
              element={<TravelProduct />}
            />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservation/success" element={<PaymentSuccess />} />
          </Route>
          {/* 관리자 네비게이션바 */}
          <Route element={<SideNav />}>
            <Route path="/mainmanager" element={<MainManager />} />
            <Route path="/packagemanager" element={<PackageManager />} />
            <Route path="/productmanager" element={<ProductManager />} />
            <Route path="/ordermanager" element={<OrderManager />} />
            {/* 임시: 페이지 띄우기*/}
            <Route path="/orderdetail" element={<OrderDetail />} />
            <Route path="/orderdetail/:id" element={<OrderDetail />} />
            <Route path="/newregistration" element={<NewRegistration />} />
            <Route
              path="/packagemanager/:id"
              element={<NewRegistrationEdit />}
            />
            <Route path="/productdetail/:edit" element={<ProductDetail />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/tagsmanager" element={<TagsManager />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
export default App;
