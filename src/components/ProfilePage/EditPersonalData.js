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
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
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

    props.editUserData(editData);
  };

  const addressInputClasses = errors.address
    ? "textarea textarea-error h-36 md:text-lg"
    : "textarea textarea-info h-36  md:text-lg";
  const telInputClasses = errors.telNo
    ? "input input-error mx-1 input-sm  md:text-lg"
    : "input input-info mx-1 input-sm  md:text-lg";
  return (
    <Fragment>
      <form onSubmit={handleSubmit(sumbitForm)}>
        <div className="form-control max-h-72 overflow-y-auto p-1">
          <label className="label">
            <span className="label-text md:text-xl">ที่อยู่ปัจจุบัน</span>
          </label>
          <textarea
            {...register("address", { required: true, maxLength: 500 })}
            className={addressInputClasses}
            placeholder="ระบุที่อยู่ ณ ปัจจุบัน"
          />
          {errors.address && (
            <label className="label">
              <span className="label-text text-error">
                {errors.address.type === "required"
                  ? "โปรดระบุที่อยู่ที่ต้องการแก้ไข"
                  : "ที่อยู่ต้องมีขนาดไม่เกิน 500 ตัวอักษร"}
              </span>
            </label>
          )}
          <label className="label">
            <span className="label-text md:text-xl">เบอร์โทรศัพท์</span>
          </label>
          <input
            {...register("telNo", {
              required: true,
              validate: (value) => value.toString().length === 10,
            })}
            type="number"
            placeholder="ex. 080XXXXXXX"
            className={telInputClasses}
          />
          {errors.telNo && (
            <label className="label">
              <span className="label-text text-error">
                {errors.telNo.type === "required"
                  ? "โปรดระบุเบอร์ที่ต้องการแก้ไข"
                  : "เบอร์ต้องอยู่ในรูปแบบที่ถูกต้อง"}
              </span>
            </label>
          )}
        </div>
        <div className="flex flex-row justify-end space-x-3 pt-4">
          <button
            className="btn btn-outline btn-accent md:btn-lg"
            onClick={props.modalHandler}
          >
            ยกเลิก
          </button>
          <button
            className="btn btn-accent md:btn-lg"
            type="submit"
            disabled={!isValid || !isDirty}
          >
            บันทึก
          </button>
        </div>
      </form>
    </Fragment>
  );
};
export default EditPersonalData;
