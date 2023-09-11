import { Link, useNavigate } from "react-router-dom";
import { InstagramIcon } from "../../../icons/InstagramIcon";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

const Header = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleLogout =()=> {
    dispatch(logout())
    navigate('/auth/login')
    
  }
  return (
    <header>
      <nav className="bg-white border-gray-200 border-b px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto ">
          <Link to="/">
            <span>
              <InstagramIcon fill="#000" width={103} height={29} />
            </span>
          </Link>

          <div className="flex items-center">
            {token ? (
              <button
              onClick={handleLogout} 
              className="text-gray-800 cursor-pointer hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                Logout
              </button>
            ) : (
              <>
                <Link to="/auth/login">
                  <button className="text-gray-800 cursor-pointer hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Log in
                  </button>
                </Link>
                <Link to="/auth/register">
                  <button className="text-gray-800 cursor-pointer hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
