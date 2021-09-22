import ItemCard from "../../../components/ui/ItemCard";
import { useFetch } from "../../../hooks/use-fetch";
import CovidInfo from "../../../components/MainPage/Covid19Info";
import ActiveHospital from "../../../components/MainPage/ActiveHospital";
import Card from "../../../components/ui/Card";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import IsolationService from "../../../components/functions/services/isolation-service";
import { SearchCircleIcon, AdjustmentsIcon } from "@heroicons/react/outline";
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
  const [page, setPage] = useState({ pagSize: 4, pageNo: 1, search: "" });
  const [pages] = useState(Math.round(isolationData.length / page.pagSize));

  useEffect(() => {
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

  const nextPage = () => {};
  const prevPage = () =>{};
  const changePage = (event) =>{};
  const getPaginationData = () => {}
  const getPaginationGroup = () => {}
  return (
    // Covid19 Todays
    <div>
      <ItemCard>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="mx-auto">
            <div className="w-10 h-10">{error}</div>
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
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาศูนย์พักคอย"
              className="w-full pr-16 input input-sm rounded-box"
            />
            <button className="absolute top-0 right-0 rounded-l-none btn btn-sm btn-ghost">
              <SearchCircleIcon className="w-7 h-auto" />
            </button>
          </div>
        </div>
        <div className="border-b-2 border-primary flex items-center py-2">
          <AdjustmentsIcon className="w-7 h-auto" />
          <span className="text-xl">ตัวกรอง</span>
        </div>
      </Card>
      {/* active hospital list */}
      <div>
        <Card>
          <p className="text-xl">ศูนย์พักคอยที่เปิดรับ</p>
        </Card>
        {isFetchIsolation ? (
          <LoadingSpinner />
        ) : isolationData ? (
          isolationData.map((item, key) => {
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
          <LoadingSpinner />
        )}
      </div>
      {/* Pagination */}
      <div className="my-2">
        <div className="btn-group justify-center">
          <button className="btn btn-sm btn-outline btn-primary">Prev</button>
          <button className="btn btn-sm btn-ghost btn-primary btn-active">
            1
          </button>
          <button className="btn btn-sm btn-ghost btn-primary">2</button>
          <button className="btn btn-sm btn-ghost btn-primary">3</button>
          <button className="btn btn-sm btn-ghost btn-primary">4</button>
          <button className="btn btn-sm btn-outline btn-primary">Next</button>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
