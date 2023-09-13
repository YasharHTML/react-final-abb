import { Link } from "react-router-dom";
import { LikeIcon } from "../../icons/LikeIcon";
import { CommentIcon } from "../../icons/CommentIcon";

const FeedItem = ({ feedPost }: any) => {

  console.log(feedPost);

  const formatDate = (postTime: number): string => {
    const now = new Date();
    const postDate = new Date(postTime * 1000);

    const timeDifference = Math.floor(
      (now.getTime() - postDate.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (timeDifference === 0) {
      return "today";
    } else if (timeDifference === 1) {
      return "yesterday";
    } else if (timeDifference <= 7) {
      return `${timeDifference}d`;
    } else {
      return `${timeDifference}w`;
    }
  };

  return (
    <>
      <div className="feed-wrapper">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <div className="my-8 w-3/6 py-1 border-gray-200 border">
              <div className="flex items-center">
                <div className="img-circle">
                  <img
                    src="../profile.jpg"
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </div>
                <h5 className="ml-2">
                  <Link to={`/profile/${feedPost.authorUsername}`}>
                    {feedPost.authorUsername}
                  </Link>
                </h5>
                <span className="ml-2">{formatDate(feedPost.timestamp)}</span>
              </div>
              <div className="my-2">
                <img
                  src={feedPost.imageUrl}
                  className="max-w-full w-full object-cover min-h-full max-h-96"
                  alt=""
                />
              </div>
              <div className="flex gap-3 items-center">
                <span className="cursor-pointer">
                  <LikeIcon />
                </span>
                <span className="cursor-pointer">
                  <CommentIcon />
                </span>
              </div>
              <div className="">
                {feedPost.likes.length ? (
                  <>
                    <h5 className="text-base font-medium">
                      {feedPost.likes.length}
                      <span className="text-base ml-1">likes</span>
                    </h5>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedItem;
