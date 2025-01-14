import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../Redux/AuthSlice.tsx";
import { RootState } from "../../Redux/Store";
import { emailRegex, passwordRegex } from "../../Validations/regex.ts";
import { Eye, EyeOff } from "lucide-react";

const LoginModal = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const errorMessage = useSelector((state: RootState) => state.auth.errorMessage);

  const handleToggle = () => {
    setIsSignUp((pre) => !pre);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: { email?: string; password?: string; confirmPassword?: string } = {};

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Validate password (only apply regex for sign-up)
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (isSignUp && !passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one letter and one number";
    }

    // Validate confirm password (only for sign-up)
    if (isSignUp) {
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission for login or signup
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isSignUp) {
        // Dispatch sign-up action
        dispatch(signup({ email: formData.email, password: formData.password }));
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Dispatch login action
        dispatch(login({ email: formData.email, password: formData.password }));
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  useEffect(() => {
    if (isAuth && !error) {
      navigate(isSignUp ? "/login" : "/");
    }
  }, [error, isAuth]);

  return (
    <section className="bg-gray-200 dark:bg-gray-900 min-h-screen">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
        <div className="w-full place-self-center lg:col-span-6">
          <div className="p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl sm:p-8">
            <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>

            <form className="mt-4 space-y-6 sm:mt-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-1">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center">
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mt-6 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)} // Toggle password visibility
                  className="absolute mt-3 right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                >
                  {isPasswordVisible ?  <Eye /> :   <EyeOff />}
                </button>
                {formErrors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center">
                    {formErrors.password}
                  </p>
                )}
              </div>
              {isSignUp && (
                <div className="mt-6 relative">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)} // Toggle confirm password visibility
                    className="absolute mt-3 right-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400"
                  >
                    {isConfirmPasswordVisible ?  <Eye /> :   <EyeOff />}
                  </button>
                  {formErrors.confirmPassword && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
              {error && errorMessage && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isSignUp ? "Sign up" : "Sign in"} to your account
              </button>
            </form>

            <div className="flex justify-center mt-4">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={handleToggle}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={handleToggle}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mr-auto place-self-center lg:col-span-6">
          <img
            className="hidden mx-auto lg:flex"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt="illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
