import { withRouter } from "react-router";
import { useHistory } from "react-router";
import ItemCard from "../../components/ui/ItemCard";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";
import BookingHistory from "../../components/ProfilePage/BookingHistory";
import default_profile from "../../assets/default_profile.png";
import userService from "../../components/functions/services/user-service";
import { useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui-slice";
import UploadImage from "../../components/ProfilePage/UploadImage";
import { PhotographIcon } from "@heroicons/react/outline";
import EditPersonalData from "../../components/ProfilePage/EditPersonalData";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { AuthAction } from "../../redux/auth-slice";

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
        console.log(error.response.data);
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.response.data.error,
          })
        );
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
    setNewImg({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
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
    const data = new FormData();
    data.append("avatar", newImg.raw);
    userService
      .uploadNewPicture(data, localStorage.getItem("user"))
      .then((res) => {
        console.log(res.data);
      })
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
            title: error.response.data,
          })
        );
        cancelUploadFile();
      });
  };
  const cancelUploadFile = () => {
    setNewImg({ preview: "", raw: "" });
    toggleEditPicture();
  };
  return (
    <div>
      {isEditData && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <EditPersonalData modalHandler={modalHandler} userData={userData} />
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
      <ItemCard>
        <div className="flex flex-row justify-start space-x-3 min-h-16">
          <div>
            <div className="w-24 h-24">
              <img
                className="rounded-full"
                src={props.userPic ? props.userPic : default_profile}
                alt="profile_pic"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = default_profile;
                }}
              />
            </div>
            <button
              className="btn btn-sm btn-ghost btn-block text-secondary-focus"
              onClick={toggleEditPicture}
            >
              <PhotographIcon className="h-6 w-6 inline-block " /> แก้ไข
            </button>
          </div>
          <div className="flex-1">
            <div
              tabIndex="0"
              className="collapse collapse-arrow w-full hover:bg-gray-200 mb-2"
            >
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                ข้อมูลส่วนตัว
              </div>
              <div className="collapse-content space-y-1">
                <p>{`อีเมล: ${userData?.email}`}</p>
                <p>{`ชื่อจริง-นามสกุล: ${userData?.fname} ${userData?.lname}`}</p>
                <p>{`อายุ: ${userData?.age} ปี`}</p>
                <p>{`เพศ: ${
                  userData?.gender === "M"
                    ? "ชาย"
                    : userData?.gender === "F"
                    ? "หญิง"
                    : "ไม่ระบุ"
                }`}</p>
                <p>{`เลขประจำตัวประชาชน: ${userData?.citizen_id}`}</p>
                <p>{`วันเดือนปีเกิด: ${userData?.dob}`}</p>
                <p>{`เบอร์โทรศัพท์: ${userData?.tel}`}</p>
                <p>{`ที่อยู่ปัจจุบัน: ${userData?.address}`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button onClick={openModal} className="btn btn-primary btn-sm">
            แก้ไขข้อมูลส่วนตัว
          </button>
        </div>
      </ItemCard>
      <div className="m-4 p-1">
        <p className="text-xl">ประวัติการจองเตียง :</p>
      </div>
      {isLoadBookings ? (
        <LoadingSpinner />
      ) : bookings.length === 0 ? (
        <ItemCard>
          <div className="text-center space-y-4">
            <div className="text-xl">- ไม่พบประวัติการจองเตียง -</div>
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
              pic={default_profile}
            />
          );
        })
      )}
    </div>
  );
};
export default withRouter(Profile);
