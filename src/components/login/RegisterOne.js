import userService from "../functions/services/user-service";
import Card from "../ui/Card";

const RegisterOne = (props) => {
  const emailInputClasses = props.emailError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info md:h-12";
  const passInputClasses = props.passwordError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info md:h-12";
  const passRepeatInputClasses = props.repeatPassError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info md:h-12";
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text text-xl">อีเมล</span>
        </label>
        <input
          type="email"
          placeholder="โปรดระบุอีเมล"
          className={emailInputClasses}
          {...props.register("Email", {
            required: true,
            pattern: /^\S+@\S+$/i,
            maxLength: 45,
            validate: {
              duplicateEmail: async (value) =>
                await userService
                  .checkDuplicateEmail(value)
                  .then(() => {
                    return true;
                  })
                  .catch(() => {
                    return false;
                  }),
            },
          })}
        />
        {props.emailError && (
          <label className="label">
            <span className="label-text text-error">
              {props.emailError.type === "required"
                ? "โปรดระบุอีเมล"
                : props.emailError.type === "duplicateEmail"
                ? "อีเมลล์นี้มีในระบบแล้ว"
                : "อีเมลล์ต้องมีขนาดไม่เกิน 45 ตัวอักษร"}
            </span>
          </label>
        )}
        <label htmlFor="password" className="label">
          <span className="label-text text-xl">รหัสผ่าน</span>
        </label>
        <input
          type="text"
          placeholder="รหัสผ่านต้องมีความยาว 7-14 ตัวอักษร"
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
        <label htmlFor="password" className="label">
          <span className="label-text text-xl">รหัสผ่าน (อีกครั้ง)</span>
        </label>
        <input
          type="text"
          placeholder="รหัสผ่านต้องเหมือนกับด้านบน"
          className={passRepeatInputClasses}
          {...props.register("Password_Repeat", {
            required: "กรุณาระบุรหัสผ่านที่ตรงกัน",
            validate: {
              matchesPreviousPassword: (value) => {
                const { Password } = props.getValues();
                return (
                  Password === value || "รหัสผ่านไม่ตรงกัน โปรดตรวจสอบอีกครั้ง"
                );
              },
            },
          })}
        />
        {props.repeatPassError && (
          <label className="label">
            <span className="label-text text-error">
              {props.repeatPassError.type === "required"
                ? "โปรดระบุรหัสผ่าน"
                : "รหัสผ่านไม่ตรงกัน โปรดตรวจสอบอีกครั้ง"}
            </span>
          </label>
        )}
      </div>
    </Card>
  );
};
export default RegisterOne;
