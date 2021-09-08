import Card from "../ui/Card";
const registerTwo = (props) => {
  const cIdInputClasses = props.citizenIdError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  const fNameInputClasses = props.fNameError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  const lNameInputClasses = props.lNameError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  const dobInputClasses = props.dobError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  const ageInputClasses = props.ageError
    ? "input input-sm input-error text-warning"
    : "input input-sm input-info";
  return (
    <Card>
      <div className="form-control">
        <label htmlFor="citizen_id" className="label">
          <span className="label-text">Cititen's ID (13 หลัก)</span>
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
              โปรดระบุเลขประจำตัวประชาชน 13 หลัก
            </span>
          </label>
        )}
        <label htmlFor="fName" className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          type="text"
          placeholder="ชื่อจริง"
          className={fNameInputClasses}
          {...props.register("fName", { required: true, maxLength: 80 })}
        />
        {props.fNameError && (
          <label className="label">
            <span className="label-text text-error">
              โปรดระบุชื่อจริงให้ถูกต้อง
            </span>
          </label>
        )}
        <label htmlFor="lName" className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input
          type="text"
          placeholder="นามสกุล"
          className={lNameInputClasses}
          {...props.register("lName", { required: true, maxLength: 80 })}
        />
        {props.lNameError && (
          <label className="label">
            <span className="label-text text-error">โปรดระบุนามสกุล</span>
          </label>
        )}
        <label htmlFor="dob" className="label">
          <span className="label-text">Date of Birth</span>
        </label>
        <input
          type="date"
          className={dobInputClasses}
          {...props.register("dob", { required: true })}
        />
        {props.dobError && (
          <label className="label">
            <span className="label-text text-error">
              โปรดระบุวันเดือนปีเกิดของคุณ
            </span>
          </label>
        )}
        <label htmlFor="age" className="label">
          <span className="label-text">Age</span>
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
            <span className="label-text">โปรดระบุวันเดือนปีเกิด</span>
          </label>
        )}
      </div>
    </Card>
  );
};
export default registerTwo;
