import Card from "../ui/Card";
const RenderButton = (props) => {
  const isDisable = !props.isValid ? true : false;
  if (props.step > 4) {
    return undefined;
  } else if (props.step === 4) {
    return (
      <Card>
        <div className="flex flex-col space-y-2">
          <button
            className="btn text-lg btn-primary btn-md"
            onClick={props.submitForm}
            disabled={isDisable}
          >
            ลงทะเบียน
          </button>
          <button
            className="btn btn-ghost text-lg btn-md text-secondary-focus"
            onClick={props.prevStep}
          >
            ย้อนกลับ
          </button>
        </div>
      </Card>
    );
  } else if (props.step === 1) {
    return (
      <Card>
        <div className="flex flex-col justify-start">
          <button
            className="btn text-lg btn-primary btn-md btn-block"
            onClick={props.nextStep}
            disabled={isDisable}
          >
            ถัดไป
          </button>
          <button
            className="btn btn-link btn-md my-2 text-secondary-focus text-base"
            onClick={props.goToLogin}
          >
            มีบัญชีอยู่แล้ว ?{" "}
            <span className="text-accent px-2">เข้าสู่ระบบ</span>
          </button>
        </div>
      </Card>
    );
  } else {
    return (
      <Card>
        <div className="flex flex-col space-y-2">
          <button
            className="btn text-lg btn-primary btn-md"
            onClick={props.nextStep}
            disabled={isDisable}
          >
            ถัดไป
          </button>
          <button
            className="btn btn-ghost text-lg btn-md text-secondary-focus"
            onClick={props.prevStep}
          >
            ย้อนกลับ
          </button>
        </div>
      </Card>
    );
  }
};
export default RenderButton;
