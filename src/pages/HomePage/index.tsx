import { useEffect } from "react";
import ImageBox from "./ImageBox";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPosts } from "../../features/feed/feedSlice";
import { RootState } from "../../store";
import FeedItem from "../../components/feed/FeedItem";

type FeedItemType = {
  postId: string;
  authorUsername: string;
  imageUrl: string;
  timestamp: number;
  caption: string;
};


export default function HomePage() {
  const feed = useSelector((state: RootState) => state.feed.posts) as FeedItemType[];
  const sortedFeed = [...feed].sort((a, b) => b.timestamp  - a.timestamp) ;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedPosts() as any);
  }, [dispatch]);

  return (
    <>
      <ImageBox />
      {sortedFeed.map((feedPost: any) => {
        return <FeedItem key={feedPost.postId} feedPost={feedPost} />;
      })}
    </>
  );
}
