import { useLocation, useHistory } from "react-router";
import ItemCard from "../../components/ui/ItemCard";
import { HomeIcon } from "@heroicons/react/solid";
import ped from "../../assets/pedyim.jpg";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";
const HospitalInfo = (props) => {
  const [isModal, toggleModal] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const currentPath = location.pathname;

  const openModal = () => {
    toggleModal(true);
  };

  const modalHandler = () => {
    toggleModal(false);
  };

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [location]);

  const getBack = () => {
    history.goBack();
  };

  return (
    <div>
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <div className="h-40 flex flex-col justify-center space-y-2">
            <div>
              <p className="text-center text-2xl">
                ยืนยันการจองเตียงที่
                <br />
                โรงพยาบาลนครธน ?
              </p>
            </div>
            <div className="text-center space-x-4 pt-2">
              <button
                className="btn btn-outline btn-primary text-lg"
                onClick={modalHandler}
              >
                ยกเลิก
              </button>
              <button className="btn btn-primary text-lg">ยืนยัน</button>
            </div>
          </div>
        </Modal>
      )}
      <div className="mt-1">
        <button onClick={getBack} className="btn text-lg btn-ghost">
          &#8617; กลับสู่หน้าหลัก
        </button>
      </div>
      <ItemCard>
        <div className="mx-auto overflow-hidden bg-white rounded-lg">
          <div className="w-full carousel">
            <div id="item1" className="w-full carousel-item">
              <img
                alt="picture_1"
                src={ped}
                className="object-cover object-center w-full h-64"
              />
            </div>
            <div id="item2" className="w-full carousel-item">
              <img
                alt="picture_2"
                src={ped}
                className="object-cover object-center w-full h-64"
              />
            </div>
            <div id="item3" className="w-full carousel-item">
              <img
                alt="picture_3"
                src={ped}
                className="object-cover object-center w-full h-64"
              />
            </div>
          </div>
          <div className="flex justify-center w-full space-x-2 py-2">
            <a href={`${currentPath}#item1`} className="btn btn-sm btn-circle">
              1
            </a>
            <a href={`${currentPath}#item2`} className="btn btn-sm btn-circle">
              2
            </a>
            <a href={`${currentPath}#item3`} className="btn btn-sm btn-circle">
              3
            </a>
          </div>

          {/* Hospital Info */}
          <div className="flex items-center px-6 py-3 bg-gray-900">
            <HomeIcon
              className="w-6 h-6 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
            />
            <h1 className="mx-3 text-lg text-white">โรงพยาบาลนครธน</h1>
          </div>

          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              จำนวนเตียงคงเหลือ{" "}
              <span className="badge badge-outline badge-info badge-lg text-xl">
                85 เตียง
              </span>
            </h1>

            <p className="py-2 text-gray-700 ">
              เลขที่ 1 ซอยพระรามที่ 2 ซอย 56 แขวงแสมดำ บางขุนเทียน กรุงเทพฯ
              10150
            </p>
          </div>
          <div className="px-6 py-2">
            <button
              className="btn btn-success btn-block text-lg"
              onClick={openModal}
            >
              จองเตียงศูนย์พักคอย/โรงพยาบาลนี้
            </button>
          </div>
        </div>
      </ItemCard>
    </div>
  );
};
export default HospitalInfo;
