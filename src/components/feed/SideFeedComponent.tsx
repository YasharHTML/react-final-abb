import { FeedItemType } from "../../models/FeedItemType";
import { Subscription } from "../../models/Subscription";

export default function SideFeedComponent({
    subscriptions,
    className,
}: {
    subscriptions: Subscription[];
    className: string;
}) {
    return (
        <div className={"border-gray-200 border h-min p-4 mt-8 " + className}>
            {subscriptions.map((value, index) => {
                return (
                    <div key={index} className="flex">
                        <div>{value.username}</div>
                        <div className="flex-auto"></div>
                        <div>
                            {value.firstName} {value.lastName}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
