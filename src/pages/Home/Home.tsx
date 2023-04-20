import { useState } from "react";
import HomeArticleContainer from "../../components/HomeArticleContainer/HomeArticleContainer";
import HomeSortSection from "../../components/HomeSortSection/HomeSortSection";
import Header from "../../components/Header/Header";
import HomeTopArticle from "../../components/HomeTopArticle/HomeTopArticle";
import ISearchQueries from "../../interfaces/ISearchQueries";

// import TopicSelect from "../TopicSelect/TopicSelect.jsx";
import "./Home.css";

const Home = () => {
  const [searchQueries, setSearchQueries] = useState<ISearchQueries>({
    limit: 10,
    topic: undefined,
    sort_by: "votes",
    order: "DESC",
  });

  return (
    <div>
      <Header />
      <div className="homePage">
        <HomeTopArticle />
        <HomeSortSection setSearchQueries={setSearchQueries} />
        <HomeArticleContainer
          setSearchQueries={setSearchQueries}
          searchQueries={searchQueries}
        />
      </div>
    </div>
  );
};

export default Home;
