import { useLocation, useHistory, useParams } from "react-router";
import ItemCard from "../../../components/ui/ItemCard";
import Modal from "../../../components/ui/Modal";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import userService from "../../../components/functions/services/user-service";
import { useEffect, useState } from "react";
import isolationService from "../../../components/functions/services/isolation-service";
import { useDispatch } from "react-redux";
import uiActions from "../../../redux/ui-slice";
import { AuthAction } from "../../../redux/auth-slice";
import HospitalInformationCard from "../../../components/MainPage/HospitalInformationCard";
import NotFound from "../not-found";
const onTop = () => {
  window.scrollTo(0, 0);
};

const HospitalInfo = (props) => {
  const dispatch = useDispatch();
  const [isModal, toggleModal] = useState(false);
  const [isFetchData, setIsFetchData] = useState(true);
  const [isFetchBooking, setIsFetchBooking] = useState(false);
  const [hospitalDetail, setHospitalDetail] = useState({});
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setIsFetchData(true);
    isolationService
      .getIsolationById(id, localStorage.getItem("user"))
      .then((response) => {
        console.log(response.data.isolation);
        setHospitalDetail(response.data.isolation);
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.status === 401) {
          dispatch(AuthAction.userLogedOut());
          return;
        }
      })
      .finally(() => {
        setIsFetchData(false);
      });
  }, [id, dispatch]);

  useEffect(() => {
    onTop();
  }, [location]);

  const openModal = () => {
    toggleModal(true);
  };

  const modalHandler = () => {
    toggleModal(false);
  };

  const getBack = () => {
    history.push("/");
  };
  const goToProfile = () => {
    setTimeout(() => {
      history.push("/kon-la-tieng/my-profile");
    }, 1000);
  };
  const booking = () => {
    setIsFetchBooking(true);
    userService
      .bookingIsolation(id, localStorage.getItem("user"))
      .then(() => {
        dispatch(
          uiActions.actions.setNoti({
            status: "success",
            title: "การจองเสร็จสิ้น",
          })
        );
        modalHandler();
        goToProfile();
      })
      .catch((error) => {
        modalHandler();
        dispatch(
          uiActions.actions.setNoti({
            status: "error",
            title: error.message,
          })
        );
        if (error.response.status === 401) {
          dispatch(AuthAction.userLogedOut());
          return;
        }
      })
      .finally(setIsFetchBooking(false));
  };

  return (
    <div>
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          {isFetchBooking ? (
            <LoadingSpinner />
          ) : (
            <div className="h-40 flex flex-col justify-center space-y-2">
              <div>
                <p className="text-center text-2xl">
                  ยืนยันการจองเตียงที่
                  <br />
                  {hospitalDetail?.community_isolation_name} ?
                </p>
              </div>
              <div className="text-center space-x-4 pt-2">
                <button
                  className="btn btn-warning text-lg md:btn-lg"
                  onClick={modalHandler}
                >
                  ยกเลิก
                </button>
                <button
                  className="btn btn-success text-lg md:btn-lg"
                  onClick={booking}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
      <ItemCard>
        {isFetchData ? (
          <LoadingSpinner />
        ) : Object.keys(hospitalDetail).length !== 0 ? (
          <HospitalInformationCard
            openModal={openModal}
            community_isolation_name={hospitalDetail.community_isolation_name}
            hospital_name={hospitalDetail.Hospital.hospital_name}
            available_bed={hospitalDetail.available_bed}
            address={hospitalDetail.address}
          />
        ) : (
          <NotFound></NotFound>
        )}
      </ItemCard>
      <div className="mt-1 text-center mx-auto">
        <button onClick={getBack} className="btn text-lg btn-ghost">
          &#8617; กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
};
export default HospitalInfo;
