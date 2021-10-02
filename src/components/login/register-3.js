import Card from "../ui/Card";
const registerThree = (props) => {
  const addressInputClasses = props.addressError
    ? "textarea h-24 textarea-bordered textarea-error input-error text-warning"
    : "textarea h-24 textarea-bordered textarea-primary";
  const telNoInputClasses = props.telNoError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  const genderSelectClasses = props.genderError
    ? "select select-bordered select-error w-full max-w-xs font-normal"
    : "select select-bordered select-primary w-full max-w-xs font-normal";
  return (
    <Card>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">เพศ</span>
        </label>
        <select
          {...props.register("gender", { required: true })}
          className={genderSelectClasses}
        >
          <option disabled value="" selected>
            ระบุเพศของท่าน
          </option>
          <option value="M">ชาย</option>
          <option value="F">หญิง</option>
          <option value="O">อื่นๆ</option>
        </select>
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
