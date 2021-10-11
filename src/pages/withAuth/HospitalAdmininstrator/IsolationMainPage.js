import { useParams } from "react-router";
import ItemCard from "../../../components/ui/ItemCard";
import HospitalInformationCard from "../../../components/MainPage/HospitalInformationCard";
import { useEffect, useState } from "react";
import isolationService from "../../../components/functions/services/isolation-service";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Card from "../../../components/ui/Card";
import { Fragment } from "react";
import { UserGroupIcon, PencilAltIcon } from "@heroicons/react/outline";

const IsolationMainPage = () => {
  const [isolationData, setIsolationData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsloading(true);
    isolationService
      .getIsolationById(id, localStorage.getItem("user"))
      .then((response) => {
        console.log(response.data.isolation);
        setIsolationData(response.data.isolation);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <Fragment>
      <ItemCard>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            <Card>
              <h1 className="text-center text-3xl font-bold">
                ศูนย์พักคอยของท่าน
              </h1>
            </Card>
            <HospitalInformationCard
              community_isolation_name={isolationData?.community_isolation_name}
              hospital_name={isolationData?.Hospital?.hospital_name}
              available_bed={isolationData?.available_bed}
              address={isolationData?.address}
            />
          </Fragment>
        )}
      </ItemCard>
      <Card>
        <div className="flex flex-row justify-center space-x-2">
          <div className="bg-primary w-1/2 p-2 card shadow-lg compact">
            <div className="card-body text-white text-center items-center">
              <UserGroupIcon className="w-36 h-auto" />
              <p className="text-xl">
                ตรวจสอบ
                <br />
                รายชื่อผู้ป่วย
              </p>
            </div>
          </div>
          <div className="bg-primary w-1/2 p-2 card shadow-lg compact">
            <div className="card-body text-white text-center items-center">
              <PencilAltIcon className="w-36 h-auto" />
              <p className="text-xl">
                อัพเดตข้อมูล
                <br />
                ศูนย์พักคอย
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};
export default IsolationMainPage;
