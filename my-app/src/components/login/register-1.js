import Card from "../ui/Card";

const RegisterOne = (props) => {
  const emailInputClasses = props.emailError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  const passInputClasses = props.passwordError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className={emailInputClasses}
          {...props.register("Email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {props.emailError && (
          <label className="label">
            <span className="label-text text-error">โปรดตรวจสอบอีเมล</span>
          </label>
        )}
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="text"
          placeholder="ระบุรหัสผ่าน"
          className={passInputClasses}
          {...props.register("Password", {
            required: true,
          })}
        />
        {props.passwordError && (
          <label className="label">
            <span className="label-text text-error">โปรดตรวจสอบรหัสผ่าน</span>
          </label>
        )}
      </div>
    </Card>
  );
};
export default RegisterOne;
