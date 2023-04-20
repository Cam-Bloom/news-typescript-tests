import ArticleBody from "../ArticleBody/ArticleBody";
import CommentsSection from "../CommentsSection/CommentsSection";
import { useState } from "react";
import "./ArticleContainer.css";

const ArticleContainer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  return (
    <section className="articleContainer">
      <ArticleBody
        loading={loading}
        setLoading={setLoading}
        error={error}
        setError={setError}
      />
      <CommentsSection loading={loading} error={error} />
    </section>
  );
};

export default ArticleContainer;
