import { useHistory } from "react-router";
const BackButton = (props) => {
  const history = useHistory();
  const goBack = () => {
    if (props.main) {
      history.push("/");
    } else {
      history.goBack();
    }
  };
  return (
    <div className="my-2 text-left h-full">
      <button onClick={goBack} className="btn text-lg btn-ghost">
        &#8617; ย้อนกลับ
      </button>
    </div>
  );
};
export default BackButton;
