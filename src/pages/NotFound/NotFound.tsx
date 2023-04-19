import "./NotFound.css";
import Header from "../../components/Header/Header";

const NotFound = () => {
  return (
    <div>
      <Header />
      <h2 className="errorMessage">Error 404: Page Not Found</h2>
    </div>
  );
};

export default NotFound;
