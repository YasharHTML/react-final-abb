import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  likePost,
  removeLike,
} from "../features/post/postSlice";
import { RootState } from "../store";
import { Comments } from "../models/Comment";

const usePostActions = (
  postId: string,
  initialLikes: any[] = [],
  initialComments: any[] = [],
  afterLikeCallback?: () => void
) => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);

  const [isLiked, setIsLiked] = useState(
    initialLikes
      ? initialLikes.some((like: any) => like.authorUsername === username)
      : false
  );
  const [likeCount, setLikeCount] = useState(initialLikes.length);
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState<Comments[]>([]);

  useEffect(() => {
    setLikeCount(initialLikes.length);
    setIsLiked(
      initialLikes.some((like: any) => like.authorUsername === username)
    );
  }, [initialLikes, username]);

  useEffect(() => {
    if (initialComments.length > 0 && !localComments.length) {
      setLocalComments(initialComments);
    }
  }, [initialComments, localComments]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await dispatch(removeLike(postId) as any);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);

      } else {
        await dispatch(likePost(postId) as any);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
      if (afterLikeCallback) {
        afterLikeCallback();
      }

      setIsLiked(!isLiked);

    

    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim().length > 0) {
      const commentData = {
        postId: postId,
        text: comment,
        authorUsername: username,
      };

      try {
        const response = await dispatch(addComment(commentData) as any);
        const newComment = response.payload;
        setLocalComments((prevState) => [...prevState, newComment]);
      } catch (error) {
        console.error(error);
      }
    }
    setComment("");
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const commentToDelete = localComments.find(
        (comment) => comment.commentId === commentId
      );

      if (commentToDelete && commentToDelete.authorUsername === username) {
        await dispatch(deleteComment(commentId) as any);

        setLocalComments((prevState) =>
          prevState.filter((comment) => comment.commentId !== commentId)
        );
      } else {
        console.warn("You can only delete your own comments.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isLiked,
    likeCount,
    comment,
    localComments,
    handleLike,
    handleComment,
    handleDeleteComment,
    setComment,
    initialLikes,
  };
};

export default usePostActions;
