import Card from "../../../components/ui/Card";
import ItemCard from "../../../components/ui/ItemCard";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import HospitalAdminActiveHospital from "../../../components/MainPage/HospitalAdminActiveHospital";
import HospitalService from "../../../components/functions/services/hospital-service";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
import { AuthAction } from "../../../redux/auth-slice";

const HospitalAdminMainPage = (props) => {
  const dispatch = useDispatch();
  const [isFetchIsolation, setisFetchIsolation] = useState(false);
  const [isolationData, setIsolationData] = useState([]);

  useEffect(() => {
    setisFetchIsolation(true);
    HospitalService.getIsolation(localStorage.getItem("user"))
      .then((response) => {
        setIsolationData(response.data.isolation);
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.message,
          })
        );
        if (error.response.status === 401) {
          dispatch(AuthAction.userLogedOut());
          return;
        }
      })
      .finally(() => {
        setisFetchIsolation(false);
      });
  }, []);

  return (
    <div>
      <Card>
        <h1 className="text-center text-3xl font-bold">ศูนย์พักคอยของท่าน</h1>
      </Card>
      {isFetchIsolation ? (
        <LoadingSpinner />
      ) : isolationData.length !== 0 ? (
        isolationData.map((item, key) => {
          return (
            <HospitalAdminActiveHospital
              key={key}
              hospitalName={item.community_isolation_name}
              totalActiveBed={item.available_bed}
            />
          );
        })
      ) : (
        <ItemCard>
          <div className="flex flex-col justify-center space-y-2">
            <InformationCircleIcon className="w-10 h-10 mx-auto" />
            <div className="text-center">ไม่พบข้อมูลศูนย์พักคอยในระบบ</div>
          </div>
        </ItemCard>
      )}
      <div className="card border-dashed border-4 border-gray-400 shadow-md m-4">
        <div className="card-body p-4 flex space-x-2 overflow-hidden items-center mx-auto">
          <div className="flex flex-col justify-center items-center text-gray-400 space-y-1">
            <PlusIcon className="w-14 h-auto" />
            <p className="text-xl">เพิ่มศูนย์พักพิง</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdminMainPage;
