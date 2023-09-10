import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let credentials = {
      username: username,
      password: password,
    };
    dispatch(loginUser(credentials) as any).then((result: any) => {
      if (result.payload) {
        setUsername("");
        setPassword("");
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="bg-white-100 p-6">
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="false"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
                <h5>
                Don't have an account? 
                <Link to='/auth/register' className="ml-1 text-blue-500">Sign Up</Link>
                </h5>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white mt-3 py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
