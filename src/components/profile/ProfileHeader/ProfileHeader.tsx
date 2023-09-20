import { useState } from "react";
import { subscribe, unsubscribe } from "../../../features/user/userSlice";
import { RootState } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";

const ProfileHeader = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const username = useSelector((state: RootState) => state.auth.username);
  const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(
    user.subscribers.some((subscriber) => subscriber.username === username)
  );

  const dispatch = useDispatch();

  const handleFollow = async () => {
    const userInfo = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    try {
      if (!isUserSubscribed && username !== user.username) {
        await dispatch(subscribe(userInfo) as any);
        setIsUserSubscribed(true);
      } else {
        await dispatch(unsubscribe(user.username) as any);
        setIsUserSubscribed(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-11/12 mx-auto flex flex-row items-center justify-center sm:flex-col xs:flex-col md:flex-row lg:flex-row">
      <div className="border-transparent border-4">
        <img
          src="../profile.jpg"
          className="w-40 h-40 object-cover rounded-full bg-gray-200"
          alt=""
        />
      </div>
      <div className="flex items-center lg:ml-20 md:ml-20 sm:ml-0">
          <h3 className="text-2xl">{"@" + user.username}</h3>

        {user.username !== username ? (
          <button
            onClick={handleFollow}
            className="ml-12 font-bold bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
          >
            {isUserSubscribed ? "Unfollow" : "Follow"}
          </button>
        ) : (
          ""
        )}
      </div>
      
    </div>
  );
};

export default ProfileHeader;
