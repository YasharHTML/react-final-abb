import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { RootState } from "../store";
import * as Yup from "yup";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);

  return (
    <>
      <div className="bg-white-100 p-6">
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("Username is required")
                .min(4, "Username must be at least 4 characters long"),
              firstName: Yup.string().required("First Name is required"),
              lastName: Yup.string().required("Last Name is required"),
              password: Yup.string()
                .required("Password is required")
                .min(6, "Password must contain from 6 to 32 characters")
                .max(32, "Password must contain from 6 to 32 characters"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const credentials = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                password: values.password,
              };

              try {
                const result = await dispatch(registerUser(credentials) as any);
                if (registerUser.fulfilled.match(result)) {
                  setSubmitting(false);
                  navigate("/");
                }
              } catch (error) {
                console.error("Login error:", error);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {error && (
                  <div>
                    <h5 className="text-red-600 font-medium">
                        Error occurred
                    </h5>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={
                    isValid
                      ? "hover:bg-blue-600  focus:bg-blue-600 bg-blue-500 text-white mt-3 py-2 px-4 rounded-full focus:outline-none"
                      : "bg-blue-500 text-white mt-3 py-2 px-4 rounded-full focus:outline-none"
                  }
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
