import ItemCard from "../ui/ItemCard";
import default_bg from "../../assets/bg_hospital.jpg";
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const BookingHistory = (props) => {
  const date = new Date(props.bookingDate);
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
  const status = [
    "การจองล้มเหลว",
    "จองสำเร็จ! กำลังดำเนินการ",
    "การรักษาเสร็จสิ้น!",
    "กำลังรักษาอยู่",
  ][props.bookingStatus - 1];

  let statusClasses;

  switch (props.bookingStatus) {
    case 1:
      statusClasses =
        " text-base md:text-lg badge-error badge-md rounded-badge";
      break;
    case 2:
      statusClasses = "text-base md:text-lg badge-info badge-md rounded-badge";
      break;
    case 3:
      statusClasses =
        "text-base md:text-lg badge-success badge-md rounded-badge";
      break;
    case 4:
      statusClasses = "text-base md:text-lg badge-info badge-md rounded-badge";
      break;
    default:
      break;
  }
  return (
    <ItemCard>
      <div className="flex flex-row md:space-x-1 items-center md:justify-center">
        <div className="hidden md:flex md:flex-col md:justify-center md:w-1/3 md:h-52 lg:h-80 md:mr-4 overflow-hidden">
          <img
            className="w-full h-auto"
            src={`${process.env.REACT_APP_BACKEND_MAIN_URL}hospital/getImage/${props.id}/0`}
            alt="profile_pic"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = default_bg;
            }}
          />
        </div>
        <div className="border-l-8 pl-4 border-sky-500 md:w-2/3 leading-7">
          <p className="text-base md:text-2xl">{props.hospitalName}</p>
          <p className="text-base md:text-lg">{`จองเมื่อ วันที่ ${day} ${realMonth} พ.ศ. ${
            year + 543
          }`}</p>
          <p className="text-base md:text-lg">{`เวลา ${hour}:${minutes} นาที`}</p>
          <p className="mt-2">
            <span className={statusClasses}>{status}</span>
          </p>
        </div>
      </div>
    </ItemCard>
  );
};
export default BookingHistory;
