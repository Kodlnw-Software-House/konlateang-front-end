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
import { motion } from "framer-motion";
import {
  transition,
  animationOne,
} from "../../../components/animations/animation";
import BackButton from "../../../components/ui/BackButton";

const onTop = () => {
  window.scrollTo(0, 0);
};

const HospitalInfo = () => {
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
        setHospitalDetail(response.data.isolation);
      })
      .catch((error) => {
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
            title: error.response.data.error,
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
                <p className="text-center text-lg md:text-2xl">
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
          <motion.div
            initial="out"
            animate="in"
            variants={animationOne}
            transition={transition}
          >
            <BackButton main={true} />
            <HospitalInformationCard
              openModal={openModal}
              id={hospitalDetail.community_isolation_id}
              community_isolation_name={hospitalDetail.community_isolation_name}
              hospital_name={hospitalDetail.Hospital.hospital_name}
              available_bed={hospitalDetail.available_bed}
              address={hospitalDetail.address}
              image_index={hospitalDetail.image_index}
              bed_left={hospitalDetail.bed_left}
            />
          </motion.div>
        ) : (
          <NotFound />
        )}
      </ItemCard>
    </div>
  );
};
export default HospitalInfo;
