import { RiCloseFill } from "react-icons/ri";
import {Link,useNavigate} from "react-router-dom";
import "./MenuPage.css";

const MenuPage = () => {
    const navigate = useNavigate();
	return (
		<div className="menuPage">
			<RiCloseFill className="closeCrossIcon" onClick={() => navigate(-1)}/>
			<nav className="menuNav">
				<p className="menuTitle">M E N U</p>
				<Link className="menuNavLink" to="/">
					Home
				</Link>
				<Link className="menuNavLink" to="/topics/allTopics">
					Topics
				</Link>
				<Link className="menuNavLink" to="/aboutus">
					About Us
				</Link>
				<Link className="menuNavLink" to="/login">
					Login
				</Link>
			</nav>
		</div>
	);
};

export default MenuPage;
