import { withRouter } from "react-router";
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
const Profile = (props) => {
  const dispatch = useDispatch();
  const [isEditData, toggleModal] = useState(false);
  const [isEditPicture, setIsEditPicture] = useState(false);
  const [userData, setUserData] = useState(props.userData);
  const [newImg, setNewImg] = useState({ preview: "", raw: "" });

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
  const uploadNewImg = () => {
    const data = new FormData();
    data.append("avatar", newImg.raw);
    userService
      .uploadNewPicture(data)
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
      })
      .finally(() => {
        toggleEditPicture();
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
          <EditPersonalData modalHandler={modalHandler} />
        </Modal>
      )}
      {isEditPicture && (
        <Modal
          type="DECISION"
          closeModal={toggleEditPicture}
          userData={userData}
        >
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
                src={
                  props.userData
                    ? `${process.env.REACT_APP_BACKEND_MAIN_URL}patient/avatar/${props.userData.patient_id}`
                    : default_profile
                }
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
              <PhotographIcon className="h-6 w-6 inline-block " /> Edit
            </button>
          </div>
          <div className="flex-1">
            <div
              tabIndex="0"
              className="collapse collapse-plus w-full hover:bg-gray-200 mb-2"
            >
              <div className="collapse-title text-xl font-medium">
                ข้อมูลส่วนตัว
              </div>
              <div className="collapse-content space-y-1">
                <p>{`อีเมล: ${userData?.email}`}</p>
                <p>{`ชื่อจริง-นามสกุล: ${userData?.fname} ${userData?.lname}`}</p>
                <p>{`อายุ: ${userData?.age} ปี`}</p>
                <p>{`เลขประจำตัวประชาชน: ${userData?.citizen_id}`}</p>
                <p>{`วันเดือนปีเกิด: ${userData?.dob}`}</p>
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
      <BookingHistory
        hospitalName="โรงพยาบาลนครธน"
        bookingDate="20 สิงหาคม 2564 เวลา 18.05"
        bookingStatus="จองสำเร็จรอดำเนินการ"
        pic={default_profile}
      />
    </div>
  );
};
export default withRouter(Profile);
