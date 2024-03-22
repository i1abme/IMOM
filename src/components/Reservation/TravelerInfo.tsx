import { PriceInfoData, travelerInfo } from "../../types/reservation";
import SectionTitle from "./SectionTitle";
import TravelerInfoForm from "./TravelerInfoForm";
import { User } from "../../types/user";
import { useEffect, useState } from "react";

const TravelerInfo = ({
  priceInfo,
  handleTravelerInfo,
  userInfo,
  startDate,
  handleChangeAge,
}: {
  priceInfo: PriceInfoData;
  handleTravelerInfo: (
    travelerId: string,
    info: travelerInfo | string,
    category?: keyof travelerInfo
  ) => void;
  userInfo: User | undefined;
  startDate: string;
  handleChangeAge: (pickedAge: string, realAge: string) => void;
}) => {
  const [travelers, setTravelers] = useState<
    { id: string; category: string }[] | []
  >([]);

  useEffect(() => {
    setTravelers(() => {
      const initialTravelers = [
        ...Array.from({ length: priceInfo["성인"].count - 1 }, (_, index) => {
          return {
            id: `성인${index}`,
            category: "성인",
          };
        }),
        ...Array.from({ length: priceInfo["아동"].count }, (_, index) => {
          return {
            id: `아동${index}`,
            category: "아동",
          };
        }),
        ...Array.from({ length: priceInfo["유아"].count }, (_, index) => {
          return {
            id: `유아${index}`,
            category: "유아",
          };
        }),
      ];

      return initialTravelers;
    });
  }, [priceInfo]);

  const handleChangeSort = (
    id: string,
    newCategory: string,
    currentCategory: string
  ) => {
    // 카테고리 업데이트
    const updatedTravelers = travelers.map((traveler) =>
      traveler.id === id ? { ...traveler, category: newCategory } : traveler
    );

    // 카테고리 순으로 재정렬: 성인, 아동, 유아
    const sortedTravelers = updatedTravelers.sort((a, b) => {
      const order = { 성인: 1, 아동: 2, 유아: 3 };
      return (
        order[a.category as keyof typeof order] -
        order[b.category as keyof typeof order]
      );
    });

    handleChangeAge(currentCategory, newCategory);
    setTravelers(sortedTravelers);
  };

  return (
    <section className="flex flex-col w-[664px]">
      <div className="flex justify-between">
        <SectionTitle title="여행자 정보" />
      </div>
      <div className="p-[16px] flex flex-col gap-[40px]">
        <TravelerInfoForm
          role="대표1인"
          travelerId={"대표1인"}
          isRepresentative={true}
          handleTravelerInfo={handleTravelerInfo}
          userInfo={userInfo}
          startDate={startDate}
          handleChangeSort={handleChangeSort}
        />
        {travelers.map((item) => (
          <TravelerInfoForm
            key={item.id}
            travelerId={item.id}
            role={item.category}
            isRepresentative={false}
            handleTravelerInfo={handleTravelerInfo}
            startDate={startDate}
            handleChangeSort={handleChangeSort}
          />
        ))}
      </div>
    </section>
  );
};
export default TravelerInfo;
