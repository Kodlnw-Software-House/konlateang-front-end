import { useForm } from "react-hook-form";
import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import { Fragment } from "react";

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

  const sumbitForm = (data) => {
    let editData = {};

    const oldData = {
      community_isolation_name: props.isolationData?.community_isolation_name,
      address: props.isolationData?.address,
      // bed: props.isolationData?.available_bed,
    };
    const newData = {
      community_isolation_name: data.name,
      address: data.address,
      // bed: data.available_bed,
    };
    if (compareObj(oldData, newData)) {
      return;
    }
    if (
      oldData.address !== newData.address &&
      oldData.address.length !== newData.address.length
    ) {
      editData.address = newData.address;
    }
    if (oldData.community_isolation_name !== newData.community_isolation_name) {
      editData.community_isolation_name = newData.community_isolation_name;
    }
    // if (oldData.bed !== newData.bed) {
    //   editData.bed = newData.bed;
    // }
    props.updateIsolationData(editData);
  };

  const nameInputClasses = errors.name
    ? "input input-sm input-error text-warning"
    : "input input-sm input-primary";
  const bedInputClasses = errors.available_bed
    ? "input input-sm input-error text-warning"
    : "input input-sm input-primary";
  const addressInputClasses = errors.address
    ? "textarea h-24 textarea-bordered textarea-error input-error text-warning"
    : "textarea h-24 textarea-bordered textarea-primary";

  return (
    <Fragment>
      <Card>
        <h1 className="text-center text-2xl font-bold">
          {props.isolationData?.community_isolation_name
            ? props.isolationData?.community_isolation_name
            : "ลงทะเบียนศูนย์พักคอย"}
        </h1>
      </Card>
      <ItemCard>
        <form onSubmit={handleSubmit(sumbitForm)}>
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">ชื่อศูนย์พักคอย</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อศูนย์พักคอยของท่าน.."
              className={nameInputClasses}
              {...register("name")}
            />
            <label htmlFor="address" className="label">
              <span className="label-text">ที่อยู่ปัจจุบัน</span>
            </label>
            <textarea
              className={addressInputClasses}
              placeholder="ที่อยู่..."
              {...register("address")}
            />
            <label htmlFor="available_bed" className="label">
              <span className="label-text">จำนวนเตียงที่เปิดรับ</span>
            </label>
            <input
              type="number"
              placeholder="จำนวนเตียงที่เปิดรับ"
              className={bedInputClasses}
              {...register("available_bed")}
            />
          </div>
          <div className="flex flex-row justify-end space-x-3 pt-4">
            <button
              className="btn btn-accent"
              type="submit"
              disabled={!isValid}
            >
              บันทึก
            </button>
          </div>
        </form>
      </ItemCard>
    </Fragment>
  );
};

export default CreateEditIsolation;
