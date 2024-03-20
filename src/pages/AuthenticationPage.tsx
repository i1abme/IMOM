declare global {
  interface Window {
    IMP: any; // 또는 IMP에 대한 정확한 타입을 지정합니다.
  }
}

const AuthenticationPage = () => {
  const onClickCertification = () => {
    const { IMP } = window;
    IMP.init("imp08825538");

    IMP.certification({}, callback);
  };

  /* 3. 콜백 함수 정의하기 */
  function callback(response: any) {
    const { success, error_msg } = response;

    console.log(response);
    if (success) {
      alert("본인인증 성공");
    } else {
      alert(`본인인증 실패: ${error_msg}`);
    }
  }
  return <button onClick={onClickCertification}>본인인증</button>;
};

export default AuthenticationPage;

// import { useEffect } from "react";
// import axios from "axios";

// export default function AuthenticationPage() {
//   const userCode = "imp08825538"; // 코드 넣기
//   const data = {
//     merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
//     company: "http://localhost:3000/", // 회사명 또는 URL
//     carrier: "SKT",
//     min_age: 20,
//     name: "홍길동", // 이름
//     phone: "01012341234", // 전화번호
//   };

//   const callback = (res: any) => {
//     if (res.success) {
//       return axios
//         .get(`api.iamport.kr/certifications/${res.imp_uid}`)
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
//     } else return; //에러처리
//   };

//   useEffect(() => {
//     Promise.all([
//       new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = "https://code.jquery.com/jquery-1.12.4.min.js";
//         script.async = true;
//         script.onload = () => resolve(true);
//         script.onerror = () => reject();
//         document.body.appendChild(script);
//       }),
//       new Promise((resolve, reject) => {
//         const script = document.createElement("script");
//         script.src = "https://cdn.iamport.kr/v1/iamport.js";
//         script.async = true;
//         script.onload = () => resolve(true);
//         script.onerror = () => reject();
//         document.body.appendChild(script);
//       }),
//     ]).then(() => {
//       const { IMP } = window as any;
//       IMP.init(userCode);
//       IMP.certification(data, callback);
//     });
//   }, []);
//   return <></>;
// }
