import { withRouter } from "react-router";
import ItemCard from "../../components/ui/ItemCard";
import { PhotographIcon } from "@heroicons/react/outline";
import Modal from "../../components/ui/Modal";
import { useState } from "react";
const Profile = () => {
  const [isModal, toggleModal] = useState(false);

  const openModal = () => {
    toggleModal(true);
  };
  const modalHandler = () => {
    toggleModal(false);
  };
  return (
    <div>
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <div className="">
            <div class="form-control max-h-96 overflow-scroll">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input mx-1 input-sm"
              />
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input mx-1 input-sm"
              />
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input mx-1 input-sm"
              />
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input mx-1 input-sm"
              />
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input mx-1 input-sm"
              />
            </div>
            <div className="flex flex-row justify-end space-x-3 pt-4">
              <button
                className="btn btn-outline btn-accent btn-sm"
                onClick={modalHandler}
              >
                ยกเลิก
              </button>
              <button className="btn btn-primary btn-accent btn-sm">
                ยืนยันการแก้ไข
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* user information */}
      <ItemCard>
        <div className="flex flex-row justify-start space-x-3 min-h-16">
          <div>
            <div className="w-24 h-24">
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/500?img=32"
                alt="profile_pic"
              />
            </div>
            <button className="btn btn-sm btn-ghost btn-block text-secondary-focus">
              <PhotographIcon className="h-6 w-6 inline-block " /> Edit
            </button>
          </div>
          <div className="flex-1">
            <div tabindex="0" class="collapse collapse-plus w-full hover:bg-gray-200 mb-2">
              <div class="collapse-title text-xl font-medium">
                ข้อมูลส่วนตัว
              </div>
              <div class="collapse-content">
                <p>yinyin.domo@hotmail.com</p>
                <p>ณัชนนท์ มนต์ติกานนท์</p>
                <p>ณัชนนท์ มนต์ติกานนท์</p>
                <p>ณัชนนท์ มนต์ติกานนท์</p>
                <p>ณัชนนท์ มนต์ติกานนท์</p>
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
      <div className="m-4">
        <p className="text-xl">ประวัติการจองเตียง :</p>
      </div>
      <ItemCard>
        <div className="flex flex-row items-center space-x-3">
          <div className="avatar">
            <div className="rounded-box">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                alt="hospital_pic"
              />
            </div>
          </div>
          <div>
            <p className="text-xl">โรงพยาบาลนครธน</p>
            <p>วันที่ 20 สิงหาคม 2564 เวลา 18.05 น.</p>
            <p className="text-sm mt-2">
              สถานะ:{" "}
              <span className="badge-success badge-md rounded-badge p-1">
                จองสำเร็จรอดำเนินการ
              </span>
            </p>
          </div>
        </div>
      </ItemCard>
      <ItemCard>
        <div className="flex flex-row items-center space-x-3">
          <div className="avatar">
            <div className="rounded-box">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
                alt="hospital_pic"
              />
            </div>
          </div>
          <div>
            <p className="text-xl">โรงพยาบาลนครธน</p>
            <p>วันที่ 20 สิงหาคม 2564 เวลา 18.05 น.</p>
            <p className="text-sm mt-2">
              สถานะ:{" "}
              <span className="badge-success badge-md rounded-badge p-1">
                จองสำเร็จรอดำเนินการ
              </span>
            </p>
          </div>
        </div>
      </ItemCard>
    </div>
  );
};
export default withRouter(Profile);
