import Card from "../ui/Card";
const registerThree = (props) => {
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="fName" className="label">
          <span className="label-text">ชื่อจริง</span>
        </label>
        <input
          type="text"
          name="fName"
          id="fName"
          value={props.enteredFirstName}
          onChange={props.onChangeHandler}
          // onBlur={emailBlurHandler}
          placeholder="ชื่อจริง"
          className="input input-sm input-info"
        />
        <label htmlFor="lName" className="label">
          <span className="label-text">นามสกุล</span>
        </label>
        <input
          type="text"
          name="lName"
          id="lName"
          value={props.enteredLastName}
          onChange={props.onChangeHandler}
          // onBlur={emailBlurHandler}
          placeholder="นามสกุล"
          className="input input-sm input-info"
        />
      </div>
      <div className="flex flex-col justify-center pt-8">
        <button className="btn btn-link btn-md" onClick={props.nextStep}>
          ถัดไป
        </button>
        <button
          className="btn btn-link btn-md text-secondary-focus"
          onClick={props.prevStep}
        >
          ย้อนกลับ
        </button>
      </div>
    </Card>
  );
};
export default registerThree;
