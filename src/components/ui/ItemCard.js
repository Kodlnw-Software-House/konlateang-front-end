const ItemCard = (props) => {
  let classes =
    "card bordered bg-primary-content shadow-md w-auto h-auto m-4 md:mx-10 lg:mx-20 lg:py-2 xl:mx-80";
  if (props.type === "isolation-main-page") {
    classes =
      "card bordered bg-primary-content shadow-md w-auto h-auto m-4 md:mx-10 lg:mx-20 lg:py-2 xl:mx-10";
  }
  return (
    <div className={classes}>
      <div className="card-body p-2 md:p-4 w-auto h-auto">{props.children}</div>
    </div>
  );
};
export default ItemCard;
