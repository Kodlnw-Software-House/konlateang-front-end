import ItemCard from "../../../components/ui/ItemCard";
import useFetch from "../../../hooks/use-fetch";
import { RefreshIcon } from "@heroicons/react/outline";
import CovidInfo from "../../../components/MainPage/Covid19Info";
import ActiveHospital from "../../../components/MainPage/ActiveHospital";
import Card from "../../../components/ui/Card";
const MainPage = () => {
  const { data: covidData, loading } = useFetch(
    "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"
  );

  return (
    // Covid19 Todays
    <div>
      <ItemCard>
        {loading && !covidData && (
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
      <div>
        <Card>
          <p className="text-xl">ศูนย์พักคอยที่เปิดรับ</p>
        </Card>
        {/* active hospital list */}
        <ActiveHospital
          hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
          hospitalName="โรงพยาบาลนครธน"
          totalActiveBed="20"
          hospitalAddress="เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ 10150"
        />
        <ActiveHospital
          hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
          hospitalName="โรงพยาบาลไทยพาณิชย์"
          totalActiveBed="20"
          hospitalAddress="เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ 10150"
        />
        <ActiveHospital
          hospitalPic="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
          hospitalName="โรงพยาบาลกสิกร"
          totalActiveBed="20"
          hospitalAddress="เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ 10150"
        />
      </div>
    </div>
  );
};
export default MainPage;
