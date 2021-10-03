import { Fragment } from "react";
import { useForm } from "react-hook-form";

const compareObj = (o1, o2) => {
  for (let p in o1) {
    if (o1.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  for (let p in o2) {
    if (o2.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  return true;
};
const EditPersonalData = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      address: props.userData.address,
      telNo: props.userData.tel ? props.userData.tel : "0",
    },
  });
  const sumbitForm = (data) => {
    let editData = {};

    const oldData = {
      address: props.userData.address,
      tel: props.userData.tel,
    };
    const newData = {
      address: data.address,
      tel: data.telNo,
    };
    if (compareObj(oldData, newData)) {
      props.modalHandler();
      return;
    }
    if (
      oldData.address !== newData.address &&
      oldData.address.length !== newData.address.length
    ) {
      editData.address = newData.address;
    }
    if (oldData.tel !== newData.tel) {
      editData.tel = newData.tel;
    }
    console.log("PUT data", editData);
    props.editUserData(editData);
  };

  const addressInputClasses = errors.address
    ? "textarea textarea-error h-36"
    : "textarea textarea-info h-36";
  const telInputClasses = errors.telNo
    ? "input input-error mx-1 input-sm"
    : "input input-info mx-1 input-sm";
  return (
    <Fragment>
      <form onSubmit={handleSubmit(sumbitForm)}>
        <div className="form-control max-h-72 overflow-scroll p-1">
          <label className="label">
            <span className="label-text">ที่อยู่ปัจจุบัน</span>
          </label>
          <textarea
            {...register("address", { required: true, maxLength: 500 })}
            className={addressInputClasses}
            placeholder="ระบุที่อยู่ ณ ปัจจุบัน"
          />
          <label className="label">
            <span className="label-text">เบอร์โทรศัพท์</span>
          </label>
          <input
            {...register("telNo", {
              required: true,
              validate: (value) => value.toString().length === 10,
            })}
            type="number"
            placeholder="username"
            className={telInputClasses}
          />
          {/* <label className="label">
            <span className="label-text">รหัสผ่านใหม่</span>
          </label>
          <input
            {...register("password", {
              maxLength: 14,
            })}
            type="password"
            placeholder="ระบุรหัสผ่านใหม่ หากต้องการเปลี่ยนแปลง"
            className="input mx-1 input-sm"
          /> */}
        </div>
        <div className="flex flex-row justify-end space-x-3 pt-4">
          <button
            className="btn btn-outline btn-accent"
            onClick={props.modalHandler}
          >
            ยกเลิก
          </button>
          <button className="btn btn-accent" type="submit" disabled={!isValid}>
            บันทึก
          </button>
        </div>
      </form>
    </Fragment>
  );
};
export default EditPersonalData;
