import IArticle from "../../interfaces/IArticle";
import "./HomeTopArticleCard.css";
import { useNavigate } from "react-router-dom";

const HomeTopArticleCard = ({ article }: { article: IArticle }) => {
  const { title, topic, author, article_img_url, article_id } = article;
  const navigate = useNavigate();

  return (
    <div className="TopArticleCard">
      <img src={article_img_url} className="TopArticleImg" alt="article"></img>
      <h2
        className="TopArticleCardTitle"
        onClick={() => {
          navigate(`/article/${article_id}`);
        }}
      >
        {title}{" "}
      </h2>
    </div>
  );
};

export default HomeTopArticleCard;
