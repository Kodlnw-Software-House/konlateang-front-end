import Card from "../ui/Card";
const registerFour = (props) => {
  const { email, pass, fName, lName } = props.value;
  return (
    <Card>
      <div className="overflow-y-scroll max-h-96">
        <div className="divider">บัญชี</div>
        <p>
          อีเมล : <span className="text-primary-focus">{email}</span>
        </p>
        <p>
          รหัสผ่าน : <span className="text-primary-focus">{pass}</span>
        </p>
        <p>
          อีเมล : <span className="text-primary-focus">{email}</span>
        </p>
        <p>
          รหัสผ่าน : <span className="text-primary-focus">{pass}</span>
        </p>
        <div className="divider">ข้อมูลส่วนตัว</div>
        <p>
          ชื่อจริง : <span className="text-primary-focus">{fName}</span>
        </p>
        <p>
          นามสกุล : <span className="text-primary-focus">{lName}</span>
        </p>
        <div className="divider">ที่อยู่</div>
        <p>
          อีเมล : <span className="text-primary-focus">{email}</span>
        </p>
        <p>
          รหัสผ่าน : <span className="text-primary-focus">{pass}</span>
        </p>
        <p>
          อีเมล : <span className="text-primary-focus">{email}</span>
        </p>
        <p>
          รหัสผ่าน : <span className="text-primary-focus">{pass}</span>
        </p>
        <p>
          อีเมล : <span className="text-primary-focus">{email}</span>
        </p>
        <p>
          รหัสผ่าน : <span className="text-primary-focus">{pass}</span>
        </p>
      </div>

      <div className="flex flex-col space-y-2 pt-8">
        <button className="btn btn-primary btn-md" type="submit">
          ลงทะเบียน
        </button>
        <button
          className="btn btn-ghost btn-md text-secondary-focus"
          onClick={props.prevStep}
        >
          ย้อนกลับ
        </button>
      </div>
    </Card>
  );
};
export default registerFour;
