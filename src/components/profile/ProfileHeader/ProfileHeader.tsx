import { RootState } from "../../../store/index";
import { useSelector } from "react-redux";


const ProfileHeader = () => {
  const user = useSelector((state: RootState) => state.user.user);

  
  return (
    <div className="w-11/12 mx-auto flex flex-row items-center justify-center sm:flex-col xs:flex-col md:flex-row lg:flex-row">
      <div className="border-transparent border-4">
        <img
          src="../profile.jpg"
          className="max-w-full w-40 h-40 object-cover rounded-full bg-gray-200"
          alt=""
        />
      </div>
      <div className="flex items-center lg:ml-20 md:ml-20 sm:ml-0">
        <h3 className="text-2xl">{'@'+ user.username}</h3>
        <button className="ml-12 font-bold bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded">
          Follow
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
