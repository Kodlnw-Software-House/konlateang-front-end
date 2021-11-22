import Card from "../ui/Card";
const registerFour = (props) => {
  const {
    Email,
    Password,
    age,
    citizenId,
    fName,
    lName,
    dob,
    address,
    telNo,
    gender,
  } = props.formData;
  return (
    <Card>
      <div className="overflow-y-scroll max-h-96">
        <div className="whitespace-normal">
          <div className="divider md:text-2xl">บัญชี</div>
          <div className="text-sm md:text-lg">
            <p>
              อีเมล: <span className="text-primary-focus">{Email}</span>
            </p>
            <p>
              รหัสผ่าน: <span className="text-primary-focus">{Password}</span>
            </p>
          </div>
          <div className="divider md:text-2xl">ข้อมูลส่วนตัว</div>
          <div className="text-sm md:text-lg">
            <p>
              เลขประจำตัวประชาชน:{" "}
              <span className="text-primary-focus">{citizenId}</span>
            </p>
            <p>
              ชื่อจริง: <span className="text-primary-focus">{fName}</span>
            </p>
            <p>
              นามสกุล: <span className="text-primary-focus">{lName}</span>
            </p>
            <p>
              วัน-เดือน-ปีเกิด:{" "}
              <span className="text-primary-focus">{dob}</span>
            </p>
            <p>
              อายุ: <span className="text-primary-focus">{age} ปี </span>
              เพศ:{" "}
              <span className="text-primary-focus">
                {gender === "M" ? "ชาย" : gender === "F" ? "หญิง" : "ไม่ระบุ"}
              </span>
            </p>
          </div>
          <div className="divider md:text-2xl">การติดต่อ</div>
          <div className="text-sm md:text-lg">
            <p>
              ที่อยู่ปัจจุบัน:{" "}
              <span className="text-primary-focus break-words">{address}</span>
            </p>
            <p>
              เบอร์โทรศัพท์: <span className="text-primary-focus">{telNo}</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default registerFour;
