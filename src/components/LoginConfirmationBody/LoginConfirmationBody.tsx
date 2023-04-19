import "./LoginConfirmationBody.css";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const LoginConfirmationBody = () => {
  const navigate = useNavigate();
  const { userDetails }: any = useContext(UserContext);
  const { name, avatar_url } = userDetails;

  return (
    <div className="confirmationBody">
      <h2 className="confirmationTitle">Welcome back {name}</h2>
      <div className="centerDiv">
        <img src={avatar_url} alt="User Avatar" className="confirmImg"></img>
      </div>
      <div
        className="returnHomeButton"
        onClick={() => {
          navigate("/");
        }}
      >
        <h2>Return Home</h2>
        <FaArrowCircleRight />
      </div>
    </div>
  );
};

export default LoginConfirmationBody;
