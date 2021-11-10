import Card from "../ui/Card";
const registerTwo = (props) => {
  const cIdInputClasses = props.citizenIdError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info md:h-12";
  const fNameInputClasses = props.fNameError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info md:h-12";
  const lNameInputClasses = props.lNameError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info md:h-12";
  const dobInputClasses = props.dobError
    ? "input input-sm input-error text-warning md:h-12"
    : "input input-sm input-info";
  const ageInputClasses = props.ageError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="citizen_id" className="label">
          <span className="label-text">รหัสประจำตัวประชาชน (13 หลัก)</span>
        </label>
        <input
          type="number"
          placeholder="เช่น 11123-45567-890"
          className={cIdInputClasses}
          {...props.register("citizenId", {
            required: true,
            valueAsNumber: true,
            validate: (value) => value.toString().length === 13,
          })}
        />
        {props.citizenIdError && (
          <label className="label">
            <span className="label-text text-error">
              โปรดระบุเลขประจำตัวประชาชนทั้ง 13 หลัก
            </span>
          </label>
        )}
        <label htmlFor="fName" className="label">
          <span className="label-text">ชื่อจริง</span>
        </label>
        <input
          type="text"
          placeholder="ชื่อจริง"
          className={fNameInputClasses}
          {...props.register("fName", { required: true, maxLength: 45 })}
        />
        {props.fNameError && (
          <label className="label">
            <span className="label-text text-error">
              {props.fNameError.type === "required"
                ? "โปรดระบุชื่อจริง"
                : "ชื่อจริงต้องมีขนาดไม่เกิน 45 ตัวอักษร"}
            </span>
          </label>
        )}
        <label htmlFor="lName" className="label">
          <span className="label-text">นามสกุล</span>
        </label>
        <input
          type="text"
          placeholder="นามสกุล"
          className={lNameInputClasses}
          {...props.register("lName", { required: true, maxLength: 45 })}
        />
        {props.lNameError && (
          <label className="label">
            <span className="label-text text-error">
              {props.lNameError.type === "required"
                ? "โปรดระบุนามสกุล"
                : "นามกสุลต้องมีขนาดไม่เกิน 45 ตัวอักษร"}
            </span>
          </label>
        )}
        <label htmlFor="dob" className="label">
          <span className="label-text">วันเดือนปีเกิด</span>
        </label>
        <input
          type="date"
          className={dobInputClasses}
          {...props.register("dob", { required: true })}
        />
        {props.dobError && (
          <label className="label">
            <span className="label-text text-error">
              โปรดระบุ วันเดือนปีเกิด ของคุณ
            </span>
          </label>
        )}
        <label htmlFor="age" className="label">
          <span className="label-text">อายุ (ปี)</span>
        </label>
        <input
          disabled
          type="number"
          className={ageInputClasses}
          {...props.register("age", {
            required: true,
            validate: (value) => value > 0,
          })}
        />
        {props.ageError && (
          <label className="label">
            <span className="label-text">คุณต้องมีอายุอย่างน้อย 1 ปี</span>
          </label>
        )}
      </div>
    </Card>
  );
};
export default registerTwo;
