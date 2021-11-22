import { withRouter } from "react-router";
import { useHistory } from "react-router";
import ItemCard from "../../../components/ui/ItemCard";
import Modal from "../../../components/ui/Modal";
import { useEffect, useState } from "react";
import BookingHistory from "../../../components/ProfilePage/BookingHistory";
import default_profile from "../../../assets/default_profile.png";
import userService from "../../../components/functions/services/user-service";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
import UploadImage from "../../../components/ProfilePage/UploadImage";
import {
  PhotographIcon,
  IdentificationIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import EditPersonalData from "../../../components/ProfilePage/EditPersonalData";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { AuthAction } from "../../../redux/auth-slice";
import { motion } from "framer-motion";
import {
  animationOne,
  transition,
} from "../../../components/animations/animation";
const Profile = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isEditData, toggleModal] = useState(false);
  const [isEditPicture, setIsEditPicture] = useState(false);
  const [userData, setUserData] = useState(props.userData);

  const [newImg, setNewImg] = useState({ preview: "", raw: "" });
  const [bookings, setBookings] = useState([]);
  const [isLoadBookings, setIsLoadBookings] = useState(false);

  useEffect(() => {
    setIsLoadBookings(true);
    userService
      .getBooking(localStorage.getItem("user"))
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.response.data.error,
          })
        );
        if (error.response.status === 401) {
          dispatch(AuthAction.userLogedOut());
        }
      })
      .finally(setIsLoadBookings(false));
  }, [dispatch]);

  useEffect(() => {
    setUserData(props.userData);
  }, [props.userData]);

  const openModal = () => {
    toggleModal(true);
  };
  const modalHandler = () => {
    toggleModal(false);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setNewImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    return;
  };
  const toggleEditPicture = () => {
    setIsEditPicture((prev) => !prev);
  };
  const dispatchPicture = () => {
    dispatch(AuthAction.updateUserPicture({ id: userData.patient_id }));
  };
  const refreshPicture = () => {
    setTimeout(dispatchPicture, 2000);
  };
  const uploadNewImg = () => {
    if (!newImg.raw) {
      cancelUploadFile();
      return;
    }
    const data = new FormData();
    data.append("avatar", newImg.raw);
    userService
      .uploadNewPicture(data, localStorage.getItem("user"))
      .then((res) => {})
      .then(() => {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "บันทึกรูปภาพเรียบร้อย",
          })
        );
        dispatch(AuthAction.updateUserPicture({ id: null }));
      })
      .then(() => {
        cancelUploadFile();
        refreshPicture();
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.response.data.error,
          })
        );
        cancelUploadFile();
      });
  };
  const cancelUploadFile = () => {
    setNewImg({ preview: "", raw: "" });
    toggleEditPicture();
  };
  const editUserData = (data) => {
    userService
      .editUserData(data, localStorage.getItem("user"))
      .then((response) => {
        dispatch(
          AuthAction.editUserData({ user: response.data.editedPatient })
        );
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "บันทึกข้อมูลสำเร็จ",
          })
        );
        toggleModal();
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.resposne.data.error,
          })
        );
        if (error.response.status === 401) {
          dispatch(AuthAction.userLogedOut());
        }
      });
  };
  return (
    <div>
      {isEditData && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <EditPersonalData
            editUserData={editUserData}
            modalHandler={modalHandler}
            userData={userData}
          />
        </Modal>
      )}
      {isEditPicture && (
        <Modal type="DECISION" closeModal={toggleEditPicture}>
          <UploadImage
            handleChange={handleChange}
            calcelUploadFile={cancelUploadFile}
            uploadFile={uploadNewImg}
            previewImg={newImg.preview}
          />
        </Modal>
      )}
      {/* user information */}
      <motion.div
        initial="out"
        animate="in"
        variants={animationOne}
        transition={transition}
      >
        <ItemCard>
          <div className="flex flex-col justify-center md:flex-row md:space-x-10">
            <div className="self-center">
              <div className="w-24 h-24 mx-auto md:w-36 md:h-36 xl:w-52 xl:h-52">
                <img
                  className="rounded-full h-auto w-full"
                  src={props.userPic ? props.userPic : default_profile}
                  alt="profile_pic"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = default_profile;
                  }}
                />
              </div>
              <button
                className="btn btn-md btn-ghost btn-block text-secondary-focus"
                onClick={toggleEditPicture}
              >
                <PhotographIcon className="h-6 w-6 inline-block " /> แก้ไข
              </button>
            </div>
            <div className="max-w-4xl overflow-hidden">
              <div className="flex items-center px-6 py-3 bg-primary">
                <IdentificationIcon className="w-10 text-primary-content" />
                <h1 className="mx-2 text-primary-content font-semibold text-sm md:text-2xl">
                  {`${
                    userData?.gender === "M"
                      ? "นาย"
                      : userData?.gender === "F"
                      ? "นางสาว"
                      : ""
                  } ${userData?.fname} ${userData?.lname}`}
                </h1>
              </div>
              <div className="py-4 px-6">
                <h1 className="text-base md:text-xl font-semibold text-gray-800">
                  {`เลขประจำตัวประชาชน ${userData?.citizen_id}`}
                </h1>
                <p className="py-2 text-base md:text-xl text-gray-700">{`${userData?.address}`}</p>
                <div className="flex items-center mt-4 text-gray-700">
                  <CalendarIcon className="w-7" />
                  <h1 className="px-2 text-base md:text-xl">{`${userData?.dob} (${userData?.age} ปี)`}</h1>
                </div>
                <div className="flex items-center mt-4 text-gray-700">
                  <PhoneIcon className="w-7" />
                  <h1 className="px-2 text-base md:text-xl">{`${userData?.tel}`}</h1>
                </div>
                <div className="flex items-center mt-4 text-gray-700">
                  <MailIcon className="w-7" />
                  <h1 className="px-2 text-base md:text-xl">{`${userData?.email}`}</h1>
                </div>
                <div className="flex justify-end items-center mt-2">
                  <button
                    onClick={openModal}
                    className="btn btn-primary btn-md"
                  >
                    แก้ไขข้อมูลส่วนตัว
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ItemCard>
      </motion.div>
      <div>
        <p className="text-base md:text-xl text-center">ประวัติการจองเตียง</p>
      </div>
      <motion.div
        initial="out"
        animate="in"
        variants={animationOne}
        transition={transition}
      >
        {isLoadBookings ? (
          <LoadingSpinner />
        ) : bookings.length === 0 ? (
          <ItemCard>
            <div className="text-center space-y-2">
              <div className="text-base md:text-xl">
                - ไม่พบประวัติการจองเตียง -
              </div>
              <div>
                <button
                  className="btn btn-md btn-success text-base"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  ค้นหาเตียงที่ยังว่าง
                </button>
              </div>
            </div>
          </ItemCard>
        ) : (
          bookings.map((item) => {
            return (
              <BookingHistory
                key={item.community_isolation_id}
                hospitalName={item.community_isolation.community_isolation_name}
                bookingDate={item.create_at}
                bookingStatus={item.status_id}
              />
            );
          })
        )}
      </motion.div>
    </div>
  );
};
export default withRouter(Profile);
