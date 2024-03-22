import { USER_INFO_CATEGORIES } from "../../constants/userdata";
// import useGetUserInfo from "../../queries/users/useGetUserInfo";
import { User } from "../../types/user";
import SectionTitle from "./SectionTitle";

const UserInfo = ({ userdata }: { userdata: User | undefined }) => {
  // const { data, isPending, isError, error } = useGetUserInfo();

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
                <span>{userdata ? userdata[item.id as keyof User] : ""}</span>
              </div>
            ) : (
              <div
                className="min-w-[280px] gap-[26px] flex text-sub-black text-[14px]"
                key={item.id}
              >
                <span>{item.name[0]}</span>
                <span>{userdata ? userdata[item.id] : ""}</span>
                <span>{userdata?.enLastName}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default UserInfo;
