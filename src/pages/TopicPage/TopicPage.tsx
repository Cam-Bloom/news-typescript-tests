import TopicArticleContainer from "../../components/TopicArticleContainer/TopicArticleContainer";
import TopicSelect from "../../components/TopicSelect/TopicSelect";
import Header from "../../components/Header/Header";
import "./TopicPage.css";

const TopicPage = () => {
  return (
    <div>
      <Header />
      <div className="topicPage">
        <TopicSelect />
        <TopicArticleContainer />
      </div>
    </div>
  );
};

export default TopicPage;
