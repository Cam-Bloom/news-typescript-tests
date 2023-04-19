import IUserContext from "../../interfaces/IUserContext";
import "./LoginPageBody.css";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { fetchUserByUserId } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const LoginPageBody = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loginClassList, setLoginClassList] = useState(["LoginInput"]);
  const [notFound, setNotFound] = useState(false);
  const { setLoggedInUser } = useContext(UserContext) as IUserContext; // not sure

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (username.length === 0) {
      setLoginClassList(["LoginInput", "invalid"]);
    } else {
      setLoginClassList(["LoginInput"]);
      setUsername("");

      fetchUserByUserId(username)
        .then((res) => {
          setNotFound(false);
          setLoggedInUser(username);
          navigate("/loginconfirm");
        })
        .catch((err) => {
          console.log(err);
          setNotFound(true);
          setLoginClassList(["LoginInput", "invalid"]);
        });
    }
  };

  return (
    <section className="LoginSection">
      <h2 className="loginTitle">Login</h2>
      <form className={loginClassList.join(" ")} onSubmit={handleSubmit}>
        <label htmlFor="comment">Enter Username</label>
        <input
          type="text"
          id="comment"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            e.target.value.length === 0
              ? setLoginClassList(["LoginInput"])
              : setLoginClassList(["activeInput", "LoginInput"]);
          }}
        />
        <button className="commentButton">Login</button>
      </form>
      {notFound ? <p className="UserNotFound">Username not found</p> : ""}
    </section>
  );
};

export default LoginPageBody;
