import Card from "../components/ui/Card";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/ui-slice.js";
import {
  AuthAction,
  AuthSelecter,
  hospitalLogin,
  userLogin,
} from "../redux/auth-slice";
import { useForm } from "react-hook-form";
const Login = (props) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const { isSuccess, isError, errorMessage } = useSelector(AuthSelecter);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const isPatient = props.type === "PATIENT" ? true : false;
  const toggleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    let mounted = true;
    if (isSuccess) {
      if (mounted) {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "Login Successful",
          })
        );
        if (isPatient) {
          dispatch(uiActions.toggleTheme({ theme: "patientTheme" }));
        }
        if (!isPatient) {
          dispatch(uiActions.toggleTheme({ theme: "hospitalTheme" }));
        }
        dispatch(AuthAction.clearStatus());
        dispatch(AuthAction.userLoggedIn());
      }
    }
    if (isError) {
      if (mounted) {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: errorMessage,
          })
        );
        dispatch(AuthAction.clearStatus());
      }
      return function cleanup() {
        mounted = false;
      };
    }
  }, [isError, isSuccess, dispatch]);

  const formSubmitHandler = (data) => {
    if (isValid) {
      if (isPatient) {
        dispatch(userLogin({ email: data.email, password: data.password }));
      }
      if (!isPatient) {
        dispatch(hospitalLogin({ email: data.email, password: data.password }));
      }
    }
  };
  const theme = isPatient ? "patientTheme" : "hospitalTheme";
  const emailInputClass = errors.email
    ? "input input-sm input-error md:h-12"
    : "input input-sm input-primary md:h-12";
  const passInputClass = errors.password
    ? "w-full input input-sm input-error md:h-12"
    : "w-full input input-sm input-primary md:h-12";
  const passwordVisible = isVisible ? "text" : "password";
  return (
    <div
      data-theme={theme}
      class="hero flex flex-col justify-center space-y-3 min-h-screen px-6 bg-primary"
    >
      <div class="hero-content w-full flex-col lg:flex-row lg:space-x-16">
        <div class="hidden text-center text-sky-50 lg:block lg:text-left">
          <h1 class="mb-5 text-5xl font-bold">คนละเตียง</h1>
          <p class="lg:text-2xl">ยินดีต้อนให้บริการคุณเสมอ</p>
        </div>
        <div class="flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <Card>
            {/* Header */}
            <div className="border-b-4 border-primary leading-10 ">
              <span className="text-xl font-extrabold text-center w-full">
                เข้าสู่ระบบ คนละเตียง{" "}
                {isPatient ? "(สำหรับผู้ป่วย)" : "(สำหรับแอดมินศูนย์ฯ)"}
              </span>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">อีเมล</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  placeholder="username หรือ email"
                  className={emailInputClass}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text text-error">
                      {errors.email.type === "required"
                        ? "โปรดระบุอีเมล"
                        : "โปรดระบุอีเมลให้ถูกต้อง"}
                    </span>
                  </label>
                )}
                <label className="label">
                  <span className="label-text text-lg">รหัสผ่าน</span>
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible}
                    name="password"
                    id="password"
                    {...register("password", { required: true })}
                    required
                    placeholder="password"
                    className={passInputClass}
                  />
                  <div
                    className="absolute top-0 right-0 cursor-pointer"
                    onClick={toggleVisible}
                  >
                    {!isVisible ? (
                      <EyeOffIcon className="btn-sm btn-ghost w-10 rounded-l-none md:h-12" />
                    ) : (
                      <EyeIcon className="btn-sm btn-ghost w-10 rounded-l-none md:h-12" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text text-error">
                      โปรดตรวจสอบรหัสผ่าน
                    </span>
                  </label>
                )}
              </div>

              {/* submit button */}
              <div className="pt-3">
                <button
                  disabled={!isValid}
                  type="submit"
                  className="btn btn-primary btn-sm btn-block text-lg md:btn-lg md:text-xl"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
              {isPatient ? (
                <div className="border-2 border-primary-focus rounded-lg mt-3 p-2 lg:text-md">
                  <p className="text-center">
                    ยังไม่มีบัญชี?{" "}
                    <Link
                      className="text-primary font-semibold hover:text-accent-focus hover:underline"
                      to="/registration"
                    >
                      ลงทะเบียน
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="border-2 border-primary-focus rounded-lg mt-3 p-2 lg:text-md">
                  <p className="text-center">
                    ท่านเป็นผู้ป่วย?{" "}
                    <Link
                      className="text-primary font-semibold hover:text-accent-focus hover:underline"
                      to="/patient-login"
                    >
                      เข้าสู่ระบบผู้ป่วย
                    </Link>
                  </p>
                </div>
              )}
            </form>
            <div className="pt-4 text-center text-xl lg:text-right">
              <Link className="hover:text-accent-focus hover:underline" to="/">
                กลับสู่หน้าแรก
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
