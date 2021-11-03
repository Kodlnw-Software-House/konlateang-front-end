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
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  animationOne,
  transition,
} from "../../../components/animations/animation";

const HospitalAdminMainPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isFetchIsolation, setisFetchIsolation] = useState(false);
  const [isolationData, setIsolationData] = useState([]);

  useEffect(() => {
    setisFetchIsolation(true);
    HospitalService.getIsolation(localStorage.getItem("user"))
      .then((response) => {
        setIsolationData(response.data.isolation);
      })
      .catch((error) => {
        console.log(error.response.status);
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
  }, [dispatch]);

  const goPath = (id) => {
    history.push(`${currentPath}/community-isolation/id/${id}`);
  };
  const goCreate = () => {
    history.push(`${currentPath}/community-isolation/create`);
  };

  return (
    <div>
      <Card>
        <h1 className="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
          ศูนย์พักคอยของท่าน
        </h1>
      </Card>
      {isFetchIsolation ? (
        <LoadingSpinner />
      ) : isolationData.length !== 0 ? (
        <ItemCard>
          <motion.div
            initial="out"
            animate="in"
            variants={animationOne}
            transition={transition}
          >
            <div className="grid grid-cols-1 md:grid-rows-2 items-stretch justify-items-stretch">
              {isolationData.map((item, key) => {
                return (
                  <HospitalAdminActiveHospital
                    key={key}
                    id={item.community_isolation_id}
                    hospitalName={item.community_isolation_name}
                    allBed={item.available_bed}
                    activeBed={item.bed_left}
                    goPath={goPath}
                  />
                );
              })}
              <div
                onClick={() => goCreate()}
                className="card border-dashed border-4 border-gray-400 shadow-md m-4 text-gray-400 md:mx-10 lg:py-2  cursor-pointer hover:border-gray-500 hover:text-gray-500"
              >
                <div className="card-body p-4 flex space-x-2 overflow-hidden items-center mx-auto">
                  <div className="flex flex-col justify-center items-center space-y-1">
                    <PlusIcon className="w-14 h-auto" />
                    <p className="text-xl">ลงทะเบียนศูนย์พักคอย</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </ItemCard>
      ) : (
        <ItemCard>
          <div className="flex flex-col justify-center space-y-2">
            <InformationCircleIcon className="w-10 h-10 mx-auto" />
            <div className="text-center">ไม่พบข้อมูลศูนย์พักคอยในระบบ</div>
          </div>
        </ItemCard>
      )}
    </div>
  );
};

export default HospitalAdminMainPage;
