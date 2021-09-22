import { UserIcon, UserGroupIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
const WelcomePagePopup = (props) => {
  const history = useHistory();
  const goPatientLogin = () => {
    history.push("/patient-login");
  };
  const goHospitalLogin = () => {
    history.push("/hospital-login");
  };

  return (
    <div data-theme={props.theme}>
      <div className="text-center mb-2 text-lg font-bold">
        <h1>เข้าสู่ระบบ...</h1>
      </div>
      <div className="space-y-2 text-xl">
        <button
          className="btn btn-block rounded-lg btn-primary h-auto p-2"
          onClick={goPatientLogin}
        >
          <UserIcon className="btn-icon" /> ผู้ป่วย Covid-19
        </button>
        <button
          className="btn btn-block btn-outline rounded-lg btn-primary h-auto p-2"
          onClick={goHospitalLogin}
        >
          <UserGroupIcon className="btn-icon" />
          เจ้าหน้าที่ศูนย์พักคอย
        </button>
      </div>
    </div>
  );
};

export default WelcomePagePopup;
