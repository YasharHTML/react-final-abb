import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";


export const PostItem = ({post}: any) => {
  return (
    <div className="cursor-pointer relative">
      <img
        src={post.imageUrl}
        className="max-w-full object-cover xl:h-96 lg:h-72 md:h-72 sm:h-40 xs:h-40 w-full"
        alt=""
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
        <button className="">
          <AiFillHeart className="fill-white text-2xl" />
        </button>
        <span className="text-lg text-white ml-1">{post.likes.length} </span>

        <button className="ml-6">
          <FaComment className="fill-white text-2xl" />
        </button>
        <span className="text-lg text-white ml-1">{post.comments.length}</span>
      </div>
    </div>
  );
};
