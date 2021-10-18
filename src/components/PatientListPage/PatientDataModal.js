function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const PatientData = (props) => {
  const data = props.modalData;
  const date = new Date(data.create_at);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes] = [
    addZero(date.getHours()),
    addZero(date.getMinutes()),
  ];
  const realMonth = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ][month];
  return (
    <div>
      <div className="text-center">
        <p className="text-lg">รหัสการจองเตียงที่ {data.booking_id}</p>
        <p>{`${day} ${realMonth} ${year} เวลา ${hour}:${minutes} นาที`}</p>
      </div>
      <div className="mt-4">
        <p>{`รหัสประจำตัวผู้ป่วย ${data.patient.patient_id}`}</p>
        <p>{`ชื่อ-นามสกุล ${data.patient.fname} ${data.patient.lname}`}</p>
        <p>{`เลขประจำตัวประชาชน ${data.patient.citizen_id}`}</p>
        <p>{`วันเดือนปีเกิด ${data.patient.dob}`}</p>
        <p>{`เพศ ${
          data.patient.gender === "M" ? "ชาย" : "F" ? "หญิง" : "ไม่ระบุ"
        } อายุ ${data.patient.age} ปี `}</p>
        <p>{`ที่อยู่ปัจจุบัน ${data.patient.address}`}</p>
        <p>{`เบอร์โทรศัพท์ ${data.patient.tel}`}</p>
        <p>{`อีเมล ${data.patient.email}`}</p>
      </div>
    </div>
  );
};
export default PatientData;
