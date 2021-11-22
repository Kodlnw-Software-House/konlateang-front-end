import { PencilAltIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userService from "../functions/services/user-service";

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const status = [
  { label: "Booking failed.", value: 1 },
  { label: "Booking successful! In progress.", value: 2 },
  { label: "Done!", value: 3 },
  { label: "In treatment.", value: 4 },
];

const calculateDate = (date) => {
  let birthDate = new Date(date);
  let difference = Date.now() - birthDate.getTime();
  let ageDate = new Date(difference);
  var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return calculatedAge;
};

const PatientData = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      gender:
        props.modalData.patient.gender === "M"
          ? "M"
          : props.modalData.patient.gender === "F"
          ? "F"
          : "O",
      fname: props.modalData.patient.fname,
      lname: props.modalData.patient.lname,
      citizen_id: props.modalData.patient.citizen_id,
      dob: props.modalData.patient.dob,
      tel: props.modalData.patient.tel,
      address: props.modalData.patient.address,
      age: props.modalData.patient.age,
    },
  });
  const enteredDOB = watch("dob");
  const data = props.modalData;
  const [isEdit, setIsEdit] = useState(false);
  const [patientStatus, setPatientStatus] = useState({
    value: props.admin ? null : data.status.status_id,
    label: props.admin ? null : data.status.status_name,
  });

  const date = new Date(data.create_at);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes] = [
    addZero(date.getHours()),
    addZero(date.getMinutes()),
  ];
  const realMonth = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ][month];

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    setPatientStatus({
      value: e.target.value,
      label: status[e.target.value - 1],
    });
  };
  const calcelEdit = () => {
    setPatientStatus({
      value: props.modalData.status.status_id,
      label: props.modalData.status.status_name,
    });
    toggleEdit();
  };
  const confirmUpdate = () => {
    if (
      props.modalData.status.status_id === 1 ||
      props.modalData.status.status_id === 3
    ) {
      props.dispatchUpdateStatusError(
        "ไม่สามารถแก้ไขสถานะการจองที่ล้มเหลวหรือรักษาสำเร็จแล้วได้"
      );
      return;
    } else if (
      parseInt(patientStatus.value) === props.modalData.status.status_id
    ) {
      toggleEdit();
      return;
    } else {
      toggleEdit();
      props.updatePatientStatus(data.booking_id, patientStatus.value);
    }
  };
  const collectData = (data) => {
    if (props.admin) {
      let obj = {};
      for (const [key, value] of Object.entries(data)) {
        if (dirtyFields[key]) {
          obj[key] = value;
        }
      }
      if (dirtyFields["dob"]) {
        obj.age = data.age;
      }
      props.pushForm(obj);
    }
  };

  useEffect(() => {
    setValue("age", calculateDate(enteredDOB), { shouldValidate: true });
  }, [enteredDOB, setValue]);

  const rowClass =
    "flex flex-col sm:flex-row justify-between items-center sm:items-start py-2 border-t border-gray-300 ";

  const leftClass =
    "w-full sm:w-1/3 font-medium text-primary text-center sm:text-left";
  const rightClass = "flex-1 text-left";

  const isConfirmBtn =
    patientStatus.value === props.modalData?.status?.status_id ? false : true;

  const fNameInputClasses = errors.fname
    ? "input  input-error text-warning"
    : "input  input-info";
  const lNameInputClasses = errors.lname
    ? "input  input-error text-warning"
    : "input  input-info";
  const cIdInputClasses = errors.citizen_id
    ? "input  input-error text-warning"
    : "input  input-info ";
  const dobInputClasses = errors.dob
    ? "input input-error text-warning"
    : "input input-info";
  const genderSelectClasses = errors.gender
    ? "select  select-error text-warning w-full  font-normal"
    : "select  select-info w-full  font-normal";
  const telNoInputClasses = errors.tel
    ? "input  input-error text-warning"
    : "input  input-info";
  const addressInputClasses = errors.address
    ? "textarea h-16 textarea-bordered textarea-error input-error text-warning "
    : "textarea h-16 textarea-bordered textarea-info";
  return (
    <div
      data-theme="hospitalTheme"
      className="w-full max-h-96 overflow-y-scroll md:max-h-full md:overflow-y-auto"
    >
      {!props.admin && (
        <div className="flex flex-col text-center md:flex-row md:items-baseline md:space-x-2">
          <h3 className="text-2xl font-semibold text-primary-focus">
            รหัสการจองที่ {data.booking_id}
          </h3>
          <h6 className="text-base font-medium">
            จองสำเร็จเมื่อ{" "}
            {`${day} ${realMonth} ${year} เวลา ${hour}:${minutes} นาที`}
          </h6>
        </div>
      )}
      <form
        className="form-control mt-4 mx-1"
        onSubmit={handleSubmit(collectData)}
      >
        <div className={rowClass}>
          <span className={leftClass}>รหัสประจำตัวผู้ป่วย</span>
          <span className={rightClass}>{data.patient.patient_id}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>เพศ</span>
          <select
            disabled={!props.admin}
            {...register("gender", { required: true })}
            className={rightClass + genderSelectClasses}
          >
            <option value="M">ชาย</option>
            <option value="F">หญิง</option>
            <option value="O">อื่นๆ</option>
          </select>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>ชื่อ-นามสกุล</span>
          <input
            type="text"
            placeholder="ชื่อจริง"
            disabled={!props.admin}
            className={rightClass + fNameInputClasses}
            {...register("fname", { required: true, maxLength: 45 })}
          />
          {errors.fname && (
            <label className="label">
              <span className="label-text text-error">
                {errors.fname.type === "required"
                  ? "ห้ามว่าง"
                  : "ต้องมีขนาดไม่เกิน 45 ตัวอักษร"}
              </span>
            </label>
          )}
          <input
            type="text"
            placeholder="นามสกุล"
            disabled={!props.admin}
            className={rightClass + lNameInputClasses}
            {...register("lname", { required: true, maxLength: 45 })}
          />
          {errors.lname && (
            <label className="label">
              <span className="label-text text-error">
                {errors.lname.type === "required"
                  ? "ห้ามว่าง"
                  : "ต้องมีขนาดไม่เกิน 45 ตัวอักษร"}
              </span>
            </label>
          )}
        </div>
        <div className={rowClass}>
          <span className={leftClass}>รหัสประจำตัวประชาชน</span>
          <input
            type="number"
            placeholder="เช่น 11123-45567-890"
            disabled={!props.admin}
            className={rightClass + cIdInputClasses}
            {...register("citizen_id", {
              required: true,
              validate: {
                checkLength: (value) => value.toString().length === 13,
                duplicateId: async (value) =>
                  await userService
                    .checkDuplicateId(value)
                    .then(() => {
                      return true;
                    })
                    .catch(() => {
                      return false;
                    }),
              },
            })}
          />
          {errors.citizen_id && (
            <label className="label">
              <span className="label-text text-error">
                {errors.citizen_id.type === "required"
                  ? "โปรดระบุเลขประจำตัวประชาชน 13 หลัก"
                  : errors.citizen_id.type === "duplicateId"
                  ? "บัตรประชาชนนี้มีในระบบแล้ว"
                  : "ต้องระบุให้ครบ 13 หลัก"}
              </span>
            </label>
          )}
        </div>
        <div className={rowClass}>
          <span className={leftClass}>อายุ/วันเดือนปีเกิด</span>
          <input
            disabled
            type="number"
            className={rightClass}
            {...register("age", {
              required: true,
              validate: (value) => value > 0,
            })}
          />
          <input
            type="date"
            disabled={!props.admin}
            className={rightClass + dobInputClasses}
            {...register("dob", { required: true })}
          />
          {errors.dob && (
            <label className="label">
              <span className="label-text text-error">ระบุวันเดือนปีเกิด</span>
            </label>
          )}
        </div>
        <div className={rowClass}>
          <span className={leftClass}>เบอร์โทรศัพท์</span>
          <input
            type="number"
            name="telNo"
            id="telNo"
            disabled={!props.admin}
            placeholder="+66 8X-XXXX-XXX"
            className={rightClass + telNoInputClasses}
            {...register("tel", {
              required: true,
              validate: (value) => value.toString().length === 10,
            })}
          />
          {errors.tel && (
            <label className="label">
              <span className="label-text text-error">
                โปรดตรวจสอบเบอร์อีกครั้ง
              </span>
            </label>
          )}
        </div>
        <div className={rowClass}>
          <span className={leftClass}>อีเมล</span>
          <span className={rightClass}>{data.patient.email}</span>
        </div>
        <div className={rowClass}>
          <span className={leftClass}>ที่อยู่ปัจจุบัน</span>
          <textarea
            disabled={!props.admin}
            className={rightClass + addressInputClasses}
            placeholder="ที่อยู่..."
            {...register("address", { required: true, maxLength: 500 })}
          />
          {errors.address && (
            <label className="label">
              <span className="label-text text-error">
                {errors.address.type === "required"
                  ? "ห้ามว่าง"
                  : "ความยาวไม่เกิน 500 ตัวอักษร"}
              </span>
            </label>
          )}
        </div>
        {props.admin && (
          <div className="flex flex-row justify-end space-x-4 my-2">
            <button
              onClick={props.closeModal}
              className="btn btn-md btn-secondary btn-outline"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={!isValid || !isDirty}
              className="btn btn-md btn-primary"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        )}
      </form>
      {!props.admin && (
        <div className={rowClass}>
          <span className={leftClass}>สถานะการจอง</span>
          <select
            disabled={!isEdit}
            value={patientStatus.value}
            onChange={handleChange}
            className="flex-1 text-center sm:text-left select-bordered my-2 sm:my-0"
          >
            {status.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <div className="space-x-1">
            {isEdit ? (
              <Fragment>
                <button
                  disabled={!isConfirmBtn}
                  onClick={() => confirmUpdate()}
                  className="btn btn-xs btn-primary"
                >
                  <CheckIcon className="w-6" />
                </button>
                <button
                  className="btn btn-xs btn-secondary"
                  onClick={() => calcelEdit()}
                >
                  <XIcon className="w-6" />
                </button>
              </Fragment>
            ) : (
              <button
                className="btn btn-xs btn-ghost"
                onClick={() => toggleEdit()}
              >
                <PencilAltIcon className="w-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PatientData;
