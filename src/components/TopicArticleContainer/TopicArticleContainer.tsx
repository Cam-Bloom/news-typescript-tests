import { useEffect, useState } from "react";
import LargeArticleCard from "../LargeArticleCard/LargeArticleCard";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../utils/utils";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ISearchQueries from "../../interfaces/ISearchQueries";
import "./TopicArticleContainer.css";
import Article from "../../interfaces/IArticle";

type TopicParams = Pick<ISearchQueries, "topic">;

const TopicArticleContainer = () => {
  const { topic } = useParams<TopicParams>();

  // function useParams<K extends string = string>(): Readonly<Params<K>>;

  const [topicArticlesApi, setTopicArticlesApi] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    (topic === "allTopics"
      ? fetchArticles<{ articles: Article[] }>({})
      : fetchArticles<{ articles: Article[] }>({ topic })
    )
      .then((data) => {
        setTopicArticlesApi(data.articles);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, [topic]);

  if (loading) return <LoadingSpinner />;

  if (error) return <p className="topicError">Error: Topic Not Found</p>;

  return (
    <ul className="topicContainer">
      {topicArticlesApi.map((article) => (
        <LargeArticleCard key={article.article_id} article={article} />
      ))}
    </ul>
  );
};

export default TopicArticleContainer;
