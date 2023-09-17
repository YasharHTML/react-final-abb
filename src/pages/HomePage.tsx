import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../features/feed/feedSlice";
import { RootState } from "../store";
import FeedItem from "../components/feed/FeedItem";
import { FeedItemType } from "../models/FeedItemType";
import SideFeedComponent from "../components/feed/SideFeedComponent";
import { fetchUser } from "../features/user/userSlice";

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
                <div className="container mx-auto flex">
                    <div className="flex flex-col items-center w-full">
                        {subscriptions && (
                            <SideFeedComponent
                                subscriptions={subscriptions}
                                className="xl:hidden block w-3/6"
                            />
                        )}
                        {token ? (
                            <>
                                {sortedFeed.map((feedPost: any) => {
                                    return (
                                        <FeedItem
                                            key={feedPost.postId}
                                            feedPost={feedPost}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <h1>Loading...</h1>
                        )}
                    </div>
                    {subscriptions && (
                        <SideFeedComponent
                            subscriptions={subscriptions}
                            className="hidden xl:block min-w-[300px]"
                        />
                    )}
                </div>
            </div>
        </>
    );
}
