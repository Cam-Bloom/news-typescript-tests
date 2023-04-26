import { useEffect, useState } from "react";
import { fetchArticles } from "../../utils/utils";
import SmallArticleCard from "../SmallArticleCard/SmallArticleCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ISearchQueries from "../../interfaces/ISearchQueries";
import Article from "../../interfaces/IArticle";
import "./HomeArticleContainer.css";

interface Props {
  searchQueries: ISearchQueries;
  setSearchQueries: React.Dispatch<React.SetStateAction<ISearchQueries>>;
}

const HomeArtCont = ({ searchQueries, setSearchQueries }: Props) => {
  const [articlesFromApi, setArticlesFromApi] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchArticles<{ articles: Article[] }>(searchQueries).then((data) => {
      setArticlesFromApi(data.articles);
      setLoading(false);
    });
  }, [searchQueries]);

  const showAllArticles = (limit = 1000) => {
    setSearchQueries((currentSearchQueries) => {
      const newSearchQueries = { ...currentSearchQueries };
      newSearchQueries.limit = limit;
      return newSearchQueries;
    });
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <section className="homeContainer">
      <ul className="homeArticleList">
        {articlesFromApi.map((article) => (
          <SmallArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
      <button data-testid="show-more-button" onClick={() => showAllArticles()}>
        Show More
      </button>
    </section>
  );
};

export default HomeArtCont;
