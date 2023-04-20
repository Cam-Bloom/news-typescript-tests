import { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { fetchCommentsById } from "../../utils/utils";
import CommentCard from "../CommentCard/CommentCard";
import { postComment } from "../../utils/utils";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import IComment from "../../interfaces/IComment";
import "./CommentsSection.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import IUserContext from "../../interfaces/IUserContext";

interface Props {
  error: null | string;
  loading: boolean;
}

const CommentsSection = ({ loading, error }: Props) => {
  const { article_id } = useParams();
  const { userDetails } = useContext(UserContext) as IUserContext;
  const username = userDetails?.username || "";
  const navigate = useNavigate();
  const [comments, setComments] = useState<IComment[]>([]);
  const [writeComment, setWriteComment] = useState<string>("");
  const [err, setErr] = useState<null | string>(null);
  const [commentClassList, setCommentClassList] = useState<string[]>([
    "postcomment",
  ]);
  const [logInAttempted, setLogInAttempted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogInAttempted(true);

    if (!username) {
      setCommentClassList(["postcomment", "invalid"]);
    } else if (writeComment.length === 0) {
      setCommentClassList(["postcomment", "invalid"]);
    } else {
      setCommentClassList(["postcomment"]);
      setErr(null);
      setWriteComment("");
      setComments((currentComments) => [
        { body: writeComment, author: username, comment_id: 99999999 },
        ...currentComments,
      ]);

      postComment(article_id!, writeComment, username)
        .then(() => {
          article_id &&
            fetchCommentsById(article_id).then((res) =>
              setComments(res.comments)
            );
        })
        .catch((err) => {
          setComments((currentComments) => {
            const newComments = [...currentComments];
            newComments.shift();
            return newComments;
          });

          setErr("Something went wrong, please try again.");
        });
    }
  };

  useEffect(() => {
    article_id &&
      fetchCommentsById(article_id)
        .then((res) => setComments(res.comments))
        .catch((err) => console.log(err));
  }, [article_id]);

  return loading || error ? (
    <LoadingSpinner />
  ) : (
    <section className="commentSection">
      <h2>Comments</h2>

      <form className={commentClassList.join(" ")} onSubmit={handleSubmit}>
        <label htmlFor="comment">Write Comment</label>
        <input
          type="text"
          id="comment"
          value={writeComment}
          onChange={(e) => {
            setWriteComment(e.target.value);
            e.target.value.length === 0
              ? setCommentClassList(["postcomment"])
              : setCommentClassList(["activeInput", "postcomment"]);
          }}
        />
        <button className="commentButton">
          <FiSend />
        </button>
      </form>

      {err ? <p>{err}</p> : null}
      {!username && logInAttempted && (
        <div className="LoginAttempt">
          <p className="LoginAttemptText">Please login to post comments</p>
          <div
            className="ToLoginButton"
            onClick={() => {
              navigate("/login");
            }}
          >
            <h2>Login</h2>
            <FaArrowCircleRight />
          </div>
        </div>
      )}

      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          setComments={setComments}
          comment={comment}
        />
      ))}
    </section>
  );
};

export default CommentsSection;
