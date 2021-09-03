import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import useFetch from "../../../hooks/use-fetch";
import { RefreshIcon } from "@heroicons/react/outline";
import CovidInfo from "./Covid19Info";
const MainPage = () => {
  const { data: covidData, loading } = useFetch(
    "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all"
  );

  return (
    // Covid19 Todays
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
  );
};
export default MainPage;
