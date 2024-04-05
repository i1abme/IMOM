import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../App.css";
import { baseInstance } from "../api/instance";
import CommunityEditor from "../components/Community/CommunityEditor";
import CommunityDetail from "../components/Community/CommunityDetail";
import SectionTitle from "../components/common/SectionTitle";
import CustomPagination from "../components/common/CustomPagination";
import { useRecoilValue } from "recoil";
import { loginCheck } from "../atom/atom";
import CommunityImg from "/public/community.jpeg";

type CommunityCloum = {
  title: string | JSX.Element;
  createdDate: string;
  check: JSX.Element;
};
type CommunityRow = {
  postId: number;
  title: JSX.Element;
  createdDate: string;
  id: number;
  check: JSX.Element;
};

const Community = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("공지사항");
  const [editorActive, setEditorActive] = useState<boolean>(true);
  const [selectCommunity, setSelectCommunity] = useState<number[]>([]);
  const [newData, setNewData] = useState<CommunityRow[]>([]);
  const isLogin = useRecoilValue(loginCheck);
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const isAdmin =
    window.localStorage.getItem("role") === "ROLE_ADMIN" ? true : false;

  const handlePageChange = (selected: number) => {
    setOffset(selected);
  };

  // 받아온 데이터 형태 바꾸기
  const [tableData, setTableData] = useState<CommunityRow[]>([]);
  // 열추가
  const columnHelper = createColumnHelper<CommunityCloum>();
  const columns = [
    columnHelper.accessor("check", {
      header: () =>
        isLogin ? (
          <input
            type="checkbox"
            onChange={handleToggleAll}
            checked={selectCommunity.length === newData.length}
          />
        ) : (
          <></>
        ),
      cell: ({ row }) => row.original.check,
    }),
    columnHelper.accessor("title", {
      header: "제목",
      cell: ({ row }) => row.original.title,
    }),
    columnHelper.accessor("createdDate", { header: "작성일자" }),
  ];
  useEffect(() => {
    baseInstance
      .get(`/posts/${active}/${offset}`)
      .then((res) => {
        setTableData(res.data.data.content);
        setTotalPage(res.data.data.totalPages);
        setDeleteActive(false);
      })
      .catch((err) => console.log(err));
  }, [active, deleteActive]);

  useEffect(() => {
    if (tableData.length !== 0) {
      setNewData(
        tableData.map((item: CommunityRow) => ({
          ...item,
          id: item.postId,
          check: isLogin ? (
            <input
              type="checkbox"
              onChange={() => handleToggleItem(item.postId)}
              checked={selectCommunity.includes(item.postId)}
            />
          ) : (
            <></>
          ),
          title: (
            <button type="button">
              <Link to={`/community/${item.postId}`} state={item.postId}>
                {item.title}
              </Link>
            </button>
          ),
        }))
      );
    } else {
      setNewData([]);
    }
  }, [tableData, selectCommunity]);

  const handleToggleAll = () => {
    if (selectCommunity.length === newData.length) {
      setSelectCommunity([]);
    } else {
      setSelectCommunity(newData.map((item) => item.postId));
    }
  };

  const handleToggleItem = (key: number): void => {
    setSelectCommunity((prevSelectCommunity) => {
      if (prevSelectCommunity.includes(key)) {
        return prevSelectCommunity.filter((id) => id !== key);
      } else {
        return [...prevSelectCommunity, key];
      }
    });
  };
  // 사이드 네비게이션
  const handleNavClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    el: string
  ) => {
    const { name } = e.currentTarget;
    if (name === el) {
      setSelectCommunity([]);
      setActive(name);
      navigate("/community");
      setEditorActive(true);
    }
  };
  // 등록/삭제 클릭

  const handleRegisterDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const { name } = e.currentTarget;

    if (name === "등록하기") {
      setEditorActive(false);
    } else if (
      name === "삭제하기" &&
      selectCommunity.length > 0 &&
      confirm("삭제하시겠습니까?")
    ) {
      try {
        const res = await baseInstance.post(`/posts/batch-delete`, {
          operation: "",
          ids: selectCommunity,
        });

        if (res.status === 200) {
          alert("삭제가 완료됐습니다.");
          setDeleteActive(true);
        } else {
          alert("오류가 발생했습니다.");
        }
      } catch (error) {
        alert("오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    setActive(location.state || "공지사항");
  }, [location.state]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1280px] flex flex-col items-center max-xsm:w-full">
        <div
          className="h-[400px] w-full mb-8 bg-cover bg-center"
          style={{ backgroundImage: `url(${CommunityImg})` }}
        />
        <div className="flex w-full max-xsm:flex-col">
          <div className="flex flex-col items-start mr-9">
            <SectionTitle title="커뮤니티" padding={true} />
            <div className="w-full flex flex-col max-xsm:flex-row max-xsm:justify-center ">
              {["공지사항", "자주묻는질문", "여행이야기"].map((el, idx) => (
                <button
                  key={idx}
                  name={el}
                  onClick={(e) => handleNavClick(e, el)}
                  className={`border flex justify-center items-center max-xsm:rounded-lg max-xsm:mr-2 border-main-color w-full whitespace-nowrap px-2 h-9 font-bold hover:bg-main-color hover:text-white ${
                    active === el && "bg-main-color text-white"
                  } ${idx === 0 || idx === 1 ? "mb-2" : ""}`}
                >
                  {el}
                </button>
              ))}
            </div>
          </div>
          {!params.postId ? (
            editorActive ? (
              <div className="w-full">
                <Table
                  columns={columns}
                  data={newData}
                  tableStyle={
                    "text-center w-full border-main-color border-t-[0.5px] border-b-[0.5px]"
                  }
                  theadStyle={
                    "bg-main-color bg-opacity-10 h-[24px] mt-[1px] border-t-[0.5px] border-b-[0.5px] border-main-color"
                  }
                  thStyle={"text-[12px]"}
                  tbodyStyle={"text-[10px]"}
                  tbodyTrStyle={
                    "border-t-[0.5px] border-dashed border-main-color"
                  }
                  tdStyle={"py-[14px]"}
                />
                {isAdmin ? (
                  <div className="flex justify-end w-full">
                    {["삭제하기", "등록하기"].map((el, idx) => (
                      <button
                        className={`border border-main-color  rounded-full px-3 mt-4 hover:bg-main-color hover:text-white ${
                          idx === 0 ? "mr-2" : ""
                        }`}
                        key={idx}
                        name={el}
                        onClick={handleRegisterDeleteClick}
                      >
                        {el}
                      </button>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex items-center w-full justify-center">
                  <CustomPagination
                    handlePageClick={handlePageChange}
                    totalPage={totalPage}
                  />
                </div>
              </div>
            ) : (
              <CommunityEditor active={active} />
            )
          ) : (
            <CommunityDetail setEditorActive={setEditorActive} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
