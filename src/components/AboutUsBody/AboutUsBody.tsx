import { useState } from "react";
import "./AboutUsBody.css";
import { useTranslation } from "react-i18next";

const lngs: any = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

const AboutUsBody = () => {
  const { t, i18n } = useTranslation();
  const [count, setCounter] = useState(0);

  return (
    <div className="AboutUsPage">
      <img
        className="AboutUsImage"
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="newspapers"
      />
      <h2 className="AboutUsTitle">About Us</h2>
      <p className="AboutUsBody">
        Bloom News is a dynamic and informative online newspaper that offers a
        unique blend of articles tailored for cooking enthusiasts, coding
        experts, and football lovers. Our team of passionate writers is
        committed to providing the latest news, trends, and insights on these
        three diverse topics, making Bloom News the go-to source for anyone who
        wants to stay up-to-date on the latest happenings in these fields.
        Whether you are looking to explore new recipes, learn the latest coding
        languages, or stay abreast of the football world's latest news, Bloom
        News is the perfect platform to discover, engage and learn. Our
        commitment to providing high-quality content and cutting-edge insights
        ensures that our readers always stay ahead of the curve. Join us today
        and become a part of the Bloom News community!
      </p>
      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => {
              i18n.changeLanguage(lng);
              setCounter(count + 1);
            }}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      <p>{t("home.sortTitle")}</p>
      <p>
        <i>{t("counter", { count })}</i>
      </p>
      <div>{t("test")}</div>
      <div>{t("test2")}</div>
    </div>
  );
};

export default AboutUsBody;
