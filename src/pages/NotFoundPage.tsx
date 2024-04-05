import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    alert("페이지를 찾을 수 없습니다.");
    navigate("/");
  });
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>페이지를 찾을 수 없습니다.</p>
    </div>
  );
};

export default NotFoundPage;
