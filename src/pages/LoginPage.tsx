import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginSchema } from "../components/form/login/Validation";
import { RootState } from "../store";

interface Credentials {
  username: string;
  password: string;
}

export default function LoginPage() {
  const error = useSelector((state: RootState) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-white-100 p-6">
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const credentials: Credentials = {
                username: values.username,
                password: values.password,
              };

              try {
                const result = await dispatch(loginUser(credentials) as any);
                if (loginUser.fulfilled.match(result)) {
                  setSubmitting(false);
                  
                  navigate("/");
                }
              } catch (error) {
                
                console.error("Login error:", error);
                setSubmitting(false);
              }
            }}
            validationSchema={LoginSchema}
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
                    autoComplete="off"
                    placeholder="username"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    className="error-message text-red-600 text-sm font-medium"
                    name="username"
                    component="div"
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
                    autoComplete="off"
                    placeholder="********"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    className="error-message text-red-600 text-sm font-medium"
                    name="password"
                    component="div"
                  />
                </div>
                <div>
                  <h5>
                    Don't have an account?
                    <Link to="/auth/register" className="ml-1 text-blue-500">
                      Sign Up
                    </Link>
                  </h5>
                </div>
                {error && (
                  <div>
                    <h5 className="text-red-600 font-medium">
                      Password or Username is incorrect
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
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
