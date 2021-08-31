const ItemCard = (props) => {
  return (
    <div className="card bordered bg-primary-content shadow-md m-4">
      <div className="card-body">{props.children}</div>
    </div>
  );
};
export default ItemCard;
