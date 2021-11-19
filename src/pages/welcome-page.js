import bed from "../assets/bed.png";
import Modal from "../components/ui/Modal";
import { useState } from "react";
import WelcomePagePopup from "../components/login/welcome-page-popup";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { animationOne, transition } from "../components/animations/animation";

const scrollToPart2 = () => {
  const part2 = document.getElementById("who-are-we");
  part2.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
const scrollToPart1 = () => {
  const part2 = document.getElementById("main");
  part2.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
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
    <div>
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <WelcomePagePopup
            goHospitalLogin={goHospitalLogin}
            goPatientLogin={goPatientLogin}
          />
        </Modal>
      )}
      <div
        id="main"
        className="hero min-h-screen bg-cover"
        style={{
          backgroundImage: `url(https://source.unsplash.com/1600x900/?hospital)`,
        }}
      >
        <div className="hero-overlay bg-opacity-90"></div>
        <motion.div
          initial="out"
          animate="in"
          variants={animationOne}
          transition={transition}
        >
          <div className="text-center hero-content flex-col">
            <div>
              <div className="max-w-lg mb-6">
                <img
                  alt="bed-logo"
                  src={bed}
                  className="mx-auto w-8/12 h-full"
                ></img>
              </div>
              <p className="m-1 text-2xl text-primary-content">
                ยินดีต้อนรับเข้าสู่เว็บไซต์
              </p>
              <p className="m-2 text-7xl font-extrabold text-sky-400 tracking-wide">
                คนละเตียง
              </p>
            </div>
            <div className="flex flex-row w-full justify-evenly items-center lg:flex-col-reverse lg:space-x-0 ">
              <button
                className="my-2 btn btn-outline btn-secondary w-32 text-xl lg:btn-block"
                onClick={openModal}
              >
                เข้าสู่ระบบ
              </button>
              <Link
                to="/registration"
                className="my-2 btn btn-primary w-32 text-xl lg:btn-block"
              >
                ลงทะเบียน
              </Link>
            </div>
            <div className="mt-14  w-full">
              <button
                className="btn btn-ghost text-2xl text-sky-500 hover:text-sky-50 md:text-2xl"
                onClick={scrollToPart2}
              >
                เราคือใคร...?
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <div
        id="who-are-we"
        className="hero min-h-screen bg-cover"
        style={{
          backgroundImage: `url(https://source.unsplash.com/1600x900/?teamwork,coding)`,
        }}
      >
        <div className="hero-overlay bg-opacity-90"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-xl lg:text-left md:max-w-2xl lg:max-w-4xl">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <h1 className="mb-5 text-5xl font-bold text-sky-400 lg:text-7xl lg:mb-10">
                คนละเตียง
              </h1>
              <p className="text-xl lg:text-3xl">
                {" "}
                เว็บแอพพลิเคชั่น สำหรับช่วยเหลือผู้ป่วยติดเชื้อ Covid-19
                ในการลงทะเบียนจองเตียงจากศูนย์พักคอยที่เปิดรับ
                เพื่อให้ผู้ป่วยที่รักษาตนเองอยู่ที่บ้าน
                ลดความเสี่ยงในการแพร่กระจายเชื้อ
                และช่วยบรรเทาอาการผู้ป่วยที่รุนแรงให้ถึงมือแพทย์ไวที่สุด
              </p>
              <p className="my-2 text-4xl lg:my-10 text-center lg:hidden">⚬</p>
              <p className="mb-5 text-lg lg:text-right lg:text-xl">
                " สื่อกลางระหว่างผู้ป่วยและศูนย์พักคอย <br /> อย่างแท้จริง. "
              </p>
            </motion.button>
            <p className="hidden text-2xl lg:my-10 text-center lg:block">⚬</p>
            <button
              onClick={scrollToPart1}
              className="btn btn-outline text-primary-content btn-lg text-base lg:btn-block lg:text-2xl lg:h-20"
            >
              ลงทะเบียนตอนนี้เพื่อหาเตียงกับเรา
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
