import { Comments } from "./Comment";
import { Likes } from "./Like";

export interface Post {
    authorUsername: string;
    postId: string;
    caption: string;
    imageUrl: string;
    comments: Comments[];
    likes: Likes[];
    location: string;
    timestamp: number;
}
