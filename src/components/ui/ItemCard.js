const ItemCard = (props) => {
  return (
    <div className="card bordered bg-primary-content shadow-md m-4">
      <div className="card-body p-4">{props.children}</div>
    </div>
  );
};
export default ItemCard;
