import Card from "../ui/Card";

const registerOne = (props) => {
  const goToLogin = () => {
    props.goToLogin();
  };
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={props.enteredEmail}
          onChange={props.emailChangeHandler}
          // onBlur={emailBlurHandler}
          placeholder="Email"
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
          onClick={goToLogin}
        >
          มีบัญชีอยู่แล้ว ? เข้าสู่ระบบ
        </button>
      </div>
    </Card>
  );
};
export default registerOne;
