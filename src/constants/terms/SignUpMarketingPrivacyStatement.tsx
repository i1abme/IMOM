const SignUpMarketingPrivacyStatement = () => {
  return (
    <div className="h-[300px] overflow-y-scroll p-[12px] text-[12px] text-sub-black border-sub-black border-[1px]">
      <h1>◼️ 마켓팅 정보 수신동의 [선택]</h1>
      <p>1. 개인정보의 마케팅/홍보 목적의 이용동의</p>
      <table className="borderTable">
        <thead>
          <tr>
            <th>수집목적</th>
            <th>수집항목</th>
            <th>보유 및 이용 기간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              서비스제공, 광고, 이벤트, 새로운 콘텐츠 안내, 신상품 등 광고성
              정보(문자정보 포함) 전달 및 참여기회 제공 등의 각종 마케팅
            </td>
            <td>휴대전화번호/이메일주소</td>
            <td>회원 탈퇴 시까지</td>
          </tr>
        </tbody>
      </table>
      <p>2. 광고성 정보의 이용목적</p>
      <p>
        주식회사 우리엘이 제공하는 이용자 맞춤형 서비스 및 상품 추천, 각종 경품
        행사, 이벤트 등의 광고성 정보를 전자우편이나, 문자(SMS 또는 카카오
        알림톡), 푸시, 전화 등을 통해 이용자에게 제공합니다.
      </p>
      <br />
      <p>
        마케팅 수신 동의는 선택하지 않으실 수 있으며 동의 후라도 고객의 의사에
        따라 철회할 수 있습니다. 관련 법규에 의거 선택정보 사항에 대해서는 동의
        거부 또는 철회하더라도 서비스 이용이 제한되지 않으나할인, 이벤트 및
        이용자 맞춤형 상품 추천 등의 마케팅 정보 안내 서비스가 제한됩니다. 단.,
        공지성 안내 또는 예약정보에 관한 내용은 수신동의와 상관없이 발송됩니다.
      </p>
      <br />
      시행일자 : 0000.00.00
    </div>
  );
};

export default SignUpMarketingPrivacyStatement;
