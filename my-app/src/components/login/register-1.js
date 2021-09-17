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
            maxLength: 45,
          })}
        />
        {props.emailError && (
          <label className="label">
            <span className="label-text text-error">
              {props.emailError.type === "required"
                ? "โปรดระบุอีเมล"
                : "อีเมลล์ต้องมีขนาดไม่เกิน 45 ตัวอักษร"}
            </span>
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
            minLength: 7,
            maxLength: 14,
          })}
        />
        {props.passwordError && (
          <label className="label">
            <span className="label-text text-error">
              {props.passwordError.type === "required"
                ? "โปรดระบุรหัสผ่าน"
                : props.passwordError.type === "minLength"
                ? "รหัสผ่านต้องมีความยาวอย่างน้อย 7 ตัวอักษร"
                : "รหัสผ่านต้องมีความยาวไม่เกิน 14 ตัวอักษร"}
            </span>
          </label>
        )}
      </div>
    </Card>
  );
};
export default RegisterOne;
