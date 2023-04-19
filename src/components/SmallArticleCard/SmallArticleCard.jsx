import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SmallArticleCard.css";

const SmallArtCard = ({ article }) => {
	const { title, topic, author, article_img_url, article_id } = article;
	const navigate = useNavigate();

	return (
		<li className="smallCard">
			<img className="smallImg" src={article_img_url} alt={`${title} by ${author}`} />
			<div className="smallCardInfo">
				<h3 className="truncate smallCardTitle">{title}</h3>
				<div className="subHeadigns">
					<h5>{author}</h5>
					<h5  className="clickOn" onClick={() => {navigate(`/topics/${topic}`)}}>{topic}</h5>
				</div>
				<div className="readMore" onClick={() => {navigate(`/article/${article_id}`)}}>
					<p>Read more</p>
					<FaArrowCircleRight className="readArrow" />
				</div>
			</div>
		</li>
	);
};

export default SmallArtCard;
