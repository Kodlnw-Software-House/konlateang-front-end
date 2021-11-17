import Modal from "../../../components/ui/Modal";
import PatientData from "../../../components/PatientListPage/PatientData";
import { Fragment, useEffect, useState } from "react";
import Pagination from "../../../components/ui/Pagination";
import adminService from "../../../components/functions/services/admin-service";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import AdminPatientTable from "../../../components/PatientListPage/AdminPatientTable";

const bookings = [
  {
    booking_id: 9,
    create_at: "2021-11-03T16:10:32.000Z",
    patient: {
      patient_id: 1,
      email: "test1@example.com",
      citizen_id: 1234567890123,
      fname: "Saifon",
      lname: "Kullyakool",
      age: 19,
      dob: "2000-10-30",
      address:
        "106/29 หมู่ 1 ถนนวุฒากาศ แขวงจอมทอง เขตจอมทอง กรุงเทพมหานคร 10150",
      tel: "0806849632",
      gender: "F",
    },
    status: {
      status_id: 1,
      status_name: "Booking failed.",
    },
  },
  {
    booking_id: 10,
    create_at: "2021-11-03T16:10:32.000Z",
    patient: {
      patient_id: 1,
      email: "test1@example.com",
      citizen_id: 1102170018970,
      fname: "Nachanon",
      lname: "Montikanon",
      age: 19,
      dob: "2008-04-20",
      address:
        "106/29 หมู่ 1 ถนนวุฒากาศ แขวงจอมทอง เขตจอมทอง กรุงเทพมหานคร 10150",
      tel: "0806849632",
      gender: "M",
    },
    status: {
      status_id: 2,
      status_name: "Booking successful! In progress.",
    },
  },
];
const status = [
  { label: "Booking failed.", value: 1 },
  { label: "Booking successful! In progress.", value: 2 },
  { label: "Done!", value: 3 },
  { label: "In treatment.", value: 4 },
];

const PatientTable = (props) => {
  const [isModal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [patientData, setPatientData] = useState({});
  const [orderAsc, setOrderAsc] = useState(true);
  const [page, setPage] = useState({
    pagSize: 10,
    pageNumber: 1,
    search: "",
    sortType: "ASC",
    sortBy: "patient_id",
  });
  let items = [];

  useEffect(() => {
    setIsLoading(true);
    adminService
      .getAllPatient(page.pagSize, page.pageNumber, page.sortType, page.sortBy)
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  if (!isLoading) {
    for (
      let i = 1;
      i <=
      (patientData.patient.totalPage <= 1 ? 1 : patientData.patient.totalPage);
      i++
    ) {
      items.push(
        <div
          key={i}
          className={
            page.pageNumber === i
              ? "btn btn-sm btn-ghost btn-primary btn-active md:btn-md"
              : "btn btn-sm btn-ghost btn-primary md:btn-md"
          }
          onClick={() => {
            if (page.pageNumber !== i) {
              setPage((prev) => ({
                ...prev,
                pageNumber: i,
              }));
            }
          }}
        >
          {i}
        </div>
      );
    }
  }
  const toggleOrder = () => {
    const state = orderAsc;
    setOrderAsc((prev) => !prev);
    if (state) {
      setPage({ ...page, sortType: "DESC" });
    } else {
      setPage({ ...page, sortType: "ASC" });
    }
  };
  const nextPage = () => {
    if (page.pageNumber < patientData.totalPage) {
      setPage((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
    }
  };
  const prevPage = () => {
    if (page.pageNumber > 1) {
      setPage((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber - 1,
      }));
    }
  };
  const setSort = (field) => {
    switch (field) {
      case "patient_id":
        setPage({ ...page, sortBy: "patient_id" });
        break;
      case "fname":
        setPage({ ...page, sortBy: "fname" });
        break;
      case "gender":
        setPage({ ...page, sortBy: "gender" });
        break;
      case "age":
        setPage({ ...page, sortBy: "age" });
        break;
      case "email":
        setPage({ ...page, sortBy: "email" });
        break;
    }
  };
  const modalHandler = () => {
    setModal((prev) => !prev);
  };
  const togglePatientModal = (id) => {
    const data = patientData.patient.rows.find(
      (data) => data.patient_id === id
    );
    setModalData({ patient: data });
    modalHandler();
  };
  const dispatchUpdateStatusError = (err) => {
    props.displayStatusError(err);
  };
  const refreshData = () => {
    setIsLoading(true);
    adminService
      .getAllPatient(page.pagSize, page.pageNumber, page.sortType, page.sortBy)
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const pushForm = (data) => {
    const state = data;
    if (data.gender && data.gender === "O") {
      state.gender = null;
    }
    // console.log(state);
    adminService
      .updatePatientData(modalData.patient.patient_id, state)
      .then(() => {
        props.displayStatusSuccess("อัพเดทสถานะเรียบร้อย");
        modalHandler();
      })
      .catch((err) => {
        props.displayStatusError(err.message);
      })
      .finally(() => {
        refreshData();
      });
  };

  return (
    <div className="container mx-auto mt-16">
      {isModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <PatientData
            modalData={modalData}
            admin={true}
            closeModal={modalHandler}
            dispatchUpdateStatusError={dispatchUpdateStatusError}
            pushForm={pushForm}
          />
        </Modal>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : patientData.patient.count !== 0 ? (
        <Fragment>
          <div className="my-2">
            <button className="btn btn-sm btn-primary" onClick={toggleOrder}>
              Toggle {orderAsc ? "DESC" : "ASC"}
            </button>
          </div>
          <AdminPatientTable
            setSort={setSort}
            rows={patientData.patient.rows}
            togglePatientModal={togglePatientModal}
          />
        </Fragment>
      ) : (
        <div>
          <div className="text-2xl text-center">ไม่พบข้อมูลผู้ป่วยในระบบ</div>
        </div>
      )}
      {/* Pagination */}
      {!isLoading && (
        <div className="my-4">
          <Pagination item={items} prevPage={prevPage} nextPage={nextPage} />
        </div>
      )}
    </div>
  );
};
export default PatientTable;
