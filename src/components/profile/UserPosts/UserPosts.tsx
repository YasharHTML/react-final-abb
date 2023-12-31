import { PostItem } from "../PostItem/PostItem";
import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";
import ProfileLayout from "../ProfileLayout/ProfileLayout";
import { Post } from "../../../models/Post";

const UserPosts = () => {
  const posts = useSelector(
    (state: RootState) => state.user.user.posts
  ) as Post[];

  

  const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <ProfileLayout>
      {sortedPosts.map((post: Post) => {
        return <PostItem post={post} key={post.postId} isInProfile={true} />;
      })}
    </ProfileLayout>
  );
};

export default UserPosts;
