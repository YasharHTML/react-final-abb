import { PostItem } from "../PostItem/PostItem";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";


const UserPosts = () => {
  const posts = useSelector((state: RootState) => state.user.user.posts);

  

  return (
    <div className="mt-12">
      <div className="pt-12 border-t border-gray-200 grid grid-cols-3 xs:gap-2 lg:gap-12 md:gap-8 sm:gap-4">
        {posts.length ? (
          posts.map((post) => {
            return <PostItem post={post} key={post["postId"]} />;
          })
        ) : (
          <h1 className="text-center text-2xl">No posts yet</h1>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
