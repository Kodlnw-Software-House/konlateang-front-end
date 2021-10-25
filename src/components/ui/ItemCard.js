const ItemCard = (props) => {
  return (
    <div className="card bordered bg-primary-content shadow-md m-4 md:mx-10 lg:mx-20 lg:py-2 xl:mx-10">
      <div className="card-body p-4 md:p-8">{props.children}</div>
    </div>
  );
};
export default ItemCard;
