import { Route, Switch, useParams } from "react-router";
import ItemCard from "../../../components/ui/ItemCard";
import HospitalInformationCard from "../../../components/MainPage/HospitalInformationCard";
import { useEffect, useState } from "react";
import hospitalService from "../../../components/functions/services/hospital-service";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Card from "../../../components/ui/Card";
import { Fragment } from "react";
import { UserGroupIcon, PencilAltIcon } from "@heroicons/react/outline";
import { Link, useRouteMatch } from "react-router-dom";
import CreateEditIsolation from "./CreateNewIsolation";
import PatientOfIsolation from "./PatientOfIsolation";
import NotFound from "../../../pages/withAuth/not-found";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
const IsolationMainPage = () => {
  const dispatch = useDispatch();
  const [isolationData, setIsolationData] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const { id } = useParams();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    setIsloading(true);
    hospitalService
      .getIsolationById(id, localStorage.getItem("user"))
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
  }, [id]);

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
              <ItemCard>
                <Card>
                  <h1 className="text-center text-2xl font-bold">
                    {isolationData.community_isolation_name}
                  </h1>
                </Card>
                <HospitalInformationCard
                  community_isolation_name={
                    isolationData?.community_isolation_name
                  }
                  hospital_name={isolationData?.Hospital?.hospital_name}
                  available_bed={isolationData?.available_bed}
                  address={isolationData?.address}
                />
              </ItemCard>
            ) : (
              <NotFound />
            )}
            {Object.keys(isolationData).length !== 0 && (
              <Card>
                <div className="flex flex-row justify-center space-x-2">
                  <Link
                    to={`${url}/patient-list`}
                    className="bg-primary w-1/2 p-2 card shadow-lg compact"
                  >
                    <div className="card-body text-white text-center items-center">
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
                    className="bg-primary w-1/2 p-2 card shadow-lg compact"
                  >
                    <div className="card-body text-white text-center items-center">
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
            )}
          </Route>
          <Route path={`${url}/update`}>
            {Object.keys(isolationData).length !== 0 ? (
              <CreateEditIsolation
                isolationData={isolationData}
                edit={true}
                id={id}
              />
            ) : (
              <NotFound />
            )}
          </Route>
          <Route path={`${url}/patient-list`}>
            <PatientOfIsolation />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};
export default IsolationMainPage;
