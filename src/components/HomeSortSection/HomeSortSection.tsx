import { useState, useRef } from "react";
import { FaChevronDown, FaRegWindowMinimize } from "react-icons/fa";
import ISearchQueries from "../../interfaces/ISearchQueries";
import "./HomeSortSection.css";

const HomeSortSection: React.FC<{ setSearchQueries: any }> = ({
  setSearchQueries,
}) => {
  const [sortBy, setSortBy] = useState<ISearchQueries["sort_by"]>("created_at");
  const [order, setOrder] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const contentEl = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setSearchQueries((currentSearchQueries: ISearchQueries) => {
      const newSearchQueries = { ...currentSearchQueries };
      newSearchQueries.sort_by = sortBy;
      newSearchQueries.order = order ? "ASC" : "DESC";

      return newSearchQueries;
    });
  };

  return (
    <section className="sortBySection">
      <h2 className="homeArticleTitle">All Articles</h2>
      <div className="sortByExpander" onClick={handleToggle}>
        <label className="clickOn">Filter</label>
        <span className="sortByIcon">
          {clicked ? (
            <FaRegWindowMinimize />
          ) : (
            <FaChevronDown className="expandChevron" />
          )}{" "}
        </span>
      </div>

      <div
        ref={contentEl}
        className="sortByWrapper"
        style={
          clicked && contentEl.current
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <form onSubmit={handleSubmit} className="sortBy">
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
          >
            {/* unsure about how to type the e.target.value */}
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>

          <div className="toggle">
            <input
              type="checkbox"
              checked={order}
              onChange={() => {
                setOrder((current) => !current);
              }}
            />
            <label></label>
          </div>

          <button>Filter</button>
        </form>
      </div>
    </section>
  );
};

export default HomeSortSection;
