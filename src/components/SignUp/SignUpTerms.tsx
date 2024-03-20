import { SetStateAction, useEffect, useState } from "react";
import SignUpPrivacyStatement from "../../constants/terms/SignUpPrivacyStatement";
import SignUpPersonalInformationPrivacyStatement from "../../constants/terms/SignUpPersonalInformationPrivacyStatement";
import SignUpMarketingPrivacyStatement from "../../constants/terms/SignUpMarketingPrivacyStatement";

type termType = {
  setMarketCheck: React.Dispatch<SetStateAction<number>>;
};

const SignUpTerms = ({ setMarketCheck }: termType) => {
  const data = [
    { id: 0, name: "term", title: "(필수)이용약관동의" },
    { id: 1, name: "personal", title: "(필수)개인정보 수집 및 이용동의" },
    { id: 2, name: "market", title: "(선택)마케팅 정보 수신동의 (이메일,SMS)" },
  ];
  const [termsUseActive, setTermsUseActive] = useState(false);
  const [termsPersonalActive, setTermsPersonalActive] = useState(false);
  const [marketingActive, setMarketingActive] = useState(false);

  const [checkItems, setCheckItems] = useState<number[]>([]);

  useEffect(() => {
    setMarketCheck(checkItems.length);
  }, [checkItems]);
  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      const idArray: number[] = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const handleTermClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    console.log(name);
    if (name === "term") {
      setTermsUseActive(!termsUseActive);
    } else if (name === "personal") {
      setTermsPersonalActive(!termsPersonalActive);
    } else if (name === "market") {
      setMarketingActive(!marketingActive);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center text-[14px] gap-[28px]  text-sub-black my-10">
      <div className="px-[22px]">
        <input
          type="checkbox"
          id="allAgree"
          name="allAgree"
          onChange={(e) => handleAllCheck(e.target.checked)}
          checked={checkItems.length === data.length ? true : false}
        />
        <label htmlFor="allAgree" className="pl-[7px]">
          전체 동의
        </label>
      </div>
      <div className="px-[22px] flex flex-col gap-[20px]">
        {data.map((el) => (
          <div key={el.id}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={el.name}
                  name={`select-${el.id}`}
                  onChange={(e) => handleSingleCheck(e.target.checked, el.id)}
                  checked={checkItems.includes(el.id) ? true : false}
                />
                <label htmlFor={el.name} className="pl-[7px]">
                  {el.title}
                </label>
              </div>
              <button name={el.name} onClick={handleTermClick}>
                자세히보기
              </button>
            </div>
            <div>
              {el.name === "term" && termsUseActive && (
                <SignUpPrivacyStatement />
              )}
              {el.name === "personal" && termsPersonalActive && (
                <SignUpPersonalInformationPrivacyStatement />
              )}
              {el.name === "market" && marketingActive && (
                <SignUpMarketingPrivacyStatement />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default SignUpTerms;
