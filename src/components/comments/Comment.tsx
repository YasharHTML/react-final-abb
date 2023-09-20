import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";

const Comment = ({
  authorUsername,
  text,
  containerClassName,
  closeModal,
  deleteComment,
}: {
  authorUsername: string;
  commentId: string;
  text: string;
  containerClassName: string;
  closeModal?: () => void;
  deleteComment?: () => void;
}) => {
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <div className={containerClassName}>
      <h5 className="text-base font-medium flex items-center">
        {closeModal ? (
          <Link to={`/profile/${authorUsername}`} onClick={closeModal}>
            {authorUsername}
          </Link>
        ) : (
          <Link to={`/profile/${authorUsername}`}>{authorUsername}</Link>
        )}
        <span className="ml-1 font-normal">{text}</span>
        {username === authorUsername ? (
          <span className="ml-auto mr-4">
            <AiOutlineDelete
              className="cursor-pointer text-red-600"
              onClick={deleteComment}
            />
          </span>
        ) : (
          ""
        )}
      </h5>
    </div>
  );
};

export default Comment;
