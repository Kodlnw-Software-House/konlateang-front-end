import ItemCard from "../../../components/ui/ItemCard";
import { useFetch } from "../../../hooks/use-fetch";
import CovidInfo from "../../../components/MainPage/Covid19Info";
import ActiveHospital from "../../../components/MainPage/ActiveHospital";
import Card from "../../../components/ui/Card";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import IsolationService from "../../../components/functions/services/isolation-service";
import {
  SearchCircleIcon,
  AdjustmentsIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
const MainPage = () => {
  const {
    data: covidData,
    loading,
    error,
  } = useFetch({
    method: "get",
    baseURL: "https://covid19.ddc.moph.go.th/api/Cases",
    url: "/today-cases-all",
  });
  const [isFetchIsolation, setisFetchIsolation] = useState(false);
  const [isolationData, setIsolationData] = useState([]);
  const [enteredSearch, setEnteredSearch] = useState("");
  const [page, setPage] = useState({ pagSize: 4, pageNo: 1, search: "" });
  let items = [];
  console.log(isolationData);
  for (
    let i = 1;
    i <=
    (isolationData.totalPage === 1
      ? 1
      : isolationData.totalPage === 0
      ? 1
      : isolationData.totalPage);
    i++
  ) {
    items.push(
      <div
        key={i}
        className={
          page.pageNo === i
            ? "btn btn-sm btn-ghost btn-primary btn-active"
            : "btn btn-sm btn-ghost btn-primary"
        }
        onClick={() => {
          if (page.pageNo !== i) {
            setPage((prev) => ({
              ...prev,
              pageNo: i,
            }));
          }
        }}
      >
        {i}
      </div>
    );
  }

  useEffect(() => {
    // const pageNo = query.get("pageNo") ? query.get("pageNo") : page.pageNo;
    // const searchText = query.get("search") ? query.get("search") : page.search;
    setisFetchIsolation(true);
    IsolationService.getAllIsolation(page.pagSize, page.pageNo, page.search)
      .then((response) => {
        console.log(response.data.result);
        setIsolationData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setisFetchIsolation(false);
      });
  }, [page.pagSize, page.pageNo, page.search]);

  const nextPage = () => {
    if (page.pageNo < isolationData.totalPage) {
      setPage((prev) => ({
        ...prev,
        pageNo: prev.pageNo + 1,
      }));
    }
  };
  const prevPage = () => {
    if (page.pageNo > 1) {
      setPage((prev) => ({
        ...prev,
        pageNo: prev.pageNo - 1,
      }));
    }
  };
  const searchIsolation = (e) => {
    e.preventDefault();

    setPage((prev) => ({
      ...prev,
      search: enteredSearch,
    }));

    document.getElementById("isolation_list_title").scrollIntoView();
  };
  return (
    // Covid19 Todays
    <div>
      <ItemCard>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="mx-auto">
            <div className="w-10 h-10">ไม่สามารถโหลดข้อมูล covid-19 ได้</div>
          </div>
        ) : (
          <CovidInfo
            newCase={covidData[0]?.new_case}
            updateDate={covidData[0]?.update_date}
            newRecovered={covidData[0]?.new_recovered}
            totalRecovered={covidData[0]?.total_recovered}
            newDeath={covidData[0]?.new_death}
            totalDeath={covidData[0]?.total_death}
          />
        )}
      </ItemCard>
      {/* search input */}
      <Card>
        <div className="form-control shadow-sm">
          <form className="relative" onSubmit={searchIsolation}>
            <input
              type="text"
              placeholder="ค้นหาศูนย์พักคอย"
              className="w-full pr-16 input input-sm rounded-box"
              value={enteredSearch}
              onChange={(e) => setEnteredSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 rounded-l-none btn btn-sm btn-ghost"
            >
              <SearchCircleIcon className="w-7 h-auto" />
            </button>
          </form>
        </div>
        <div className="border-b-2 border-primary flex items-center py-2">
          <AdjustmentsIcon className="w-7 h-auto" />
          <span className="text-xl">ตัวกรอง</span>
        </div>
      </Card>
      {/* active hospital list */}
      <div>
        <Card>
          <div id="isolation_list_title" className="text-xl">
            ศูนย์พักคอยที่เปิดรับ
          </div>
        </Card>
        {isFetchIsolation ? (
          <LoadingSpinner />
        ) : isolationData.rows && isolationData.rows.length !== 0 ? (
          isolationData.rows.map((item, key) => {
            return (
              <ActiveHospital
                key={key}
                hospitalId={item.community_isolation_id}
                hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                hospitalName={item.community_isolation_name}
                totalActiveBed={item.available_bed}
                hospitalAddress={item.address}
              />
            );
          })
        ) : (
          <ItemCard>
            <div className="flex flex-col justify-center space-y-2">
              <div>
                <InformationCircleIcon className="w-10 h-10 mx-auto" />
              </div>
              {page.search ? (
                <div className="text-center">ไม่พบข้อมูลที่ค้นหา</div>
              ) : (
                <div className="text-center">ไม่พบข้อมูลในระบบ</div>
              )}
            </div>
          </ItemCard>
        )}
      </div>
      {/* Pagination */}
      <div className="my-4">
        <div className="btn-group justify-center">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={prevPage}
          >
            Prev
          </button>
          {items}
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
