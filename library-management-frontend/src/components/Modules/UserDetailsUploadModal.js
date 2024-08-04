import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserDetailsUploadModal = ({
  show,
  handleClose,
  handleSubmit,
  initialValues,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialValues.id ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          identity_no: Yup.string().required("Identity number is required"),
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password is required"),
          phone_no: Yup.string()
            .matches(/^\d{10}$/, "Must be a valid phone number")
            .required("Phone number is required"),
          role: Yup.string().required("Role is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
          // handleClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="">
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="identity_no">
                      Identity No
                    </label>
                  </div>
                  <div class="col-8">
                    <Field
                      name="identity_no"
                      type="text"
                      className="form-control"
                      readOnly={initialValues.id ? true : false}
                    />
                    <ErrorMessage
                      name="identity_no"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="name">
                      Name
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="email">
                      Email Id
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="email" type="text" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                {!initialValues.id ? (
                  <>
                    <div class="row align-items-center my-3">
                      <div class="col-4 text-right">
                        <label className="m-0" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div class="col-8">
                        <div className="d-flex align-items-center">
                          <Field
                            name="password"
                            className="form-control"
                            type={isPasswordVisible ? "text" : "password"}
                          />
                          <i
                            className={`ms-2 toggle-password-icon ${
                              isPasswordVisible
                                ? "fa-regular fa-eye-slash"
                                : "fa-regular fa-eye"
                            }`}
                            onClick={togglePasswordVisibility}
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="phone_no">
                      Phone No
                    </label>
                  </div>
                  <div class="col-8">
                    <Field
                      name="phone_no"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="phone_no"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="role">
                      Role
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="role" as="select" className="form-control">
                      <option value="">Select a role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {initialValues.id ? "Update User" : "Add User"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserDetailsUploadModal;
