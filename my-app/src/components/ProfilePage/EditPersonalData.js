import { Fragment } from "react";
const EditPersonalData = (props) => {
  return (
    <Fragment>
      <div className="form-control max-h-96 overflow-scroll">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="username"
          className="input mx-1 input-sm"
        />
        <label className="label">
          <span className="label-text">Username</span>
        </label>
      </div>
      <div className="flex flex-row justify-end space-x-3 pt-4">
        <button
          className="btn btn-outline btn-accent btn-sm"
          onClick={props.modalHandler}
        >
          ยกเลิก
        </button>
        <button className="btn btn-primary btn-accent btn-sm">
          ยืนยันการแก้ไข
        </button>
      </div>
    </Fragment>
  );
};
export default EditPersonalData;
