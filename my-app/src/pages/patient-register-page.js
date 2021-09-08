import { useEffect, useState } from "react";
import RegisterOne from "../components/login/register-1";
import RegisterTwo from "../components/login/register-2";
import RegisterThree from "../components/login/register-3";
import RegisterFour from "../components/login/register-4-finish";
import Card from "../components/ui/Card";
import { useHistory } from "react-router";
import RenderButton from "../components/login/RegisterButton";
import { useForm } from "react-hook-form";

const PatientRegister = () => {
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
  const enteredDOB = watch("dob");
  console.log(errors);
  const [step, setStep] = useState(1);

  const calculateDate = (date) => {
    let birthDate = new Date(date);
    let difference = Date.now() - birthDate.getTime();
    let ageDate = new Date(difference);
    var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return calculatedAge;
  };

  useEffect(() => {
    setValue("age", calculateDate(enteredDOB), { shouldValidate: true });
  }, [enteredDOB]);

  const goToLogin = () => {
    history.replace("/patient-login");
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  const nextStep = () => {
    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      return;
    }
  };

  const submitForm = (data) => {
    console.log(data);
  };

  let secondStepClass = step >= 2 ? "step step-accent" : "step";
  let thirdStepClass = step >= 3 ? "step step-accent" : "step";
  let finalStepClass = step >= 4 ? "step step-accent" : "step";

  return (
    <div className="bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100 flex flex-col justify-center space-y-3 min-h-screen">
      <Card>
        <ul className="w-full steps">
          <li className="step step-accent">บัญชี</li>
          <li className={secondStepClass}>ข้อมูลส่วนตัว</li>
          <li className={thirdStepClass}>ที่อยู่</li>
          <li className={finalStepClass}>ตรวจสอบ</li>
        </ul>
      </Card>
      <form onSubmit={handleSubmit(submitForm)}>
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
              return <RegisterThree register={register} />;
            case 4:
              return <RegisterFour register={register} />;
            default:
          }
        })()}
      </form>
      <RenderButton
        nextStep={nextStep}
        prevStep={prevStep}
        step={step}
        goToLogin={goToLogin}
        isValid={isValid}
      />
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};

export default PatientRegister;
