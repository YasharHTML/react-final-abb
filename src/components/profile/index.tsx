import { useEffect } from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import UserPosts from "./UserPosts/UserPosts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { fetchUser } from "../../features/user/userSlice";
import ErrorPage from "../../pages/ErrorPage";
import PostModal from "./PostModal/PostModal";

const UserProfile = () => {
  const { username } = useParams();
  const loading = useSelector((state: RootState) => state.user.loading);
  const posts = useSelector((state: RootState) => state.user.user.posts);
  const error = useSelector((state: RootState) => state.user.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(username) as any);
  }, [dispatch, username]);

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="container mx-auto">
          <div className="text-black pt-4 pb-10">
            {loading ? (
              <p className="text-2xl text-center">Loading...</p>
            ) : error ? (
              <ErrorPage />
            ) : (
              <>
                <ProfileHeader />

                {posts && posts.length ? (
                  <>
                    <UserPosts />
                  </>
                ) : (
                  <h1 className="text-center text-2xl mt-16">No posts yet</h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <PostModal />
    </>
  );
};

export default UserProfile;
