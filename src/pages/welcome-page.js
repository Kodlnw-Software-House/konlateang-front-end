import Card from "../components/ui/Card";
import bed from "../assets/bed.png";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import WelcomePagePopup from "../components/login/welcome-page-popup";
import { Link, useHistory } from "react-router-dom";

const WelcomePage = () => {
  const [isModal, toggleModal] = useState(false);
  const history = useHistory();

  const openModal = () => {
    toggleModal(true);
  };

  const modalHandler = () => {
    toggleModal(false);
  };

  const goPatientLogin = () => {
    history.push("/patient-login");
  };

  const goHospitalLogin = () => {
    history.push("/hospital-login");
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100 flex flex-col justify-around items-center min-h-screen">
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <WelcomePagePopup
            goHospitalLogin={goHospitalLogin}
            goPatientLogin={goPatientLogin}
          />
        </Modal>
      )}
      <Card>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img alt="bed-logo" src={bed} className="w-9/12 h-auto"></img>
          </div>
          <p className="m-1 text-xl text-primary-content">
            ยินดีต้อนรับเข้าสู่เว็บไซต์
          </p>
          <p className="m-1 text-7xl font-extrabold text-primary">คนละเตียง</p>
        </div>
      </Card>
      <div className="space-x-8">
        <Link
          to="/registration"
          className="btn btn-outline btn-primary w-32 text-xl md:btn-lg"
        >
          ลงทะเบียน
        </Link>
        <button
          className="btn btn-primary w-32 text-xl md:btn-lg"
          onClick={openModal}
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
