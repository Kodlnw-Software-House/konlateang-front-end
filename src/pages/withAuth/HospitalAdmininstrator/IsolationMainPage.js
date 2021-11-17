import { Route, Switch, useParams } from "react-router";
import ItemCard from "../../../components/ui/ItemCard";
import HospitalInformationCard from "../../../components/MainPage/HospitalInformationCard";
import { useEffect, useState } from "react";
import hospitalService from "../../../components/functions/services/hospital-service";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Card from "../../../components/ui/Card";
import BackButton from "../../../components/ui/BackButton";
import { Fragment } from "react";
import { UserGroupIcon, PencilAltIcon } from "@heroicons/react/outline";
import { Link, useRouteMatch } from "react-router-dom";
import CreateEditIsolation from "./CreateNewIsolation";
import PatientOfIsolation from "./PatientOfIsolation";
import NotFound from "../../../pages/withAuth/not-found";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
import {
  animationOne,
  transition,
} from "../../../components/animations/animation";
import { motion } from "framer-motion";
import adminService from "../../../components/functions/services/admin-service";
const IsolationMainPage = (props) => {
  const dispatch = useDispatch();
  const [isolationData, setIsolationData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const { id } = useParams();
  let { path, url } = useRouteMatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setIsloading(true);
    if (props.admin) {
      adminService
        .getIsolationById(id)
        .then((response) => {
          setIsolationData(response.data.isolation);
          setIsloading(false);
        })
        .catch((error) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: error.message,
            })
          );
          setIsloading(false);
        });
    } else {
      hospitalService
        .getIsolationById(id, token)
        .then((response) => {
          setIsolationData(response.data.isolation);
          setIsloading(false);
        })
        .catch((error) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: error.message,
            })
          );
          setIsloading(false);
        });
    }
  }, []);
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  const updatePatientStatus = (b_id, status_id) => {
    if (props.admin) {
      adminService
        .updatePatientStatus(b_id, status_id, token)
        .then((response) => {
          dispatch(
            uiActions.setNoti({
              status: "success",
              title: response.data.status,
            })
          );
        })
        .catch((error) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: error.message,
            })
          );
        });
    } else {
      hospitalService
        .updatePatientStatus(id, b_id, status_id, token)
        .then((response) => {
          dispatch(
            uiActions.setNoti({
              status: "success",
              title: response.data.status,
            })
          );
        })
        .catch((error) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: error.message,
            })
          );
        });
    }
  };
  const refreshData = () => {
    setIsloading(true);
    if (props.admin) {
      adminService
        .getIsolationById(id)
        .then((response) => {
          setIsolationData(response.data.isolation);
          setIsloading(false);
        })
        .catch((error) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: error.message,
            })
          );
          setIsloading(false);
        });
    } else {
      hospitalService
        .getIsolationById(id, token)
        .then((response) => {
          setIsolationData(response.data.isolation);
          setIsloading(false);
        })
        .catch((error) => {
          dispatch(
            uiActions.setNoti({
              status: "error",
              title: error.message,
            })
          );
          setIsloading(false);
        });
    }
  };
  const updateStatusError = (error) => {
    dispatch(
      uiActions.setNoti({
        status: "error",
        title: error,
      })
    );
  };
  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Switch>
          <Route exact path={path}>
            {isLoading ? (
              <LoadingSpinner />
            ) : Object.keys(isolationData).length !== 0 ? (
              <motion.div
                initial="out"
                animate="in"
                variants={animationOne}
                transition={transition}
              >
                <div className="xl:flex xl:flex-wrap xl:overflow-hidden xl:pt-20">
                  <div className="xl:w-3/4 xl:flex-grow">
                    <ItemCard type="isolation-main-page">
                      <BackButton />
                      <h1 className="text-center text-2xl font-bold mb-2 lg:text-3xl">
                        {isolationData.community_isolation_name}
                      </h1>
                      <HospitalInformationCard
                        id={isolationData?.community_isolation_id}
                        community_isolation_name={
                          isolationData?.community_isolation_name
                        }
                        hospital_name={isolationData?.Hospital?.hospital_name}
                        available_bed={isolationData?.available_bed}
                        address={isolationData?.address}
                        bed_left={isolationData?.bed_left}
                        image_index={isolationData?.image_index}
                      />
                    </ItemCard>
                  </div>
                  <div className=" xl:w-1/4 xl:flex-none">
                    <Card>
                      <div className="flex flex-row justify-center space-x-2  xl:flex-col xl:space-x-0 xl:space-y-1">
                        <Link
                          to={`${url}/patient-list`}
                          className="bg-primary hover:bg-green-700 w-1/2 p-2 card shadow-lg compact lg:p-0 lg:w-full"
                        >
                          <div className="card-body text-primary-content text-center items-center">
                            <UserGroupIcon className="w-36 h-auto" />
                            <p className="text-xl">
                              ตรวจสอบ
                              <br />
                              รายชื่อผู้ป่วย
                            </p>
                          </div>
                        </Link>
                        <Link
                          to={`${url}/update`}
                          className="bg-primary hover:bg-green-700 w-1/2 p-2 card shadow-lg compact lg:p-0 lg:w-full"
                        >
                          <div className="card-body text-primary-content text-center items-center">
                            <PencilAltIcon className="w-36 h-auto" />
                            <p className="text-xl">
                              อัพเดตข้อมูล
                              <br />
                              ศูนย์พักคอย
                            </p>
                          </div>
                        </Link>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ) : (
              <NotFound />
            )}
          </Route>
          <Route path={`${url}/update`}>
            {Object.keys(isolationData).length !== 0 ? (
              <CreateEditIsolation
                isolationData={isolationData}
                edit={true}
                id={id}
                image_index={isolationData?.image_index}
                admin={true}
                refreshData={refreshData}
              />
            ) : (
              <NotFound />
            )}
          </Route>
          <Route path={`${url}/patient-list`}>
            <PatientOfIsolation
              admin={true}
              id={id}
              header={isolationData.community_isolation_name}
              updatePatientStatus={updatePatientStatus}
              updateStatusError={updateStatusError}
            />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};
export default IsolationMainPage;
