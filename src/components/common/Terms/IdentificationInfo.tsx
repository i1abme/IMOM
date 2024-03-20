import "./terms.css";
const IdentificationInfo = () => {
  return (
    <div className="container">
      <h2 className="title">고유식별 정보 수집 동의</h2>
      1) 당사는 여행상품 예약 및 여행관련 서비스 제공등의 업무처리를 위하여
      고유식별정보를 수집,이용하며 기준은 아래와 같습니다. <br />
      <br />
      <table className="borderTable">
        <thead>
          <tr>
            <th>수집하는 항목</th>
            <th>수집 및 이용목적</th>
            <th className="w-[30%]">보유 및 이용기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong className="underline">
                여권번호, 주민등록번호, 외국인등록번호
              </strong>
            </td>
            <td>
              여행상품 예약시 출국가능여부 파악 및 여행자 본인 식별,
              여행자보험가입
            </td>
            <td className="text-center">
              <strong className="underline">도착 후 즉시파기</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      2) 동의 거부권 및 불이익
      <br />
      여행예약 시 개인정보 수집, 이용에 대한 동의를 거부할 권리가 있으나, 동의를
      거부할 경우 여행상품 예약 서비스 이용에 제한이 있음을 알려드립니다.
      <br />
    </div>
  );
};
export default IdentificationInfo;
