import { Fragment } from "react";
import { useForm } from "react-hook-form";

const diff = function (obj1, obj2) {
  if (!obj2 || Object.prototype.toString.call(obj2) !== "[object Object]") {
    return obj1;
  }
  var diffs = {};
  var key;

  var compare = function (item1, item2, key) {
    var type1 = Object.prototype.toString.call(item1);
    var type2 = Object.prototype.toString.call(item2);

    if (type2 === "[object Undefined]") {
      diffs[key] = null;
      return;
    }

    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    if (type1 === "[object Object]") {
      var objDiff = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    if (type1 === "[object Function]") {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };

  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      compare(obj1[key], obj2[key], key);
    }
  }

  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  return diffs;
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
    const oldData = {
      address: props.userData.address,
      tel: props.userData.tel,
    };
    console.log(oldData);

    const newData = {
      address: data.address,
      tel: data.telNo,
    };
    console.log(newData);
    // newData.filter((data)=>)
    console.log(diff(oldData, newData));
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit(sumbitForm)}>
        <div className="form-control max-h-72 overflow-scroll space-y-2 p-1">
          <label className="label">
            <span className="label-text">ที่อยู่ปัจจุบัน</span>
          </label>
          <textarea
            {...register("address", { required: true, maxLength: 500 })}
            className="textarea h-36"
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
            className="input mx-1 input-sm"
          />
          <label className="label">
            <span className="label-text">รหัสผ่านใหม่</span>
          </label>
          <input
            {...register("password", {
              maxLength: 14,
            })}
            type="password"
            placeholder="ระบุรหัสผ่านใหม่ หากต้องการเปลี่ยนแปลง"
            className="input mx-1 input-sm"
          />
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
