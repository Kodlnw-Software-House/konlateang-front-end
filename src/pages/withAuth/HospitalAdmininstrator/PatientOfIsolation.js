import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import { useParams } from "react-router";
import { Fragment } from "react";
const PatientOfIsolation = (props) => {
  const { id } = useParams();
  return (
    <Fragment>
      <Card>
        <h1 className="text-center text-2xl font-bold">{props.header}</h1>
      </Card>
      <ItemCard>รายชื่อผู้ป่วย ของ {id} บลาๆๆๆ</ItemCard>
    </Fragment>
  );
};
export default PatientOfIsolation;
