import ItemCard from "../ui/ItemCard";
const BookingHistory = (props) => {
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
          <p>{props.bookingDate}</p>
          <p className="text-sm mt-2">
            สถานะ:{" "}
            <span className="badge-success badge-md rounded-badge p-1">
              {props.bookingStatus}
            </span>
          </p>
        </div>
      </div>
    </ItemCard>
  );
};
export default BookingHistory;
