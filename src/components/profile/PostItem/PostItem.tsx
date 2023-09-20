import { setModal } from "../../../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

export const PostItem = ({
  post,
  isInProfile,
}: {
  post: any;
  isInProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    if (isInProfile) {
      dispatch(setModal({ isModalOpen: true, post: post }));
    }
  };
 

  return (
    <>
      <div className="cursor-pointer relative" onClick={handleOpenModal}>
        <img
          src={post.imageUrl}
          className="max-w-full object-cover xl:h-96 lg:h-72 md:h-72 sm:h-40 xs:h-40 w-full"
          alt=""
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
          <button className="text-white text-3xl">
            <AiOutlineHeart />
          </button>
          <span className="text-lg text-white ml-1">{post.likes?.length} </span>
          <button className="ml-6 text-3xl text-white">
            <FaRegComment />
          </button>
          <span className="text-lg text-white ml-1">
            {post.comments?.length}
          </span>
        </div>
      </div>
    </>
  );
};
