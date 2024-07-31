import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sign_in.css";
import { useNavigate } from "react-router-dom";
import helpers from "../Services/Helper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../AuthContext";

function Sign_in() {
  const [mail, setMail] = useState();
  const [password, setpassword] = useState();
  const [question_count, setQuestion_count] = useState(4);
  const [timer, setTimer] = useState(1);
  const navigate = useNavigate();
  const { login } = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(4, "Must be at least 4 characters"),
  });

  return (
    <>
      <div className="sign_in_bg_image">
        <ToastContainer position="top-right" theme="dark" />

        <div className="">
          <div className="background ">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>

          <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              document.getElementById("fp-container").style.visibility =
                "visible";
              if (!mail == "" && !password == "") {
                var data = {
                  email: mail,
                  password: password,
                };

                helpers
                  .register(data)
                  .then(function (response) {
                    document.getElementById("fp-container").style.visibility =
                      "hidden";
                    if (response.data != 1) {
                      // console.log(response.data.role);
                      // window.sessionStorage.setItem("username", username);
                      window.sessionStorage.setItem(
                        "token",
                        response.data.token.accessToken
                      );
                      login(response.data.role);
                      navigate("/Dashboard");
                    } else {
                      toast("Invalid Credentials.", {
                        type: "error",
                      });
                    }
                  })
                  .catch(function (error) {
                    document.getElementById("fp-container").style.visibility =
                      "hidden";
                    alert(error.message);
                  });
                // navigate("/logout");
              } else {
                document.getElementById("fp-container").style.visibility =
                  "hidden";
                toast("Pls fill all the fields", { type: "error" });
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form
                className="form overflow-hidden"
                noValidate
                onSubmit={handleSubmit}
              >
                <h3>Login Here</h3>
                <div className="mt-5">
                  <label htmlFor="username">Mail ID</label>
                  <input
                    className="input"
                    onChange={(e) => {
                      setMail(e.target.value);
                      handleChange(e);
                    }}
                    type="email"
                    name="email"
                    // onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter email id"
                    id="email"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="error text-danger">
                    {errors.email && touched.email && errors.email}
                  </p>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                    className="input"
                    value={values.password}
                    // onChange={handleChange}
                    onChange={(e) => {
                      setpassword(e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  <p className="error text-danger">
                    {errors.password && touched.password && errors.password}
                  </p>
                  <button
                    className="button mt-5"
                    type="submit"
                    // onClick={(e) => {
                    //   handle_click(e);
                    // }}
                  >
                    Log In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div
          className="fp-container"
          id="fp-container"
          style={{ visibility: "hidden" }}
        >
          <i
            className="fas fa-spinner fa-pulse fp-loader"
            style={{ fontSize: "70px", float: "center" }}
          ></i>
        </div>
      </div>
    </>
  );
}
export default Sign_in;
