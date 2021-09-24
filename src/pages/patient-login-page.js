import Card from "../components/ui/Card";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/ui-slice.js";
import { AuthAction, AuthSelecter, userLogin } from "../redux/auth-slice";
import { useForm } from "react-hook-form";
const PatientLogin = () => {
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
  }, [isError, isSuccess,dispatch]);

  const formSubmitHandler = (data) => {
    console.log("data", data);
    if (isValid) {
      dispatch(userLogin({ email: data.email, password: data.password }));
    }
  };

  const emailInputClass = errors.email
    ? "input input-sm input-error"
    : "input input-sm input-info";
  const passInputClass = errors.password
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
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
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
              <span className="label-text">รหัสผ่าน</span>
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
                  <EyeOffIcon className="btn-sm btn-ghost w-10 rounded-l-none" />
                ) : (
                  <EyeIcon className="btn-sm btn-ghost w-10 rounded-l-none" />
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
