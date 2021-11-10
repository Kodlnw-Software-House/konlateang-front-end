import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import { Fragment } from "react";
import { useEffect } from "react";
import hospitalService from "../../../components/functions/services/hospital-service";
import { useState } from "react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Modal from "../../../components/ui/Modal";
import PatientData from "../../../components/PatientListPage/PatientData";
import BackButton from "../../../components/ui/BackButton";
import Pagination from "../../../components/ui/Pagination";
import { motion } from "framer-motion";
import { animationOne } from "../../../components/animations/animation";

const status = [
  { label: "Booking failed.", value: 1 },
  { label: "Booking successful! In progress.", value: 2 },
  { label: "Done!", value: 3 },
  { label: "In treatment.", value: 4 },
];

const PatientOfIsolation = (props) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [page, setPage] = useState({ pagSize: 10, pageNo: 1 });
  let items = [];
  for (
    let i = 1;
    i <=
    (bookings.totalPage === 1
      ? 1
      : bookings.totalPage === 0
      ? 1
      : bookings.totalPage);
    i++
  ) {
    items.push(
      <div
        key={i}
        className={
          page.pageNo === i
            ? "btn btn-sm btn-ghost btn-primary btn-active md:btn-md"
            : "btn btn-sm btn-ghost btn-primary md:btn-md"
        }
        onClick={() => {
          if (page.pageNo !== i) {
            setPage((prev) => ({
              ...prev,
              pageNo: i,
            }));
          }
        }}
      >
        {i}
      </div>
    );
  }

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoading(true);
    hospitalService
      .getBookings(props.id, page.pageNo, page.pagSize, token)
      .then((response) => {
        setBookings(response.data.booking);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const modalHandler = () => {
    setIsModal((prev) => !prev);
  };
  const togglePatientEditModal = (id) => {
    let bookingFromId = bookings.rows.find((e) => e.booking_id === id);
    setModalData(bookingFromId);
    modalHandler();
  };
  const updatePatientStatus = (b_id, status_id) => {
    props.updatePatientStatus(b_id, status_id);
    let bookingFromId = bookings.rows.find((e) => e.booking_id === b_id);
    bookingFromId.status.status_id = status_id;
    bookingFromId.status.status_name = status[status_id - 1].label;
    modalHandler();
  };
  const nextPage = () => {
    if (page.pageNo < bookings.totalPage) {
      setPage((prev) => ({
        ...prev,
        pageNo: prev.pageNo + 1,
      }));
    }
  };
  const prevPage = () => {
    if (page.pageNo > 1) {
      setPage((prev) => ({
        ...prev,
        pageNo: prev.pageNo - 1,
      }));
    }
  };
  const dispatchUpdateStatusError = (error) => {
    props.updateStatusError(error);
  };
  return (
    <Fragment>
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <PatientData
            modalData={modalData}
            updatePatientStatus={updatePatientStatus}
            dispatchUpdateStatusError={dispatchUpdateStatusError}
          />
        </Modal>
      )}
      <Card>
        <h1 className="text-center text-2xl font-bold">{props.header}</h1>
      </Card>
      <ItemCard type="isolation-main-page">
        {isLoading ? (
          <LoadingSpinner />
        ) : bookings.rows.length !== 0 ? (
          <div className="overflow-x-auto">
            <BackButton />
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>รหัสการจอง</th>
                  <th>รหัสผู้ป่วย</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>เพศ</th>
                  <th>จองเมื่อ</th>
                  <th>สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <motion.tbody
                initial="out"
                animate="in"
                variants={animationOne}
                transition={{ duration: 0.2 }}
              >
                {bookings.rows.map((booking, index) => {
                  const date = new Date(Date.parse(booking.create_at));
                  return (
                    <tr key={index}>
                      <td>{(index += 1)}</td>
                      <td>{booking.booking_id}</td>
                      <td>{booking.patient.patient_id}</td>
                      <td>{`${booking.patient.fname} ${booking.patient.lname}`}</td>
                      <td>
                        {booking.patient.gender === "M"
                          ? "ชาย"
                          : "F"
                          ? "หญิง"
                          : "ไม่ระบุ"}
                      </td>
                      <td>{`${date.getUTCDate()}/${
                        date.getUTCMonth() + 1
                      }/${date.getUTCFullYear()}`}</td>
                      <td>{booking.status.status_name}</td>
                      <td>
                        <InformationCircleIcon
                          className="w-6 cursor-pointer"
                          onClick={() => {
                            togglePatientEditModal(booking.booking_id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>
        ) : (
          <div>
            <BackButton />
            <div className="text-center">ไม่พบข้อมูลผู้ป่วยในระบบ</div>
          </div>
        )}
      </ItemCard>
      {!isLoading && bookings.rows.length !== 0 && (
        <div className="mb-4 mt-2 mx-auto">
          <Pagination item={items} prevPage={prevPage} nextPage={nextPage} />
        </div>
      )}
    </Fragment>
  );
};
export default PatientOfIsolation;
