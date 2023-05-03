import { t } from "i18next";
import "./DesktopNav.css";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav className="desktopNav">
      <Link className="navLink" to="/">
        {t("home.home")}
      </Link>
      <Link className="navLink" to="/topics/allTopics">
        {t("topics")}
      </Link>
      <Link className="navLink" to="/aboutus">
        {t("about-us")}
      </Link>
    </nav>
  );
};

export default DesktopNav;
