import { USER_INFO_CATEGORIES } from "../../constants/userdata";
// import useGetUserInfo from "../../queries/users/useGetUserInfo";
import { User } from "../../types/user";
import SectionTitle from "./SectionTitle";

const UserInfo = () => {
  // const { data, isPending, isError, error } = useGetUserInfo();

  const userdata = {
    email: "hahyuning@naver.com",
    userName: "김우리",
    enFirstName: "kim",
    enLastName: "wooriiiiiiii",
    gender: "여",
    birth: "1999-11-11",
    phoneNumber: "010-1234-5678",
    headCount: 3,
    childName: "정우리",
  };
  return (
    <section>
      <SectionTitle title="예약자 정보" />
      <div className="w-[664px] p-[16px]">
        <div className="flex flex-wrap gap-y-[16px] p-[22px] border-[1px] border-sub-black">
          {USER_INFO_CATEGORIES.map((item) =>
            item.id !== "enFirstName" ? (
              <div
                className="min-w-[280px] gap-[26px] flex text-sub-black text-[14px]"
                key={item.id}
              >
                <span>{item.name}</span>
                <span>{userdata[item.id as keyof User]}</span>
              </div>
            ) : (
              <div
                className="min-w-[280px] gap-[26px] flex text-sub-black text-[14px]"
                key={item.id}
              >
                <span>{item.name[0]}</span>
                <span>{userdata[item.id]}</span>
                <span>{userdata.enLastName}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default UserInfo;
