import Card from "../components/ui/Card";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { uiActions } from "../redux/ui-slice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const HospitalLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const dispatch = useDispatch();
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

  const formSubmitHandler = (data) => {
    console.log("data", data);
    // if (isValid) {
    //   dispatch(userLogin({ email: data.email, password: data.password }));
    // }
  };

  const emailInputClass = errors.email
    ? "input  input-sm input-error"
    : "input input-primary input-sm";
  const passInputClass = errors.password
    ? "w-full input input-sm input-error"
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
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ชื่อผู้ใช้</span>
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
            <div className="mt-3 p-2">
              <p className="text-center">
                <Link
                  className="text-info font-semibold hover:text-accent-focus hover:underline"
                  to="/"
                >
                  กลับหน้าหลัก
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default HospitalLogin;
