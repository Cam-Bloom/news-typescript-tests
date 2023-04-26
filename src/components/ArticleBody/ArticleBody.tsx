import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticlesById } from "../../utils/utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import LikeButton from "../LikeButton/LikeButton";
import "./ArticleBody.css";
import IArticle from "../../interfaces/IArticle";

interface Props {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: null | string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
const ArticleBody = ({ loading, setLoading, error, setError }: Props) => {
  const { article_id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<IArticle | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchArticlesById(article_id!)
      .then((res) => {
        setLoading(false);
        setError(null);
        setArticle(res.article);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, [article_id, setLoading, setError]);

  if (loading) return <LoadingSpinner />;

  const { title, topic, author, body, created_at, votes, article_img_url } =
    article as IArticle;

  const date = created_at?.slice(0, 10).split("-").reverse().join("-");

  if (error) return <p className="articleError">Error: Article Not Found</p>;

  return (
    <section>
      <img
        className="coverImg"
        src={article_img_url}
        alt={`${title} by ${author}`}
      />
      <h5
        className="topicTag"
        onClick={() => {
          navigate(`/topics/${topic}`);
        }}
      >
        {topic}
      </h5>
      <h2 className="articleHeader">{title}</h2>
      <div className="subArticleHeader">
        <h5>{author}</h5>
        <h5>{date}</h5>
        <LikeButton votes={votes} />
      </div>
      <p className="articleBody">{body}</p>
    </section>
  );
};

export default ArticleBody;
