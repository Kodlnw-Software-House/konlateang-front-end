import { useEffect, useState } from "react";
import RegisterOne from "../components/login/register-1";
import RegisterTwo from "../components/login/register-2";
import RegisterThree from "../components/login/register-3";
import RegisterFour from "../components/login/register-4-finish";
import Card from "../components/ui/Card";
import { useHistory } from "react-router";
import RenderButton from "../components/login/RegisterButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/ui-slice";
import { AuthSelecter, AuthAction, userRegister } from "../redux/auth-slice";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { motion } from "framer-motion";
import {
  animationOne,
  animationThree,
  animationTwo,
  transition,
} from "../components/animations/animation";

const calculateDate = (date) => {
  let birthDate = new Date(date);
  let difference = Date.now() - birthDate.getTime();
  let ageDate = new Date(difference);
  var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return calculatedAge;
};

const PatientRegister = () => {
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(AuthSelecter);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const [formData, setFormData] = useState({});
  const enteredDOB = watch("dob");
  const [step, setStep] = useState(1);

  useEffect(() => {
    let mounted = true;
    if (isSuccess) {
      if (mounted) {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "Register Successful",
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
  }, [isError, isSuccess, dispatch]);

  useEffect(() => {
    setValue("age", calculateDate(enteredDOB), { shouldValidate: true });
  }, [enteredDOB, setValue]);

  const goToLogin = () => {
    history.replace("/patient-login");
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const collectData = (data) => {
    setFormData(data);
  };

  const submitForm = () => {
    if (isValid) {
      dispatch(
        userRegister({
          email: formData.Email,
          password: formData.Password,
          citizen_id: formData.citizenId,
          fname: formData.fName,
          lname: formData.lName,
          age: formData.age,
          dob: formData.dob,
          address: formData.address,
          tel: formData.telNo,
          gender: formData.gender,
        })
      );
    }
  };

  let secondStepClass = step >= 2 ? "step step-accent" : "step";
  let thirdStepClass = step >= 3 ? "step step-accent" : "step";
  let finalStepClass = step >= 4 ? "step step-accent" : "step";

  return (
    <motion.div initial="out" animate="end" variants={animationThree}>
      <div className="hero flex flex-col justify-center space-y-3 min-h-screen px-6 bg-primary">
        <div className="hero-content w-full flex-col lg:space-y-4">
          <div className="hidden text-center text-sky-50 md:block">
            <h1 className="mb-5 text-4xl font-bold border-b-4 border-primary-content py-4">
              ลงทะเบียนผู้ป่วยคนละเตียง
            </h1>
          </div>
          <div className="flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
            <Card>
              <ul className="w-full steps">
                <li className="step step-accent">บัญชี</li>
                <li className={secondStepClass}>ข้อมูลส่วนตัว</li>
                <li className={thirdStepClass}>ที่อยู่</li>
                <li className={finalStepClass}>ตรวจสอบ</li>
              </ul>
            </Card>
            <form className="m-1" onSubmit={handleSubmit(collectData)}>
                {(() => {
                  switch (step) {
                    case 1:
                      return (
                        <RegisterOne
                          goToLogin={goToLogin}
                          emailError={errors.Email}
                          passwordError={errors.Password}
                          repeatPassError={errors.Password_Repeat}
                          register={register}
                          getValues={getValues}
                        />
                      );
                    case 2:
                      return (
                        <RegisterTwo
                          register={register}
                          citizenIdError={errors.citizenId}
                          fNameError={errors.fName}
                          lNameError={errors.lName}
                          dobError={errors.dob}
                          ageError={errors.age}
                        />
                      );
                    case 3:
                      return (
                        <RegisterThree
                          register={register}
                          addressError={errors.address}
                          telNoError={errors.telNo}
                          genderError={errors.gender}
                        />
                      );
                    case 4:
                      return <RegisterFour formData={formData} />;
                    default:
                  }
                })()}
              {isFetching ? (
                <div className="mx-auto">
                  <LoadingSpinner />
                </div>
              ) : (
                <RenderButton
                  nextStep={nextStep}
                  prevStep={prevStep}
                  step={step}
                  goToLogin={goToLogin}
                  isValid={isValid}
                  submitForm={submitForm}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientRegister;
