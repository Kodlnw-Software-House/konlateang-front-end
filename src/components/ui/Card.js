const Card = (props) => {
  return (
    <div className="m-4 p-2 md:mx-8 lg:mx-20 lg:py-2 xl:mx-4">
      {props.children}
    </div>
  );
};
export default Card;
