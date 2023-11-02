import { useFormik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { passwordValidate } from "../helper/validate";
import styles from "../styles/username.module.css";

const Recovery = () => {
  const formik = useFormik({
    initialValues: {
      password: "admin@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder="false"></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Enter OTP to recover password.
            </span>
          </div>
          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to you email address
                </span>
                <input
                  {...formik.getFieldProps("password")}
                  className={styles.text_box}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Cant't get OTP?{" "}
                <Link className="text-red-500" to="/recovery">
                  Resend
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
