import { UserIcon, UserGroupIcon } from "@heroicons/react/outline";

const WelcomePagePopup = (props) => {
  return (
    <div data-theme={props.theme}>
      <div className="text-center mb-2 text-lg font-bold">
        <h1>เข้าสู่ระบบ...</h1>
      </div>
      <div className="space-y-2 text-xl">
        <button className="btn btn-block rounded-lg btn-primary h-auto p-2">
          <UserIcon className="btn-icon" /> ผู้ป่วย Covid-19
        </button>
        <button className="btn btn-block btn-outline rounded-lg btn-primary h-auto p-2">
          <UserGroupIcon className="btn-icon" />
          เจ้าหน้าที่ศูนย์พักคอย
        </button>
      </div>
    </div>
  );
};

export default WelcomePagePopup;
