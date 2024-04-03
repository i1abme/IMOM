import { useRecoilValue } from "recoil";
import { USER_INFO_CATEGORIES } from "../../constants/userdata";
import { User } from "../../types/user";
import SectionTitle from "./SectionTitle";
import { viewSize } from "../../atom/atom";
import TableRow from "../common/Order/TableRow";

const UserInfo = ({ userdata }: { userdata: User | undefined }) => {
  const viewSizeState = useRecoilValue(viewSize);
  console.log(userdata);
  return (
    <section>
      <SectionTitle title="예약자 정보" />
      <div className="w-[664px] p-[16px] max-xsm:w-full max-xsm:p-0 max-xsm:border-b-[0.5px] max-xsm:border-main-color">
        <div
          className="flex flex-wrap gap-y-[16px] p-[22px] border-[1px] border-sub-black 
        max-xsm:gap-0 max-xsm:p-0 max-xsm:border-none"
        >
          {USER_INFO_CATEGORIES.map((item) =>
            item.id !== "enFirstName" ? (
              viewSizeState === "web" ? (
                <div
                  className="min-w-[280px] gap-[26px] flex text-sub-black text-[14px]"
                  key={item.id}
                >
                  <span>{item.name}</span>
                  <span>{userdata ? userdata[item.id as keyof User] : ""}</span>
                </div>
              ) : (
                <TableRow
                  key={item.id}
                  category={typeof item.name === "string" ? item.name : ""}
                  content={userdata ? userdata[item.id as keyof User] : ""}
                  rowStyle="border-t-[0.5px] border-main-color"
                />
              )
            ) : viewSizeState === "web" ? (
              <div
                className="min-w-[280px] gap-[26px] flex text-sub-black text-[14px]"
                key={item.id}
              >
                <span>{item.name[0]}</span>
                <span>{userdata ? userdata[item.id] : ""}</span>
                <span>{userdata?.enLastName}</span>
              </div>
            ) : (
              <>
                <TableRow
                  key={"영문 성"}
                  category={"영문 성"}
                  content={userdata ? userdata.enFirstName : ""}
                  rowStyle="border-t-[0.5px] border-main-color"
                />
                <TableRow
                  key={item.name[0]}
                  category={item.name[0]}
                  content={userdata ? userdata.enLastName : ""}
                  rowStyle="border-t-[0.5px] border-main-color"
                />
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};
export default UserInfo;
