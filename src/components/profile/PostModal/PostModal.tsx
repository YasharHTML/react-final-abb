import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../features/modal/modalSlice";
import { RootState } from "../../../store";
import {
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineSend,
  AiFillHeart,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Comment from "../../comments/Comment";
import { Post } from "../../../models/Post";
import { UserData } from "../../../models/UserData";
import { Comments } from "../../../models/Comment";
import usePostActions from "../../../utils/usePostActions";
import { deletePost } from "../../../features/post/postSlice";

const PostModal = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const post = useSelector((state: RootState) => state.modal.post) as Post;
  const user = useSelector((state: RootState) => state.user.user) as UserData;
  const username = useSelector((state: RootState) => state.auth.username);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModal({ isModalOpen: false, post: null }));
  };

  const handleLikeCallback = () => {
    window.location.reload();
  };

  const postActions = usePostActions(
    post?.postId,
    post?.likes,
    post?.comments,
    handleLikeCallback
  );

  const formatDate = (postTime: number) => {
    const timestamp = postTime;
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmed) {
        await dispatch(deletePost(postId) as any);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isModalOpen ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div
            className="w-full h-full bg-black opacity-50"
            onClick={closeModal}
          ></div>

          <div
            className="fixed top-4 right-4 cursor-pointer"
            onClick={closeModal}
          >
            <AiOutlineClose className="text-white text-4xl" />
          </div>

          <div className="bg-white overflow-hidden rounded-sm w-8/12  h-5/6 my-auto mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-black flex h-full">
              <div
                className="w-8/12 flex h-full justify-center"
                onDoubleClick={postActions.handleLike}
              >
                <img
                  src={post.imageUrl}
                  className="max-w-full w-full object-cover cursor-pointer"
                  alt=""
                />
              </div>
              <div className="border-l border-gray-200 w-4/12">
                <div className="border-b border-gray-200 py-2 px-3 sticky top-0 bg-white overflow-x-auto">
                  <div className="flex items-center">
                    <div className="w-12 h-12">
                      <img
                        src="../profile.jpg"
                        className="w-12 h-12 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <h6 className="text-sm font-medium">{user.username}</h6>
                      <h5 className="text-xs">{post.location}</h5>
                    </div>
                  </div>
                </div>
                {post.caption ? (
                  <div className="px-3 pt-2">
                    <h5 className="text-base font-medium">
                      {post.authorUsername}
                      <span className="ml-1 font-normal">{post.caption}</span>
                    </h5>
                  </div>
                ) : (
                  ""
                )}

                <div className="pb-2 px-3 overflow-y-auto flex-grow max-h-[300px] ">
                  {postActions.localComments.map((comment: Comments) => {
                    return (
                      <Comment
                        key={comment.commentId}
                        authorUsername={comment.authorUsername}
                        commentId={comment.commentId}
                        text={comment.text}
                        containerClassName="flex items-center mt-1"
                        closeModal={closeModal}
                        deleteComment={() =>
                          postActions.handleDeleteComment(comment.commentId)
                        }
                      />
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 py-2 px-3 fixed bottom-0 bg-white w-full">
                  <div className="flex gap-3 mb-2">
                    <span className="cursor-pointer text-3xl">
                      {postActions.isLiked ? (
                        <AiFillHeart
                          className="text-red-600"
                          onClick={postActions.handleLike}
                        />
                      ) : (
                        <AiOutlineHeart onClick={postActions.handleLike} />
                      )}
                    </span>
                    <span className="cursor-pointer text-3xl">
                      <FaRegComment />
                    </span>
                    {username === post.authorUsername ? (
                      <span className="cursor-pointer text-3xl">
                        <AiOutlineDelete
                          className="text-red-600"
                          onClick={() => handleDeletePost(post.postId)}
                        />
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  {postActions.likeCount ? (
                    <>
                      <h5 className="text-base">
                        Liked by
                        <span className="mr-1 ml-1 text-base font-medium">
                          {postActions.initialLikes[0]?.authorUsername}
                        </span>
                        {postActions.likeCount > 1 ? (
                          <>
                            and
                            <span className="text-base font-medium ml-1">
                              {postActions.likeCount - 1}
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </h5>
                    </>
                  ) : (
                    ""
                  )}

                  <span>{formatDate(post.timestamp)}</span>

                  <div className="bg-white rounded-sm shadow-md py-2 px-1">
                    <div className="flex items-center">
                      <form
                        className="flex w-full"
                        onSubmit={postActions.handleComment}
                      >
                        <input
                          id="postComment"
                          name="postComment"
                          type="text"
                          placeholder="Add a comment..."
                          value={postActions.comment}
                          onChange={(e) =>
                            postActions.setComment(e.target.value)
                          }
                          className="p-1 rounded-sm focus:outline-none focus:border-blue-500"
                        />
                        <button className="ml-2  text-white font-semibold px-1 py-1 rounded-sm text-2xl">
                          <AiOutlineSend className="text-black" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PostModal;
