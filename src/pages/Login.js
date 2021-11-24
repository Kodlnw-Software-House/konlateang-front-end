import Card from "../components/ui/Card";
import { animationOne, transition } from "../components/animations/animation";
import { motion } from "framer-motion";
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
  adminLogin,
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
    mode: "onChange",
  });

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
        if (props.type === "PATIENT") {
          dispatch(uiActions.toggleTheme({ theme: "patientTheme" }));
        } else if (props.type === "HOSPITAL") {
          dispatch(uiActions.toggleTheme({ theme: "hospitalTheme" }));
        } else {
          dispatch(uiActions.toggleTheme({ theme: "adminTheme" }));
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
      if (props.type === "PATIENT") {
        dispatch(userLogin({ email: data.email, password: data.password }));
      } else if (props.type === "HOSPITAL") {
        dispatch(hospitalLogin({ email: data.email, password: data.password }));
      } else {
        dispatch(adminLogin({ email: data.email, password: data.password }));
      }
    }
  };
  const theme =
    props.type === "PATIENT"
      ? "patientTheme"
      : props.type === "HOSPITAL"
      ? "hospitalTheme"
      : "adminTheme";
  const emailInputClass = errors.email
    ? "input input-sm input-error md:h-12"
    : "input input-sm input-primary md:h-12";
  const passInputClass = errors.password
    ? "w-full input input-sm input-error md:h-12"
    : "w-full input input-sm input-primary md:h-12";
  const passwordVisible = isVisible ? "text" : "password";
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={animationOne}
      transition={transition}
    >
      <div
        data-theme={theme}
        className="hero flex flex-col justify-center space-y-3 min-h-screen px-6 bg-primary"
      >
        <div className="hero-content w-full flex-col lg:flex-row lg:space-x-16">
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="hidden text-center text-sky-50 lg:block lg:text-left">
              <h1 className="mb-5 text-5xl font-bold">คนละเตียง</h1>
              <p className="lg:text-2xl">ยินดีต้อนให้บริการคุณเสมอ</p>
            </div>
          </motion.div>
          <div className="flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <Card>
              {/* Header */}
              <div className="border-b-4 border-primary leading-10 ">
                <span className="text-xl font-extrabold text-center w-full">
                  เข้าสู่ระบบ คนละเตียง{" "}
                  {props.type === "PATIENT"
                    ? "(สำหรับผู้ป่วย)"
                    : props.type === "HOSPITAL"
                    ? "(สำหรับผู้ดูแลศูนย์ฯ)"
                    : "(สำหรับผู้ดูแลระบบ)"}
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
                {props.type === "PATIENT" ? (
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
                <Link
                  className="hover:text-accent-focus hover:underline"
                  to="/"
                >
                  กลับสู่หน้าแรก
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
