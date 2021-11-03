import { UserIcon, UserGroupIcon } from "@heroicons/react/outline";
const WelcomePagePopup = (props) => {
  return (
    <div data-theme={props.theme}>
      <div className="text-center mb-2 font-bold">
        <h1 className="text-lg md:text-2xl">เข้าสู่ระบบ...</h1>
      </div>
      <div className="space-y-2 ">
        <button
          className="btn btn-block rounded-lg btn-primary h-auto p-2 text-xl md:h-16 md:text-2xl"
          onClick={props.goPatientLogin}
        >
          <UserIcon className="btn-icon" /> ผู้ป่วย Covid-19
        </button>
        <button
          data-theme="hospitalTheme"
          className="btn btn-block btn-outline rounded-lg btn-primary h-auto p-2 text-xl md:h-16 md:text-2xl"
          onClick={props.goHospitalLogin}
        >
          <UserGroupIcon className="btn-icon" />
          เจ้าหน้าที่ศูนย์พักคอย
        </button>
      </div>
    </div>
  );
};

export default WelcomePagePopup;
