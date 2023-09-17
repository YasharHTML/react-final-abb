import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../features/feed/feedSlice";
import { RootState } from "../store";
import FeedItem from "../components/feed/FeedItem";

type FeedItemType = {
  postId: string;
  authorUsername: string;
  imageUrl: string;
  timestamp: number;
  caption: string;
};

export default function HomePage() {
  const feed = useSelector(
    (state: RootState) => state.feed.posts
  ) as FeedItemType[];
  const token = useSelector((state: RootState) => state.auth.token);

  const sortedFeed = [...feed].sort((a, b) => b.timestamp - a.timestamp);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFeedPosts() as any);
    }
  }, [token, dispatch]);

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {token ? (
              <>
                {sortedFeed.map((feedPost: any) => {
                  return <FeedItem key={feedPost.postId} feedPost={feedPost} />;
                })}
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
