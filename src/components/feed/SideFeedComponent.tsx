import { Link } from "react-router-dom";
import { Subscription } from "../../models/Subscription";

export default function SideFeedComponent({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) {
  return (
    <div
      className={
        "border-gray-200 border rounded h-56 p-4 mt-8 overflow-y-scroll max-h-56"
      }
    >
      <h5 className="text-xl font-medium">Follow List</h5>
      <div className="flex flex-col">
        {subscriptions.map((value) => {
          return (
            <div key={value.username + Math.random() * 100} className="py-2 text-lg flex items-center">
              <img src="../profile.jpg" className="w-8 h-8" alt="" />
              <Link to={`/profile/${value.username}`}>
                <span>{"@" + value.username}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
