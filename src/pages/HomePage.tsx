import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../features/feed/feedSlice";
import { RootState } from "../store";
import FeedItem from "../components/feed/FeedItem";
import { FeedItemType } from "../models/FeedItemType";
import SideFeedComponent from "../components/feed/SideFeedComponent";
import { fetchUser } from "../features/user/userSlice";
import Suggestions from "../components/feed/Suggestions";

export default function HomePage() {
  const feed = useSelector(
    (state: RootState) => state.feed.posts
  ) as FeedItemType[];

  const subscriptions = useSelector(
    (state: RootState) => state.user.user.subscriptions
  );

  const token = useSelector((state: RootState) => state.auth.token);

  const sortedFeed = [...feed].sort((a, b) => b.timestamp - a.timestamp);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getFeedPosts() as any);
      dispatch(fetchUser(undefined) as any);
    }
  }, [token, dispatch]);


  return (
    <>
      <div className="w-full min-h-screen">
        <div className="container mx-auto flex lg:flex-row md:flex-row sm:flex-col xs:flex-col">
          <div className="flex flex-col items-center w-full xs:order-2 sm:order-2 md:order-1 lg:order-1">
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
          <div className="w-2/6 lg:w-2/6 md:w-2/6 sm:w-full xs:w-full xs:order-1 sm:order-1 md:order-2 lg:order-2">
            {subscriptions && (
              <SideFeedComponent
                subscriptions={subscriptions}
              />
            )}
            <Suggestions subscriptions={subscriptions}/>
          </div>
        </div>
      </div>
    </>
  );
}
