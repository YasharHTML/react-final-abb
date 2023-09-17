import { Post } from "./Post";
import { Subscribers } from "./Subscriber";
import { Subscription } from "./Subscription";

export interface UserData {
    username: string;
    firstName: string;
    lastName: string;
    posts: Post[];
    subscriptions: Subscription[];
    subscribers: Subscribers[];
}
