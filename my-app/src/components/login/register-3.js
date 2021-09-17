import Card from "../ui/Card";
const registerThree = (props) => {
  const addressInputClasses = props.addressError
    ? "textarea h-24 textarea-bordered textarea-primary input-error text-warning"
    : "textarea h-24 textarea-bordered textarea-primary";
  const telNoInputClasses = props.telNoError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  return (
    <Card>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <textarea
          className={addressInputClasses}
          placeholder="ที่อยู่..."
          {...props.register("address", { required: true, maxLength: 500 })}
        />
        {props.addressError && (
          <label className="label">
            <span className="label-text text-error">
              {props.addressError.type === "required"
                ? "โปรดระบุที่อยู่ของท่าน"
                : "ที่อยู่ต้องมีความยาวไม่เกิน 500 ตัวอักษร"}
            </span>
          </label>
        )}
        <label htmlFor="telNo" className="label">
          <span className="label-text">เบอร์โทรศัพท์</span>
        </label>
        <input
          type="number"
          name="telNo"
          id="telNo"
          placeholder="+66"
          className={telNoInputClasses}
          {...props.register("telNo", {
            required: true,
            validate: (value) => value.toString().length === 10,
          })}
        />
        {props.telNoError && (
          <label className="label">
            <span className="label-text text-error">
              โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง
            </span>
          </label>
        )}
      </div>
    </Card>
  );
};
export default registerThree;
