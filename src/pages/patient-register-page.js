import { useEffect, useState } from "react";
import RegisterOne from "../components/login/register-1";
import RegisterTwo from "../components/login/register-2";
import RegisterThree from "../components/login/register-3";
import RegisterFour from "../components/login/register-4-finish";
import Card from "../components/ui/Card";
import { useHistory } from "react-router";
import RenderButton from "../components/login/RegisterButton";
import { useForm } from "react-hook-form";
import ItemCard from "../components/ui/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../redux/ui-slice";
import { AuthSelecter, AuthAction, userRegister } from "../redux/auth-slice";
import { RefreshIcon } from "@heroicons/react/outline";

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
        })
      );
    }
  };

  let secondStepClass = step >= 2 ? "step step-accent" : "step";
  let thirdStepClass = step >= 3 ? "step step-accent" : "step";
  let finalStepClass = step >= 4 ? "step step-accent" : "step";

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100 flex flex-col justify-center space-y-3 min-h-screen">
      <Card>
        <div className="text-center my-4 mx-auto border-b-4 border-primary w-3/4">
          <p className="text-2xl">ลงทะเบียนผู้ป่วย คนละเตียง</p>
        </div>
        <ul className="w-full steps">
          <li className="step step-accent">บัญชี</li>
          <li className={secondStepClass}>ข้อมูลส่วนตัว</li>
          <li className={thirdStepClass}>ที่อยู่</li>
          <li className={finalStepClass}>ตรวจสอบ</li>
        </ul>
      </Card>
      <ItemCard>
        <form onSubmit={handleSubmit(collectData)}>
          {(() => {
            switch (step) {
              case 1:
                return (
                  <RegisterOne
                    goToLogin={goToLogin}
                    emailError={errors.Email}
                    passwordError={errors.Password}
                    register={register}
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
              <RefreshIcon className="w-10 h-10 animate-spin" />
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
      </ItemCard>
    </div>
  );
};

export default PatientRegister;
