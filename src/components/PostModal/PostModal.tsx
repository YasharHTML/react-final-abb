import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";
import { RootState } from "../../store";
import { CloseIcon } from "../../icons/CloseIcon";
import { UserData } from "../../features/user/userSlice";
import { Comments, Post } from "../../features/user/userSlice";
import { LikeIcon } from "../../icons/LikeIcon";
import { CommentIcon } from "../../icons/CommentIcon";

const PostModal = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const post = useSelector((state: RootState) => state.modal.post) as Post;
  const user = useSelector((state: RootState) => state.user.user) as UserData;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setModal({ isModalOpen: false, post: null }));
  };

  const formatDate = (postTime: number) => {
    const timestamp = postTime;
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
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
            <CloseIcon fill="#fff" size={36} />
          </div>

          <div className="bg-white overflow-hidden rounded-sm w-8/12  h-5/6 my-auto mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-black flex h-full">
              <div className="w-8/12 flex h-full justify-center">
                <img
                  src={post.imageUrl}
                  className="max-w-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="border-l border-gray-200 w-4/12 overflow-y-scroll">
                <div className="border-b border-gray-200 py-2 px-3 sticky top-0 bg-white">
                  <div className="flex items-center">
                    <div className="w-12 h-12">
                      <img
                        src="../profile.jpg"
                        className="max-w-full w-full h-full rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <h6 className="text-sm font-medium">{user.username}</h6>
                      <h5 className="text-xs">{post.location}</h5>
                    </div>
                  </div>
                </div>
                <div className="py-2 px-3 overflow-y-auto flex-grow">
                  {post.comments?.map((comment: Comments) => {
                    return (
                      <div
                        key={comment.commentId}
                        className="flex items-center mt-1"
                      >
                        <h5 className="text-base font-medium">
                          {comment.authorUsername}
                        </h5>

                        <p className="text-base ml-2">{comment.text}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 py-2 px-3 fixed w-full bottom-0 bg-white">
                  <div className="flex gap-3 mb-2">
                    <span className="cursor-pointer">
                      <LikeIcon />
                    </span>
                    <span className="cursor-pointer">
                      <CommentIcon />
                    </span>
                  </div>

                  {post.likes.length ? (
                    <>
                      <h5 className="text-base">
                        Liked by
                        <span className="mr-1 ml-1 text-base font-medium">
                          {post.likes[0].authorUsername}
                        </span>
                        {post.likes.length > 1 ? (
                          <>
                            and
                            <span className="text-base font-medium ml-1">
                              {post.likes.length - 1}
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
