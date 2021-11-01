import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import { Fragment } from "react";
import { useEffect } from "react";
import hospitalService from "../../../components/functions/services/hospital-service";
import { useState } from "react";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { InformationCircleIcon } from "@heroicons/react/solid";
import Modal from "../../../components/ui/Modal";
import PatientData from "../../../components/PatientListPage/PatientDataModal";

const status = [
  { label: "Booking failed.", value: 1 },
  { label: "Booking successful! In progress.", value: 2 },
  { label: "Done!", value: 3 },
  { label: "In treatment.", value: 4 },
];

const PatientOfIsolation = (props) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("user");
    setIsLoading(true);
    hospitalService
      .getBookings(props.id, token)
      .then((response) => {
        setBookings(response.data.booking);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const modalHandler = () => {
    setIsModal((prev) => !prev);
  };
  const togglePatientEditModal = (id) => {
    let bookingFromId = bookings.find((e) => e.booking_id === id);
    setModalData(bookingFromId);
    modalHandler();
  };
  const updatePatientStatus = (b_id, status_id) => {
    props.updatePatientStatus(b_id, status_id);
    let bookingFromId = bookings.find((e) => e.booking_id === b_id);
    bookingFromId.status.status_id = status_id;
    bookingFromId.status.status_name = status[status_id - 1].label;
    modalHandler();
  };
  return (
    <Fragment>
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <PatientData
            modalData={modalData}
            updatePatientStatus={updatePatientStatus}
          />
        </Modal>
      )}
      <Card>
        <h1 className="text-center text-2xl font-bold">{props.header}</h1>
      </Card>
      <ItemCard type="isolation-main-page">
        {isLoading ? (
          <LoadingSpinner />
        ) : bookings.length !== 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>รหัสการจอง</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>เพศ</th>
                  <th>สถานะ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  return (
                    <tr key={index}>
                      <th>{(index += 1)}</th>
                      <th>{booking.booking_id}</th>
                      <td>{`${booking.patient.fname} ${booking.patient.lname}`}</td>
                      <th>
                        {booking.patient.gender === "M"
                          ? "ชาย"
                          : "F"
                          ? "หญิง"
                          : "ไม่ระบุ"}
                      </th>
                      <td>{booking.status.status_name}</td>
                      <td>
                        <InformationCircleIcon
                          className="w-6"
                          onClick={() => {
                            togglePatientEditModal(booking.booking_id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">ไม่พบข้อมูลผู้ป่วยในระบบ</div>
        )}
      </ItemCard>
    </Fragment>
  );
};
export default PatientOfIsolation;
