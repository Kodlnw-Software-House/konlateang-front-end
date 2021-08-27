import useInputValidation from "../hooks/use-input-validation";
import {
  emailValidate,
  passwordValidate,
} from "../components/functions/form-validation";
import Card from "../components/ui/Card";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useState } from "react";

const HospitalLogin = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    value: enteredEmail,
    inputChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    valueIsValid: enteredEmailIsValid,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInputValidation(emailValidate);
  const {
    value: enteredPass,
    inputChangeHandler: passChangeHandler,
    hasError: passHasError,
    valueIsValid: enteredPassIsValid,
    inputBlurHandler: passBlurHandler,
    reset: resetPass,
  } = useInputValidation(passwordValidate);

  const toggleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  let formIsValid = false;

  if (enteredPassIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    emailBlurHandler(true);
    passBlurHandler(true);

    if (!formIsValid) {
      console.log("This is Invalid Form");
      return;
    }

    resetEmail();
    resetPass();
  };
  const emailInputClass = emailHasError
    ? "input input-sm  input-error"
    : "input input-sm input-primary";
  const passInputClass = passHasError
    ? "w-full input input-sm  input-error"
    : "w-full input input-sm input-primary";
  const passwordVisible = isVisible ? "text" : "password";
  return (
    <div
      data-theme="hospitalTheme"
      className="bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100 flex flex-col justify-center space-y-3 min-h-screen px-6"
    >
      <Card>
        {/* Header */}
        <div className="border-b-4 border-primary leading-10">
          <span className="text-xl font-extrabold">
            เข้าสู่ระบบ คนละเตียง (สำหรับเจ้าหน้าที่)
          </span>
        </div>
        {/* Form */}
        <div>
          <form onSubmit={formSubmitHandler}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ชื่อผู้ใช้</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={enteredEmail}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                required
                placeholder="username"
                className={emailInputClass}
              />
              {emailHasError && (
                <label className="label">
                  <span className="label-text text-warning">
                    โปรดตรวจสอบอีเมล
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">รหัสผ่าน</span>
              </label>
              <div className="relative">
                <input
                  type={passwordVisible}
                  name="password"
                  id="password"
                  value={enteredPass}
                  onChange={passChangeHandler}
                  onBlur={passBlurHandler}
                  required
                  placeholder="password"
                  className={passInputClass}
                />
                <div
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={toggleVisible}
                >
                  {!isVisible ? (
                    <EyeIcon className="btn-sm btn-ghost w-10 rounded-l-none" />
                  ) : (
                    <EyeOffIcon className="btn-sm btn-ghost w-10 rounded-l-none" />
                  )}
                </div>
              </div>
              {passHasError && (
                <label className="label">
                  <span className="label-text text-warning">
                    โปรดตรวจสอบรหัสผ่าน
                  </span>
                </label>
              )}
            </div>

            {/* submit button */}
            <div className="pt-3">
              <button
                disabled={!formIsValid}
                type="submit"
                className="btn btn-primary btn-sm btn-block text-lg"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default HospitalLogin;
