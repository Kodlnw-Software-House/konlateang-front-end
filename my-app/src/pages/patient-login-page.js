import useInputValidation from "../hooks/use-input-validation";
import {
  emailValidate,
  passwordValidate,
} from "../components/functions/form-validation";
import Card from "../components/ui/Card";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../redux/ui-slice.js";
import { AuthAction } from "../redux/auth-slice";
import { useForm } from "react-hook-form";

const PatientLogin = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit } = useForm();

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
    dispatch(
      uiActions.setNoti({
        status: "success",
        title: "Login Successful",
      })
    );
    dispatch(
      AuthAction.login({
        email: enteredEmail,
      })
    );
    resetEmail();
    resetPass();
  };
  const emailInputClass = emailHasError
    ? "input input-sm input-error"
    : "input input-sm input-info";
  const passInputClass = passHasError
    ? "w-full input input-sm input-error"
    : "w-full input input-sm input-info";
  const passwordVisible = isVisible ? "text" : "password";
  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100 flex flex-col justify-center space-y-3 min-h-screen px-6">
      <Card>
        {/* Header */}
        <div className="border-b-4 border-primary leading-10">
          <span className="text-xl font-extrabold">
            เข้าสู่ระบบ คนละเตียง (สำหรับผู้ป่วย)
          </span>
        </div>
        {/* Form */}
        <form onSubmit={formSubmitHandler}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
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
          <div className="border-2 border-secondary rounded-lg mt-3 p-2">
            <p className="text-center">
              ยังไม่มีบัญชี?{" "}
              <Link
                className="text-info font-semibold hover:text-accent-focus hover:underline"
                to="/registration"
              >
                ลงทะเบียน
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PatientLogin;
