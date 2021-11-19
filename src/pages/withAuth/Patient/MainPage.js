import ItemCard from "../../../components/ui/ItemCard";
import { useFetch } from "../../../hooks/use-fetch";
import CovidInfo from "../../../components/MainPage/CovidInfo";
import ActiveHospital from "../../../components/MainPage/ActiveHospital";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import IsolationService from "../../../components/functions/services/isolation-service";
import {
  SearchCircleIcon,
  AdjustmentsIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  animationOne,
  transition,
} from "../../../components/animations/animation";
import Pagination from "../../../components/ui/Pagination";
const scrollTop = () => {
  return document.getElementById("isolation_list_title").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
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
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [page, setPage] = useState({
    pagSize: 6,
    pageNo: 1,
    sortType: "ASC",
    sortBy: "community_isolation_id",
    search: "",
  });
  let items = [];

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
            ? "btn btn-sm btn-ghost btn-primary btn-active md:btn-md"
            : "btn btn-sm btn-ghost btn-primary md:btn-md"
        }
        onClick={() => {
          if (page.pageNo !== i) {
            setPage((prev) => ({
              ...prev,
              pageNo: i,
            }));
            scrollTop();
          }
        }}
      >
        {i}
      </div>
    );
  }

  useEffect(() => {
    setisFetchIsolation(true);
    IsolationService.getAllIsolation(
      page.pagSize,
      page.pageNo,
      page.sortType,
      page.sortBy,
      page.search
    )
      .then((response) => {
        setIsolationData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setisFetchIsolation(false);
      });
  }, [page]);

  const toggleFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const nextPage = () => {
    if (page.pageNo < isolationData.totalPage) {
      setPage((prev) => ({
        ...prev,
        pageNo: prev.pageNo + 1,
      }));
      scrollTop();
    }
  };
  const prevPage = () => {
    if (page.pageNo > 1) {
      setPage((prev) => ({
        ...prev,
        pageNo: prev.pageNo - 1,
      }));
      scrollTop();
    }
  };
  const searchIsolation = (e) => {
    e.preventDefault();

    setPage((prev) => ({
      ...prev,
      search: enteredSearch,
    }));
    scrollTop();
  };
  const SortTypeOnchange = (e) => {
    e.preventDefault();
    setPage({ ...page, pageNo: 1, sortType: e.target.value });
  };
  return (
    // Covid19 Todays
    <motion.div
      initial="out"
      animate="in"
      variants={animationOne}
      transition={transition}
    >
      <ItemCard>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="mx-auto">
            <div className="text-gray-500">
              *ไม่สามารถโหลดข้อมูล covid-19 ได้*
            </div>
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
      <div className="m-4 p-2 md:mx-8 lg:py-2 xl:mx-60 2xl:mx-80">
        <div className="form-control shadow-sm">
          <form className="relative" onSubmit={searchIsolation}>
            <input
              type="text"
              placeholder="ค้นหาศูนย์พักคอย เช่น Thonburi Hospital "
              className="w-full pr-16 input input-sm rounded-box md:h-14 md:text-lg"
              value={enteredSearch}
              onChange={(e) => setEnteredSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 rounded-l-none btn btn-sm btn-ghost md:h-14"
            >
              <SearchCircleIcon className="w-7 h-auto md:w-9 md:h-14" />
            </button>
          </form>
        </div>
        <div className="border-b-2 border-primary py-2">
          <div className="flex flex-row cursor-pointer" onClick={toggleFilter}>
            <AdjustmentsIcon className="w-7 h-auto" />
            <span className="text-xl">ตัวกรอง</span>
          </div>
          {isOpenFilter && (
            <motion.div
              initial="out"
              animate="in"
              variants={animationOne}
              transition={transition}
              className="my-1 bg-primary-content p-2 py-4"
            >
              <div className="flex flex-col justify-center space-y-2 lg:flex-row lg:space-y-0">
                <div className="w-full">
                  <label className="label pl-0 pt-0">
                    <span>เรียงลำดับตาม</span>
                  </label>
                  <div className="flex flex-col justify-start lg:flex-row lg:space-x-4">
                    <div className="flex flex-row justify-between lg:space-x-2">
                      <p
                        className={
                          page.sortBy === "community_isolation_id"
                            ? "font-semibold"
                            : ""
                        }
                      >
                        ศูนย์พักคอยล่าสุด
                      </p>
                      <input
                        type="radio"
                        name="opt"
                        value="community_isolation_id"
                        className="radio radio-primary radio-sm"
                        onChange={() => {
                          setPage({
                            ...page,
                            sortBy: "community_isolation_id",
                          });
                        }}
                        checked={page.sortBy === "community_isolation_id"}
                      />
                    </div>
                    <div className="flex flex-row justify-between lg:space-x-2">
                      <p
                        className={
                          page.sortBy === "community_isolation_name"
                            ? "font-semibold"
                            : ""
                        }
                      >
                        ชื่อศูนย์พักคอย
                      </p>
                      <input
                        type="radio"
                        name="opt"
                        value="community_isolation_name"
                        className="radio radio-primary radio-sm"
                        checked={page.sortBy === "community_isolation_name"}
                        onChange={() => {
                          setPage({
                            ...page,
                            sortBy: "community_isolation_name",
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-row justify-between lg:space-x-2">
                      <p
                        className={
                          page.sortBy === "available_bed" ? "font-semibold" : ""
                        }
                      >
                        จำนวนเตียงทั้งหมด
                      </p>
                      <input
                        type="radio"
                        name="opt"
                        value="available_bed"
                        className="radio radio-primary radio-sm"
                        checked={page.sortBy === "available_bed"}
                        onChange={() => {
                          setPage({
                            ...page,
                            sortBy: "available_bed",
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-row justify-between lg:space-x-2">
                      <p
                        className={
                          page.sortBy === "address" ? "font-semibold" : ""
                        }
                      >
                        ที่อยู่
                      </p>
                      <input
                        type="radio"
                        name="opt"
                        value="address"
                        className="radio radio-primary radio-sm"
                        checked={page.sortBy === "address"}
                        onChange={() => {
                          setPage({
                            ...page,
                            sortBy: "address",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <label className="label pl-0">
                    <span>เรียงลำดับจาก</span>
                  </label>
                  <select
                    className="select select-bordered select-sm w-full max-w-xs"
                    onChange={SortTypeOnchange}
                  >
                    <option selected={page.sortType == "ASC"} value="ASC">
                      น้อยไปหามาก, A-Z
                    </option>
                    <option selected={page.sortType == "DESC"} value="DESC">
                      มากไปหาน้อย, Z-A
                    </option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div
          id="isolation_list_title"
          className="mt-8 text-center text-xl md:text-2xl"
        >
          ศูนย์พักคอยที่เปิดรับ
        </div>
      </div>
      {/* active hospital list */}

      {isFetchIsolation ? (
        <LoadingSpinner />
      ) : isolationData.rows && isolationData.rows.length !== 0 ? (
        <motion.div
          initial="out"
          animate="in"
          variants={animationOne}
          transition={{ duration: 0.2 }}
        >
          <div className=" lg:mx-20 xl:mx-60">
            <div className="grid justify-items-center gap-y-6 place-items-stretch md:grid-rows-none md:grid-cols-2 md:gap-y-4 lg:grid-cols-3 lg:gap-x-4">
              {isolationData.rows.map((item, key) => {
                return (
                  <ActiveHospital
                    key={key}
                    hospitalId={item.community_isolation_id}
                    hospitalName={item.community_isolation_name}
                    totalActiveBed={item.bed_left}
                    hospitalAddress={item.address}
                    image_index={item.image_index}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
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
      {/* Pagination */}
      <div className="my-4">
        <Pagination item={items} prevPage={prevPage} nextPage={nextPage} />
      </div>
    </motion.div>
  );
};
export default MainPage;
