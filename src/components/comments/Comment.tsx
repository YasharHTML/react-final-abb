import { Link } from "react-router-dom";

const Comment = ({
  authorUsername,
  text,
  containerClassName,
  closeModal,
}: {
  authorUsername: string;
  commentId: string;
  text: string;
  containerClassName: string;
  closeModal?: ()=>void;
}) => {
  return (
    <div className={containerClassName}>
      <h5 className="text-base font-medium">
        {closeModal ? (
          <Link to={`/profile/${authorUsername}`} onClick={closeModal}>
            {authorUsername}
          </Link>
        ) : (
          <Link to={`/profile/${authorUsername}`}>{authorUsername}</Link>
        )}

        <span className="ml-1 font-normal">{text}</span>
      </h5>
    </div>
  );
};

export default Comment;
