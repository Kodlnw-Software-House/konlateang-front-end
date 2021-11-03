import { useForm } from "react-hook-form";
import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
import hospitalService from "../../../components/functions/services/hospital-service";
import { useHistory } from "react-router";
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

const CreateEditIsolation = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: props.isolationData?.community_isolation_name,
      address: props.isolationData?.address,
      available_bed: props.isolationData?.available_bed,
    },
  });

  const updateIsolationData = (data) => {
    hospitalService
      .updateIsolationData(props.id, data, localStorage.getItem("user"))
      .then(() => {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "อัพเดทข้อมูลสำเร็จ",
          })
        );
        history.push("/");
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.message,
          })
        );
      });
  };
  const createIsolationData = (data) => {
    hospitalService
      .createNewIsolation(data, localStorage.getItem("user"))
      .then(() => {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "สร้างศูนย์พักคอยสำเร็จ",
          })
        );
        history.push("/");
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.message,
          })
        );
      });
  };

  const sumbitForm = (data) => {
    if (props.edit === true) {
      let editData = {};

      const oldData = {
        community_isolation_name: props.isolationData?.community_isolation_name,
        address: props.isolationData?.address,
        available_bed: props.isolationData?.available_bed,
      };
      const newData = {
        community_isolation_name: data.name,
        address: data.address,
        available_bed: data.available_bed,
      };
      if (compareObj(oldData, newData)) {
        history.goBack();
        return;
      }
      if (
        oldData.address !== newData.address &&
        oldData.address.length !== newData.address.length
      ) {
        editData.address = newData.address;
      }
      if (
        oldData.community_isolation_name !== newData.community_isolation_name
      ) {
        editData.community_isolation_name = newData.community_isolation_name;
      }
      if (oldData.available_bed !== newData.available_bed) {
        editData.available_bed = newData.available_bed;
      }
      updateIsolationData(editData);
      return;
    }

    const newData = {
      community_isolation_name: data.name,
      address: data.address,
      available_bed: data.available_bed,
    };

    createIsolationData(newData);
    return;
  };

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const nameInputClasses = errors.name
    ? "input input-sm input-error text-warning lg:h-12"
    : "input input-sm input-primary lg:h-12";
  const bedInputClasses = errors.available_bed
    ? "input input-sm input-error text-warning lg:h-12"
    : "input input-sm input-primary lg:h-12";
  const addressInputClasses = errors.address
    ? "textarea h-24 textarea-bordered textarea-error input-error text-warning lg:h-28"
    : "textarea h-24 textarea-bordered textarea-primary lg:h-28";

  return (
    <Fragment>
      <Card>
        <h1 className="text-center text-2xl font-bold lg:text-3xl">
          {props.isolationData?.community_isolation_name
            ? props.isolationData?.community_isolation_name
            : "ลงทะเบียนศูนย์พักคอย"}
        </h1>
      </Card>
      <ItemCard>
        <form
          onSubmit={handleSubmit(sumbitForm)}
          className="xl:w-3/5 xl:mx-auto"
        >
          <div className="form-control">
            <label htmlFor="name" className="label ">
              <span className="label-text text-xl">ชื่อศูนย์พักคอย</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อศูนย์พักคอยของท่าน.."
              className={nameInputClasses}
              maxLength="45"
              required
              {...register("name", { required: true, maxLength: 45 })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text text-error text-lg">
                  {errors.name.type === "required"
                    ? "โปรดระบุชื่อของศูนย์พักคอย"
                    : "ชื่อต้องมีความยาวไม่เกิน 45 ตัวอักษร"}
                </span>
              </label>
            )}
            <label htmlFor="address" className="label">
              <span className="label-text text-xl">ที่อยู่ปัจจุบัน</span>
            </label>
            <textarea
              className={addressInputClasses}
              placeholder="ที่อยู่..."
              maxLength="500"
              required
              {...register("address", { required: true, maxLength: 500 })}
            />
            {errors.address && (
              <label className="label">
                <span className="label-text text-error text-lg">
                  {errors.address.type === "required"
                    ? "โปรดระบุที่อยู่ศูนย์พักคอย"
                    : "ที่อยู่ต้องมีความยาวไม่เกิน 500 ตัวอักษร"}
                </span>
              </label>
            )}
            <label htmlFor="available_bed" className="label">
              <span className="label-text text-xl">จำนวนเตียงที่เปิดรับ</span>
            </label>
            <input
              type="number"
              placeholder="จำนวนเตียงที่เปิดรับ"
              className={bedInputClasses}
              required
              {...register("available_bed", { required: true })}
            />
            {errors.available_bed && (
              <label className="label">
                <span className="label-text text-error text-lg">
                  {errors.available_bed.type === "required" &&
                    "โปรดระบุจำนวนเตียงที่จะเปิดรับผู้ป่วย"}
                </span>
              </label>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <button
              className={
                props.edit
                  ? "btn btn-accent  md:btn-block md:btn-lg"
                  : "btn btn-primary md:btn-block md:btn-lg"
              }
              type="submit"
              disabled={!isValid}
            >
              {props.edit ? "บันทึก" : "สร้างศูนย์พักคอยใหม่"}
            </button>
          </div>
        </form>
      </ItemCard>
    </Fragment>
  );
};

export default CreateEditIsolation;
