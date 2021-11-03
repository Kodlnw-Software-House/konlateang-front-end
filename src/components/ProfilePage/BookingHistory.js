import ItemCard from "../ui/ItemCard";
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
      statusClasses = "text-lg badge-error badge-md rounded-badge";
      break;
    case 2:
      statusClasses = "text-lg badge-info badge-md rounded-badge";
      break;
    case 3:
      statusClasses = "text-lg badge-success badge-md rounded-badge";
      break;
    case 4:
      statusClasses = "text-lg badge-info badge-md rounded-badge";
      break;
    default:
      break;
  }
  return (
    <ItemCard>
      <div className="flex flex-row md:space-x-1 items-center md:justify-center">
        <div className="hidden md:block w-24 h-24 mx-auto md:w-36 md:h-36 xl:w-52 xl:h-52">
          <img
            className="rounded-full h-auto w-full"
            src={props.pic}
            alt="profile_pic"
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.src = default_profile;
            // }}
          />
        </div>
        <div className="border-l-8 pl-4 border-sky-500 w-2/3 leading-7">
          <p className="text-xl md:text-2xl">{props.hospitalName}</p>
          <p className="text-lg">{`จองเมื่อ วันที่ ${day} ${realMonth} พ.ศ. ${year + 543}`}</p>
          <p className="text-lg">{`เวลา ${hour}:${minutes} นาที`}</p>
          <p className="mt-2">
            <span className={statusClasses}>{status}</span>
          </p>
        </div>
      </div>
    </ItemCard>
  );
};
export default BookingHistory;
