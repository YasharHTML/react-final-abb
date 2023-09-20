import { Link } from "react-router-dom";
import { useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineSend,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Comment from "../comments/Comment";
import usePostActions from "../../utils/usePostActions";

const FeedItem = ({ feedPost }: any) => {
  const { 
    isLiked,
    likeCount,
    comment,
    localComments,
    handleLike,
    handleComment,
    handleDeleteComment,
    setComment,
  } = usePostActions(feedPost.postId, feedPost.likes, feedPost.comments);


  const [showAll, setShowAll] = useState(false);
  const filteredComments = showAll ? localComments : localComments.slice(-1);

  const formatDate = (postTime: number): string => {
    const now = new Date();
    const postDate = new Date(postTime * 1000);

    const timeDifference = Math.floor(
      (now.getTime() - postDate.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (timeDifference === 0) {
      return "today";
    } else if (timeDifference === 1) {
      return "yesterday";
    } else if (timeDifference <= 7) {
      return `${timeDifference}d`;
    } else {
      return `${timeDifference}w`;
    }
  };


  return (
    <>
      <div className="my-8 w-4/6 xs:w-5/6 lg:w-4/6 xl:w-4/6 py-1 border-gray-200 border">
        <div className="flex items-center">
          <div>
            <img
              src="../profile.jpg"
              className="w-12 h-12 rounded-full"
              alt=""
            />
          </div>
          <h5 className="ml-2">
            <Link to={`/profile/${feedPost.authorUsername}`}>
              {feedPost.authorUsername}
            </Link>
          </h5>
          <span className="ml-2">{formatDate(feedPost.timestamp)}</span>
        </div>
        <div className="my-2">
          <img
            onDoubleClick={handleLike}
            src={feedPost.imageUrl}
            className="max-w-full w-full object-cover min-h-full max-h-96 cursor-pointer"
            alt=""
          />
        </div>
        <div className="flex gap-3 items-center">
          <span className="cursor-pointer text-3xl">
            {isLiked ? (
              <AiFillHeart
                className="text-red-600"
                onClick={handleLike}
              />
            ) : (
              <AiOutlineHeart onClick={handleLike} />
            )}
          </span>
          <span className="cursor-pointer text-3xl">
            <FaRegComment />
          </span>
        </div>

        <div className="ml-1">
          {likeCount ? (
            <>
              <h5 className="text-base font-medium">
                {likeCount}
                <span className="text-base ml-1">likes</span>
              </h5>
            </>
          ) : (
            ""
          )}
        </div>
        {feedPost.caption ? (
          <div className="ml-1">
            <h5 className="text-base font-medium">
              {feedPost.authorUsername}
              <span className="ml-1 font-normal">{feedPost.caption}</span>
            </h5>
          </div>
        ) : (
          ""
        )}

        {localComments.length ? (
          <>
            {!showAll && localComments.length > 1 ? (
              <button onClick={() => setShowAll(true)} className="ml-1">
                <AiOutlinePlusCircle className="text-2xl mt-2" />
              </button>
            ) : (
              ""
            )}
            {filteredComments.map(
              (comment: {
                authorUsername: string;
                commentId: string;
                text: string;
              }) => {
                return (
                  <Comment
                    key={comment.commentId}
                    authorUsername={comment.authorUsername}
                    commentId={comment.commentId}
                    text={comment.text}
                    containerClassName="ml-1"
                    deleteComment={() => handleDeleteComment(comment.commentId)}
                  />
                );
              }
            )}
          </>
        ) : (
          ""
        )}

        <div className="bg-white rounded-sm shadow-md py-2 px-1">
          <div className="flex items-center">
            <form
              onSubmit={handleComment}
              className="flex w-full"
            >
              <input
                id="postComment"
                name="postComment"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full  p-1 rounded-sm focus:outline-none focus:border-blue-500"
              />
              <button className="ml-2  text-white font-semibold px-1 py-1 rounded-sm text-2xl">
                <AiOutlineSend className="text-black" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedItem;
