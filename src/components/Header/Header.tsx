import { GiFlowerEmblem, GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import DesktopNav from "../DesktopNav/DesktopNav";
import { useState, useEffect } from "react";

import "./Header.css";
import LoginButton from "../LoginButton/LoginButton";
import { t } from "i18next";

const Header = () => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const goHome = () => {
    navigate(`/`);
  };

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="headershadow">
      <header>
        <div onClick={goHome} className="headerLogo">
          <GiFlowerEmblem className="icon" />
          <h1>{t("bloom-news")}</h1>
        </div>
        {dimensions.width > 900 && <DesktopNav />}
        {dimensions.width > 900 && <LoginButton />}
        {dimensions.width < 900 && (
          <GiHamburgerMenu
            className="menuIcon"
            onClick={() => {
              navigate("/menu");
            }}
          />
        )}
      </header>
    </div>
  );
};

export default Header;
