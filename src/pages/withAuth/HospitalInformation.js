import { useLocation, useHistory, useParams } from "react-router";
import ItemCard from "../../components/ui/ItemCard";
import { HomeIcon } from "@heroicons/react/solid";
import default_image from "../../assets/bg_hospital.jpg";
import Modal from "../../components/ui/Modal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import userService from "../../components/functions/services/user-service";
import { useEffect, useState } from "react";
import isolationService from "../../components/functions/services/isolation-service";
import { useDispatch } from "react-redux";
import uiActions from "../../redux/ui-slice";
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
      })
      .finally(() => {
        setIsFetchData(false);
      });
  }, [id]);

  useEffect(() => {
    onTop();
  }, [location]);

  const currentPath = location.pathname;

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
        modalHandler(false);
        goToProfile();
      })
      .catch((error) => {
        console.log(error.response.data);
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
                  className="btn btn-warning text-lg"
                  onClick={modalHandler}
                >
                  ยกเลิก
                </button>
                <button className="btn btn-success text-lg" onClick={booking}>
                  ยืนยัน
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
      <div className="mt-1">
        <button onClick={getBack} className="btn text-lg btn-ghost">
          &#8617; กลับสู่หน้าหลัก
        </button>
      </div>
      <ItemCard>
        {isFetchData ? (
          <LoadingSpinner />
        ) : hospitalDetail ? (
          <div className="mx-auto overflow-hidden bg-white rounded-lg">
            <div className="w-full carousel">
              <div id="item1" className="w-full carousel-item">
                <img
                  alt="picture_1"
                  src={default_image}
                  className="object-cover object-center w-full h-64"
                />
              </div>
              <div id="item2" className="w-full carousel-item">
                <img
                  alt="picture_2"
                  src={default_image}
                  className="object-cover object-center w-full h-64"
                />
              </div>
              <div id="item3" className="w-full carousel-item">
                <img
                  alt="picture_3"
                  src={default_image}
                  className="object-cover object-center w-full h-64"
                />
              </div>
            </div>
            <div className="flex justify-center w-full space-x-2 py-2">
              <a
                href={`${currentPath}#item1`}
                className="btn btn-sm btn-circle"
              >
                1
              </a>
              <a
                href={`${currentPath}#item2`}
                className="btn btn-sm btn-circle"
              >
                2
              </a>
              <a
                href={`${currentPath}#item3`}
                className="btn btn-sm btn-circle"
              >
                3
              </a>
            </div>

            {/* Hospital Info */}
            <div className="flex items-center px-6 py-3 bg-gray-900">
              <HomeIcon
                className="w-6 h-6 text-white fill-current"
                xmlns="http://www.w3.org/2000/svg"
              />
              <h1 className="mx-3 text-lg text-white">
                {hospitalDetail?.community_isolation_name} <br />{" "}
                {hospitalDetail?.Hospital.hospital_name}
              </h1>
            </div>

            <div className="px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800">
                จำนวนเตียงคงเหลือ{" "}
                <span className="badge badge-outline badge-info badge-lg text-xl">
                  {hospitalDetail?.available_bed} เตียง
                </span>
              </h1>

              <p className="py-2 text-gray-700 ">{hospitalDetail?.address}</p>
            </div>
            <div className="px-6 py-2">
              <button
                className="btn btn-success btn-block text-base"
                onClick={openModal}
              >
                จองเตียงศูนย์พักคอย/โรงพยาบาลนี้
              </button>
            </div>
          </div>
        ) : (
          <div>ไม่พบข้อมูลศูนย์พักคอยที่ท่านต้องการ</div>
        )}
      </ItemCard>
    </div>
  );
};
export default HospitalInfo;
