import ItemCard from "../../../components/ui/ItemCard";
import useFetch from "../../../hooks/use-fetch";
import CovidInfo from "../../../components/MainPage/Covid19Info";
import ActiveHospital from "../../../components/MainPage/ActiveHospital";
import Card from "../../../components/ui/Card";
import {
  SearchCircleIcon,
  RefreshIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
const MainPage = () => {
  const { data: covidData, loading } = useFetch(
    "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"
  );

  return (
    // Covid19 Todays
    <div>
      <ItemCard>
        {loading && (
          <div className="mx-auto">
            <RefreshIcon className="w-10 h-10 animate-spin" />
          </div>
        )}
        {!loading && covidData && (
          <CovidInfo
            newCase={covidData[0].new_case}
            updateDate={covidData[0].update_date}
            newRecovered={covidData[0].new_recovered}
            totalRecovered={covidData[0].total_recovered}
            newDeath={covidData[0].new_death}
            totalDeath={covidData[0].total_death}
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
        <ActiveHospital
          hospitalId="1"
          hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
          hospitalName="โรงพยาบาลนครธน"
          totalActiveBed="20"
          hospitalAddress="เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ 10150"
        />
        <ActiveHospital
          hospitalId="2"
          hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
          hospitalName="โรงพยาบาลไทยพาณิชย์"
          totalActiveBed="20"
          hospitalAddress="เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ 10150"
        />
        <ActiveHospital
          hospitalId="3"
          hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
          hospitalName="โรงพยาบาลกสิกร"
          totalActiveBed="20"
          hospitalAddress="เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ 10150"
        />
      </div>
      {/* Pagination */}
      <div className="my-2">
        <div className="btn-group justify-center">
          <button className="btn btn-sm btn-outline btn-primary">Prev</button>
          <button className="btn btn-sm btn-ghost btn-primary btn-active">1</button>
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
