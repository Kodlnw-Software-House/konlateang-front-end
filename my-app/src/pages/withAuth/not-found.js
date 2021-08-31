import ItemCard from "../../components/ui/ItemCard";
import { useHistory } from "react-router";
import { Fragment } from "react";
const NotFound = () => {
  const history = useHistory();
  const goMainPage = () => {
    history.push("/");
  };
  return (
    <Fragment>
      <ItemCard>
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="text-6xl font-black text-primary-focus">404</span>
          <span className="badge-error rounded-badge px-2">Not Found</span>
        </div>
        <div className="text-center space-y-4 mb-4">
          <p className="text-3xl font-medium break-normal">
            oops! Page not found
          </p>
          <p>
            the page you are looking for does not exist. <br />
            It might has been deleted or removed.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-accent btn-md place-self-end"
            onClick={goMainPage}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </ItemCard>
      <ItemCard>
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="text-6xl font-black text-primary-focus">404</span>
          <span className="badge-error rounded-badge px-2">Not Found</span>
        </div>
        <div className="text-center space-y-4 mb-4">
          <p className="text-3xl font-medium break-normal">
            oops! Page not found
          </p>
          <p>
            the page you are looking for does not exist. <br />
            It might has been deleted or removed.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-accent btn-md place-self-end"
            onClick={goMainPage}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </ItemCard>
      <ItemCard>
        <div className="flex flex-row justify-center items-center space-x-2">
          <span className="text-6xl font-black text-primary-focus">404</span>
          <span className="badge-error rounded-badge px-2">Not Found</span>
        </div>
        <div className="text-center space-y-4 mb-4">
          <p className="text-3xl font-medium break-normal">
            oops! Page not found
          </p>
          <p>
            the page you are looking for does not exist. <br />
            It might has been deleted or removed.
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="btn btn-accent btn-md place-self-end"
            onClick={goMainPage}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </ItemCard>
    </Fragment>
  );
};
export default NotFound;
