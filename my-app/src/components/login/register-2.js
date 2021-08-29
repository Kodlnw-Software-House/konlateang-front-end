import Card from "../ui/Card";
const registerTwo = (props) => {
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="pass" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="text"
          name="pass"
          id="pass"
          value={props.enteredPass}
          onChange={props.passChangeHandler}
          // onBlur={emailBlurHandler}
          placeholder="password"
          className="input input-sm input-info"
        />
        {/* {emailHasError && (
      <label className="label">
        <span className="label-text text-warning">โปรดตรวจสอบอีเมล</span>
      </label>
    )} */}
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
export default registerTwo;
