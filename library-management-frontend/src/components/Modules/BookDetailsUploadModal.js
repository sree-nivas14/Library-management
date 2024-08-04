import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import isValid from "date-fns/isValid";
import parse from "date-fns/parse";

const validDateFormat = "yyyy/MM/dd";
const validateDate = (value) => {
  const parsedDate = parse(value, validDateFormat, new Date());
  return isValid(parsedDate);
};

const dateValidation = Yup.string()
  .matches(/^\d{4}\/\d{2}\/\d{2}$/, "Date must be in yyyy/mm/dd format")
  .test("is-valid-date", "Invalid date", (value) => validateDate(value))
  .required("Date is required");

const BookDetailsUploadModal = ({
  show,
  handleClose,
  handleSubmit,
  initialValues,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialValues.id ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          author: Yup.string().required("Author name is required"),
          isbn: Yup.string()
            .required("ISBN is required")
            .matches(
              /^\d{10}(\d{3})?$/,
              "Identity number must be 10 or 13 digits"
            ),
          genre: Yup.string().required("Genre is required"),
          publication_date: dateValidation,
          copies: Yup.string().required("Copies is required"),
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
                    <label className="m-0" htmlFor="title">
                      Title
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="title" type="text" className="form-control" />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="author">
                      Author
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="author" type="text" className="form-control" />
                    <ErrorMessage
                      name="author"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="isbn">
                      ISBN
                    </label>
                  </div>
                  <div class="col-8">
                    <Field
                      name="isbn"
                      type="text"
                      className="form-control"
                      readOnly={initialValues.id ? true : false}
                    />
                    <ErrorMessage
                      name="isbn"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="genre">
                      Genre
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="genre" type="text" className="form-control" />
                    <ErrorMessage
                      name="genre"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="publication_date">
                      Publication Date
                    </label>
                  </div>
                  <div class="col-8">
                    <Field
                      name="publication_date"
                      type="text"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="publication_date"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="copies">
                      Copies
                    </label>
                  </div>
                  <div class="col-8">
                    <Field name="copies" type="text" className="form-control" />
                    <ErrorMessage
                      name="copies"
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
                {initialValues.id ? "Update Book" : "Add Book"}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BookDetailsUploadModal;
