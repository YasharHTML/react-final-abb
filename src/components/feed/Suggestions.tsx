import { Link } from "react-router-dom";
import { mockUserData } from "../../mock/suggestions";
import { useState } from "react";
import { Subscription } from "../../models/Subscription";

const Suggestions = ({ subscriptions }: { subscriptions: Subscription[] }) => {
  const [suggestions] = useState(mockUserData.data.subscribers);

  return (
    <div
      className={
        "border-gray-200 border rounded h-56 p-4 mt-8 overflow-y-scroll max-h-56"
      }
    >
      <h5 className="text-xl font-medium">Suggestions</h5>
      <div className="flex flex-col">
        {suggestions.map((suggestion) => {
          const subscriptionsArray = subscriptions || [];

          const isSubscribed = subscriptionsArray.some(
            (subName) => subName.username === suggestion.username
          );

          if (!isSubscribed) {
            return (
              <div
                className="py-2 text-lg flex items-center"
                key={suggestion.username}
              >
                <img src="../profile.jpg" className="w-8 h-8" alt="" />
                <Link to={`/profile/${suggestion.username}`}>
                  <span>{"@" + suggestion.username}</span>
                </Link>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Suggestions;
