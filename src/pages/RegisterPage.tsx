import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";

export default function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState<{
        firstName: string;
        lastName: string;
        username: string;
        password: string;
    }>({ firstName: "", lastName: "", password: "", username: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(registerUser(user) as any);
        navigate("/");
    };

    return (
        <>
            <div className="bg-white-100 p-6">
                <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md border border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
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
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="firstName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                autoComplete="false"
                                placeholder="First Name"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="lastName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                autoComplete="false"
                                placeholder="Last Name"
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white mt-3 py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
