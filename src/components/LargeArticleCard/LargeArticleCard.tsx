import { useNavigate } from "react-router-dom";
import Article from "../../interfaces/IArticle";

import "./LargeArticleCard.css";
import { FaArrowCircleRight } from "react-icons/fa";

const LargeArticleCard = ({ article }: { article: Article }) => {
  const { title, topic, author, body, article_img_url, article_id } = article;
  const navigate = useNavigate();

  return (
    <li className="largeCard">
      <img
        className="largeImg"
        src={article_img_url}
        alt={`${title} by ${author}`}
      />
      <div className="largeCardInfo">
        <h3 className="truncate largeCardTitle">{title}</h3>
        <div className="largeCardSubHeadigns">
          <h5>{author}</h5>
          <h5
            className="clickOn"
            onClick={() => {
              navigate(`/topics/${topic}`);
            }}
          >
            {topic}
          </h5>
        </div>
        <p className="truncateBody largeCardBody">{body}</p>
        <div
          className="readMore"
          onClick={() => {
            navigate(`/article/${article_id}`);
          }}
        >
          <p>Read more</p>
          <FaArrowCircleRight className="readArrow" />
        </div>
      </div>
    </li>
  );
};

export default LargeArticleCard;
