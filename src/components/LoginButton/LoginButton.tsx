import { RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import "./LoginButton.css";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <div className="loginButton">
      <RiUser3Line
        data-testid="login-icon"
        className="loginIcon"
        onClick={() => {
          navigate("/login");
        }}
      />
      <p
        className="loginText"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </p>
    </div>
  );
};

export default LoginButton;
