import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  username: Yup.string().min(2).max(20).required("Username is required"),
  password: Yup.string().min(2).required("Password is required"),
});
