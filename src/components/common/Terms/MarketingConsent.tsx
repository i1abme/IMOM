import "./terms.css";

const MarketingConsent = () => {
  return (
    <div className="container">
      <h2 className="title">마케팅 활용동의 안내</h2>
      <br />
      1) 개인정보 활용 목적
      <br />
      제공한 모든 개인정보는 별도의 동의가 없는 한 해당 목적 이외의 다른
      목적으로 사용하지 않습니다.
      <br />
      여행자의 개인정보는 당사 고객에게 적합한 맞춤 여행상품 안내서비스 및 맞춤
      상담을 위해 아래와 같이 활용될 수 있습니다.
      <br />
      (1) 당사의 여행 상품 및 여행관련 서비스를 이용한 고객에게 한정하여 당사가
      기획한 여행상품이나 다양한 맞춤서비스 홍보 및 안내하기 위하여 개인정보
      활용에 동의한 고객에게 다양한 맞춤 서비스를 제공할 수 있습니다.
      <br />
      (2) 신규서비스 개발 및 특화, 인구통계학적 특성에 따른 서비스 제공 및 광고
      게재, 당사 및 제휴사 상품, 이벤트 등 광고성 정보 전달, 회원의 서비스
      이용에 대한 통계, 회원 대상 각종 마케팅 활동에 활용됩니다.
      <br />
      <br />
      2). 개인정보 수집 항목
      <br />
      <br />
      <table className="borderTable">
        <thead>
          <tr>
            <th>개인정보 항목</th>
            <th>수집 및 이용목적</th>
            <th className="w-[30%]">보유 및 이용기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>성명, 연락처, 이메일주소</td>
            <td>
              <strong>
                맞춤서비스 제공, 이벤트 안내, 상품 안내 등 마케팅 및 광고에 활용
              </strong>
            </td>
            <td className="text-center">
              <strong className="underline">1년</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MarketingConsent;
