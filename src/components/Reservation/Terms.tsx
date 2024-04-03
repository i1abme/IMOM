import { useState } from "react";
import SectionTitle from "./SectionTitle";
import PrivacyStatement from "../common/Terms/PrivacyStatement";
import OverseasTravelAgreement from "../common/Terms/OverseasTravelAgreement";
import { TermsState } from "../../types/reservation";
import CancellationAndRefund from "../common/Terms/CancellationAndRefund";
import IdentificationInfo from "../common/Terms/IdentificationInfo";
import ProvisionOfPersonalInfo from "../common/Terms/ProvisionOfPersonalInfo";
import MarketingConsent from "../common/Terms/MarketingConsent";

const Terms = ({
  handleCheck,
  handleAllAgree,
  checkList,
}: {
  handleCheck: (id: string) => void;
  handleAllAgree: (checked: boolean) => void;
  checkList: TermsState;
}) => {
  const [details, setDetails] = useState<TermsState>({
    travel: false,
    refund: false,
    privacy: false,
    identification: false,
    thirdperson: false,
    marketing: false,
  });

  const [allAgree, setAllAgree] = useState(false);

  const handleDetail = (term: string) => {
    setDetails({
      ...details,
      [term]: !details[term as keyof TermsState],
    });
  };

  const handleAllAgreeClick = (checked: boolean) => {
    setAllAgree(() => !allAgree);
    handleAllAgree(checked);
  };

  const handleCheckClick = (id: string) => {
    if (allAgree) setAllAgree(false);
    handleCheck(id);
  };

  return (
    <section
      className="w-[664px] flex flex-col text-[14px] gap-[28px] text-sub-black 
    max-xsm:w-full max-xsm:gap-[6px] max-xsm:text-[10px]"
    >
      <SectionTitle title="약관동의" />
      <div className="px-[22px]">
        <input
          type="checkbox"
          id="allAgree"
          onChange={(e) => handleAllAgreeClick(e.target.checked)}
          checked={allAgree}
          className="max-xsm:w-[10px] max-xsm:h-[10px]"
        />
        <label htmlFor="allAgree" className="pl-[7px]">
          전체 동의
        </label>
      </div>
      <h3>필수 약관 동의</h3>
      <div
        className="px-[22px] flex flex-col gap-[20px] max-xsm:gap-[10px]
       max-xsm:border-main-color max-xsm:border-[0.5px] max-xsm:py-[6px]"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="travel"
              onChange={(e) => handleCheckClick(e.target.id)}
              checked={checkList.travel}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
            />
            <label htmlFor="travel" className="pl-[7px]">
              여행약관
            </label>
          </div>
          <button onClick={() => handleDetail("travel")}>자세히보기</button>
        </div>
        {details.travel && (
          <div className="my-[10px]">
            <OverseasTravelAgreement />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="refund"
              onChange={(e) => handleCheckClick(e.target.id)}
              checked={checkList.refund}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
            />
            <label htmlFor="refund" className="pl-[7px]">
              취소 및 환불규정
            </label>
          </div>
          <button onClick={() => handleDetail("refund")}>자세히보기</button>
        </div>
        {details.refund && (
          <div className="my-[10px]">
            <CancellationAndRefund />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              onChange={(e) => handleCheckClick(e.target.id)}
              checked={checkList.privacy}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
            />
            <label htmlFor="privacy" className="pl-[7px]">
              개인정보 수집 및 이용
            </label>
          </div>
          <button onClick={() => handleDetail("privacy")}>자세히보기</button>
        </div>
        {details.privacy && (
          <div className="my-[10px]">
            <PrivacyStatement />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="identification"
              onChange={(e) => handleCheckClick(e.target.id)}
              checked={checkList.identification}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
            />
            <label htmlFor="identification" className="pl-[7px]">
              고유식별정보 수집 및 이용동의
            </label>
          </div>
          <button onClick={() => handleDetail("identification")}>
            자세히보기
          </button>
        </div>
        {details.identification && (
          <div className="my-[10px]">
            <IdentificationInfo />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="thirdperson"
              onChange={(e) => handleCheckClick(e.target.id)}
              checked={checkList.thirdperson}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
            />
            <label htmlFor="thirdperson" className="pl-[7px]">
              개인정보 제 3자 제공 및 공유
            </label>
          </div>
          <button onClick={() => handleDetail("thirdperson")}>
            자세히보기
          </button>
        </div>
        {details.thirdperson && (
          <div className="my-[10px]">
            <ProvisionOfPersonalInfo />
          </div>
        )}
      </div>
      <h3>선택 약관 동의</h3>
      <div
        className="px-[22px] flex flex-col 
      max-xsm:border-main-color max-xsm:border-[0.5px] max-xsm:py-[6px]"
      >
        <div className="flex items-center justify-between ">
          <div>
            <input
              type="checkbox"
              id="marketing"
              onChange={(e) => handleCheckClick(e.target.id)}
              checked={checkList.marketing}
              className="max-xsm:w-[10px] max-xsm:h-[10px]"
            />
            <label htmlFor="marketing" className="pl-[7px]">
              마케팅용 개인정보 수집 및 활용동의
            </label>
          </div>
          <button onClick={() => handleDetail("marketing")}>자세히보기</button>
        </div>
        {details.marketing && (
          <div className="my-[10px]">
            <MarketingConsent />
          </div>
        )}
      </div>
    </section>
  );
};
export default Terms;
