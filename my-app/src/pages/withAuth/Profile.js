import { withRouter } from "react-router";
import NavBar from "../../components/Header/Navbar";
import Footer from "../../components/ui/Footer";
import { Fragment } from "react";
const Profile = () => {
  return (
    <Fragment>
      <NavBar />
      <div className="bg-blue-200 h-screen"></div>
      <Footer />
    </Fragment>
  );
};
export default withRouter(Profile);
