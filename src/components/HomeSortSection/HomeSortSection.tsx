import { useState, useRef, FormEvent } from "react";
import { FaChevronDown, FaRegWindowMinimize } from "react-icons/fa";
import ISearchQueries from "../../interfaces/ISearchQueries";
import "./HomeSortSection.css";

const HomeSortSection = ({
  setSearchQueries,
}: {
  setSearchQueries: React.Dispatch<React.SetStateAction<ISearchQueries>>;
}) => {
  const [sortBy, setSortBy] = useState<ISearchQueries["sort_by"]>("created_at");
  const [order, setOrder] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchQueries({
      limit: 10,
      topic: undefined,
      sort_by: sortBy,
      order: order ? "ASC" : "DESC",
    });
  };

  return (
    <section className="sortBySection">
      <h2 className="homeArticleTitle">All Articles</h2>

      <div
        className="sortByExpander"
        onClick={handleToggle}
        data-testid="expand-accordian"
      >
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
        data-testid="accordian"
        className="sortByWrapper"
        style={clicked ? { height: "60px" } : { height: "0px" }}
      >
        <form onSubmit={handleSubmit} className="sortBy">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as "created_at" | "comment_count" | "votes"
              )
            }
          >
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
