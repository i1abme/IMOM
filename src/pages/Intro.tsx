import IntroImg from "/public/intro.png";

const Intro = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-lg text-sub-gray leading-10">
      <div
        className="bg-cover h-[400px] w-full bg-center"
        style={{ backgroundImage: `url(${IntroImg})` }}
      />
      <div className="flex justify-center flex-col max-w-[800px]">
        <div className="text-main-color">
          <section className="mt-10 ">
            <div className="flex text-xl items-center">
              <div className="font-bold  border-t-2 border-main-color">
                우리 i,
              </div>
              <div>&nbsp;Mom편한 여행은</div>
            </div>
            <p className="mb-5 text-[15px]">
              가족들끼리 떠나는 Mom편한 가족여행 패키지입니다!
            </p>
          </section>
        </div>

        <div className="mb-5 font-thin">
          <h2 className="font-bold mb-2">I. 회사 주요업무</h2>
          <ul className="list-disc pl-5">
            <li>유럽 현장투어서비스 "데이투어" 진행</li>
            <li>유럽 개별여행객 제반서비스</li>
            <li>유럽지역 인센티브 맞춤여행 기획 및 서비스(테마별 전문투어)</li>
            <li>공무원, 기업체 방문, 견학 연수, 교육연수, MICE 연수 진행</li>
            <li>유럽 패키지 및 세미패키지(자유투어 패키지) 투어서비스</li>
            <li>한국 유수여행사에 랜드서비스업무</li>
            <li>허니문 여행 서비스</li>
          </ul>
        </div>

        <div className="mb-5 font-thin">
          <h2 className="font-bold mb-2">II. 회사 비전</h2>
          <ul className="list-disc pl-5">
            <li>
              고객의 삶에 아름다운 추억과 행복을 드리는 여행을 기획합니다.
            </li>
            <li>
              여타하는 눈으로 보는 관광에 더해서 체험하고 느끼며 감동하는 여행을
              선사합니다.
            </li>
            <li className="mb-5">
              야경, 석양 등 환상적인 관광지 절경을 놓치지 않도록 합니다.
            </li>
            <li>
              고객이 머물고 싶은 여행지에 전문가 추천으로 느긋한 여유와 테마를
              추가합니다.
            </li>
            <li>
              고객의 흥미와 관심 분야를 적극적으로 개발, 반영하는 의미 있고
              결실이 있는 여행을 기획합니다.
            </li>
            <li className="mb-5">
              와이너리, 미술관기행, 음악회 관람, 고성숙박, 맛집투어, 축제참관,
              관심분야 체험 및 견학, 구시가지 자유체험, 해변, 산책로 걸어보기
            </li>
            <li>
              고객의 유럽 여행이 효율적 경제적이며 전문성 있는 여행이 되도록
              합니다.
            </li>
            <li>
              고객의 희망여행지와 여행예산에 적합한 최적의 일정을 추천합니다.
            </li>
            <li className="mb-5">
              기후, 날씨, 성별, 나이, 직업, 성비수기등을 고려한 적합한 일정을
              기획합니다.
            </li>
            <li>
              양적인 최대보다는 감동을 안겨주는 질적인 최고의 유럽전문
              여행업체가 되겠습니다.
            </li>
            <li>
              전세계 여행을 운영하기보다 유럽만을 고집하면서 효율과 전문성으로
              승부하겠습니다.
            </li>
            <li className="mb-5">
              고객을 여행비용 관계로 안내하기보다 성심을 다하는 장인의 마음으로
              모시겠습니다.
            </li>
            <li>
              공무원, 기업체 관련 방문, 견학, MICE분야등 목적성 유럽연수단체의
              최고 전문 업체가 되겠습니다.
            </li>
            <li>
              공무원기관방문, 교육단체 학교 기관방문, 견학, 기업체 벤치마킹,
              세미나, 전시회 학회등 한국 연수 출장자분들의 성공적인
              유럽여행일정이 될 수 있도록 하겠습니다.
            </li>
            <li>
              위의 연수를 전문적으로 진행하는 한국 유수여행사의 최고의
              유럽파트너가 되겠습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Intro;
