import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import AdminIsolationTable from "../../../components/AdminIsolationTable/AdminIsolationTable";
import adminService from "../../../components/functions/services/admin-service";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Pagination from "../../../components/ui/Pagination";
const IsolationTable = (props) => {
  const [isolationData, setIsolationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [orderAsc, setOrderAsc] = useState(true);
  const [page, setPage] = useState({
    pagSize: 10,
    pageNumber: 1,
    sortType: "ASC",
    sortBy: "community_isolation_id",
  });
  const history = useHistory();
  let items = [];

  useEffect(() => {
    setIsLoading(true);
    adminService
      .getAllIsolation(
        page.pagSize,
        page.pageNumber,
        page.sortType,
        page.sortBy
      )
      .then((response) => {
        setIsolationData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  if (!isLoading) {
    for (
      let i = 1;
      i <=
      (isolationData.result.totalPage <= 1
        ? 1
        : isolationData.result.totalPage);
      i++
    ) {
      items.push(
        <div
          key={i}
          className={
            page.pageNumber === i
              ? "btn btn-sm btn-ghost btn-primary btn-active md:btn-md"
              : "btn btn-sm btn-ghost btn-primary md:btn-md"
          }
          onClick={() => {
            if (page.pageNumber !== i) {
              setPage((prev) => ({
                ...prev,
                pageNumber: i,
              }));
            }
          }}
        >
          {i}
        </div>
      );
    }
  }
  const toggleOrder = () => {
    const state = orderAsc;
    setOrderAsc((prev) => !prev);
    if (state) {
      setPage({ ...page, sortType: "DESC" });
    } else {
      setPage({ ...page, sortType: "ASC" });
    }
  };
  const nextPage = () => {
    if (page.pageNumber < isolationData.result.totalPage) {
      setPage((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
    }
  };
  const prevPage = () => {
    if (page.pageNumber > 1) {
      setPage((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber - 1,
      }));
    }
  };
  const setSort = (field) => {
    switch (field) {
      case "community_isolation_id":
        setPage({ ...page, sortBy: "community_isolation_id" });
        break;
      case "community_isolation_name":
        setPage({ ...page, sortBy: "community_isolation_name" });
        break;
      case "available_bed":
        setPage({ ...page, sortBy: "available_bed" });
        break;
    }
  };
  const goTo = (id) => {
    history.push(props.path + "/isolations/" + id)
  }
  return (
    <div className="container mx-auto mt-16">
      {isLoading ? (
        <LoadingSpinner />
      ) : isolationData.result.count !== 0 ? (
        <Fragment>
          <div className="my-2">
            <button className="btn btn-sm btn-primary" onClick={toggleOrder}>
              Toggle {orderAsc ? "DESC" : "ASC"}
            </button>
          </div>
          <AdminIsolationTable
            setSort={setSort}
            rows={isolationData.result.rows}
            goTo={goTo}
          />
        </Fragment>
      ) : (
        <div>
          <div className="text-2xl text-center">ไม่พบข้อมูลผู้ป่วยในระบบ</div>
        </div>
      )}
      {/* Pagination */}
      {!isLoading && (
        <div className="my-4">
          <Pagination item={items} prevPage={prevPage} nextPage={nextPage} />
        </div>
      )}
    </div>
  );
};
export default IsolationTable;
