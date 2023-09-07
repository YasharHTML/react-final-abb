import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../features/modal/modalSlice";
import { RootState } from "../../store";
import { CloseIcon } from "../../icons/CloseIcon";

interface Comment {
  commentId: string;
  authorUsername: string;
  text: string;
}
interface Post {
  caption: string;
  imageUrl:string;
  comments: Comment[];
}

const PostModal = () => {
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.isModalOpen
  );
  const post = useSelector((state: RootState) => state.modal.post) as Post;
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

    console.log(post)
  const closeModal = () => {
    dispatch(setModal({ isModalOpen: false, post: null }));
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

          <div className="bg-white overflow-hidden rounded-sm w-8/12 h-5/6 my-auto mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-black flex h-full">
              <div className="w-8/12 flex h-full justify-center">
                <img
                  src={post.imageUrl}
                  className="max-w-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="border-l border-gray-200 w-4/12">
                <div className="flex items-center py-2 px-3 border-b border-gray-200">
                  <div className="w-12 h-12">
                    <img
                      src="../profile.jpg"
                      className="max-w-full w-full h-full rounded-full"
                      alt=""
                    />
                  </div>
                  <h6 className="ml-4">{user.username}</h6>
                </div>
                <div className="w-full">
                  <div className="py-2 px-3 border-b border-gray-200">
                    {post["comments"].map((comment) => {
                      return (
                        <>
                          <div>
                            {comment.authorUsername}: {comment.text}
                          </div>
                        </>
                      );
                    })}
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
