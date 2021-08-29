import { useState } from "react";
import RegisterOne from "../components/login/register-1";
import RegisterTwo from "../components/login/register-2";
import RegisterThree from "../components/login/register-3";
import RegisterFour from "../components/login/register-4-finish";
import Card from "../components/ui/Card";
import { useHistory } from "react-router";
// import {
//   emailValidate,
//   passwordValidate,
// } from "../components/functions/form-validation";

const PatientRegister = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    pass: "",
    fName: "",
    lName: "",
  });
  const goToLogin = () => {
    history.replace("/patient-login");
  };
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(form.email);
    console.log(form.pass);
    console.log(form.fName);
    console.log(form.lName);
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
      <form onSubmit={submitForm}>
        {(() => {
          switch (step) {
            case 1:
              return (
                <RegisterOne
                  goToLogin={goToLogin}
                  nextStep={nextStep}
                  enteredEmail={form.email}
                  emailChangeHandler={handleChange}
                />
              );
            case 2:
              return (
                <RegisterTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  enteredPass={form.pass}
                  passChangeHandler={handleChange}
                />
              );
            case 3:
              return (
                <RegisterThree
                  nextStep={nextStep}
                  prevStep={prevStep}
                  enteredFirstName={form.fName}
                  enteredLastName={form.lName}
                  onChangeHandler={handleChange}
                />
              );
            case 4:
              return (
                <RegisterFour
                  prevStep={prevStep}
                  submitForm={submitForm}
                  value={form}
                />
              );
            default:
          }
        })()}
      </form>
    </div>
  );
};

export default PatientRegister;
