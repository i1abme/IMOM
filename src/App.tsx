import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/common/Header/Header";
import Login from "./pages/Login";
import Main from "./pages/Main";
import TravelDetail from "./pages/TravelDetail";
import TravelProduct from "./pages/TravelProduct";
import Reservation from "./pages/Reservation";
import Intro from "./pages/Intro";
import MyPage from "./pages/MyPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queries/common/quertClient";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyPageNav from "./components/MyPage/MyPageNav";
import MyPageOrderInfo from "./pages/MyPageOrderInfo";
import { TopScroll } from "./hooks/TopScroll";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <TopScroll />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<MyPageNav />}>
            <Route path="/mypage" element={<MyPage />} />

            <Route path="/mypageorderinfo" element={<MyPageOrderInfo />} />
          </Route>
          {/* 본문 네비게이션바 */}
          <Route element={<Header />}>
            <Route path="/" element={<Main />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/traveldetail/:id" element={<TravelDetail />} />
            <Route path="/travelproduct" element={<TravelProduct />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservation/success" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
export default App;
