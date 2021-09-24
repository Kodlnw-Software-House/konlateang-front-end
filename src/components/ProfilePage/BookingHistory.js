import ItemCard from "../ui/ItemCard";
const BookingHistory = (props) => {
  const date = new Date(props.bookingDate);
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes] = [date.getHours(), date.getMinutes()];
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
      statusClasses = "badge-error badge-md rounded-badge";
      break;
    case 2:
      statusClasses = "badge-info badge-md rounded-badge";
      break;
    case 3:
      statusClasses = "badge-success badge-md rounded-badge";
      break;
    case 4:
      statusClasses = "badge-info badge-md rounded-badge";
      break;
    default:
      break;
  }
  return (
    <ItemCard>
      <div className="flex space-x-2 overflow-hidden items-center">
        <div className="avatar w-1/3 h-28">
          <img
            className="object-cover max-w-full max-h-full block rounded-box"
            src={props.pic}
            alt="hospital_pic"
          />
        </div>
        <div className="w-2/3 leading-7">
          <p className="text-xl">{props.hospitalName}</p>
          <p>{`จองเมื่อ วันที่ ${day} ${realMonth} ${year + 543}`}</p>
          <p>{`เวลา ${hour}:${minutes} นาที`}</p>
          <p className="text-sm mt-2">
            สถานะ: <span className={statusClasses}>{status}</span>
          </p>
        </div>
      </div>
    </ItemCard>
  );
};
export default BookingHistory;
