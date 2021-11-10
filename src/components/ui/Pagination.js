const Pagination = (props) => {
  return (
    <div className="btn-group justify-center">
      <button
        className="btn btn-sm btn-outline btn-primary md:btn-md"
        onClick={props.prevPage}
      >
        Prev
      </button>
      {props.item}
      <button
        className="btn btn-sm btn-outline btn-primary md:btn-md"
        onClick={props.nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
