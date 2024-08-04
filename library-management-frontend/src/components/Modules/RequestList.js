import React, { useState, useEffect } from "react";
import "./Module.css";
import Datatable from "./Datatable/Datatable";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import helpers from "../Services/Helper";
import { Form, Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

function RequestList() {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState();
  const [initialDate, setInitialDate] = useState();
  const [showDueDate, setShowDueDate] = useState();
  const [isReturn, setIsReturn] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState();

  const handleClose = () => {
    setModalShow(false);
    setReturnDate();
    setInitialDate();
  };
  const handleShow = () => setModalShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isReturn) {
      if (returnDate) {
        var data = {
          id,
          return_date: moment(returnDate).format("YYYY/MM/DD"),
          status: "returned",
        };
        helpers
          .returnRequest(data)
          .then((response) => {
            document.getElementById("fp-container").style.visibility = "hidden";
            if (response.data.status == "success") {
              toast(response.data.message, {
                type: "success",
              });
              handleClose();
              getRequestList();
            }
          })
          .catch(function (error) {
            document.getElementById("fp-container").style.visibility = "hidden";
            alert(error.response.data.message);
          });
      } else {
        toast("Please provide return date", {
          type: "error",
        });
      }
    } else {
      if (startDate && endDate) {
        var data = {
          id,
          start_date: moment(startDate).format("YYYY/MM/DD"),
          end_date: moment(endDate).format("YYYY/MM/DD"),
          status: "approved",
        };
        helpers
          .approveRequest(data)
          .then((response) => {
            document.getElementById("fp-container").style.visibility = "hidden";
            if (response.data.status == "success") {
              toast(response.data.message, {
                type: "success",
              });
              handleClose();
              getRequestList();
            }
          })
          .catch(function (error) {
            document.getElementById("fp-container").style.visibility = "hidden";
            alert(error.response.data.message);
          });
      } else {
        toast("Please provide start and end date", {
          type: "error",
        });
      }
    }
  };

  const handleReject = (value) => {
    // var confirmed = window.confirm(
    //   "Are you sure you want to reject the user request?"
    // );
    let confirmed = prompt(
      "Are you sure you want to reject the user request? \n\nRemarks* "
    );
    if (confirmed) {
      document.getElementById("fp-container").style.visibility = "visible";
      var datas = { id: value, confirmed };
      helpers
        .rejectRequest(datas)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          if (response.data.status == "success") {
            toast(response.data.message, {
              type: "success",
            });
            getRequestList();
          }
        })
        .catch(function (error) {
          document.getElementById("fp-container").style.visibility = "hidden";
          alert(error.response.data.message);
        });
    } else {
      toast("Please provide the remark for rejection.", {
        type: "error",
      });
    }
  };

  const getRequestList = async () => {
    document.getElementById("fp-container").style.visibility = "visible";
    helpers
      .getRequestList()
      .then((response) => {
        document.getElementById("fp-container").style.visibility = "hidden";
        setData(response.data);
      })
      .catch(function (error) {
        document.getElementById("fp-container").style.visibility = "hidden";
        alert(error.response.data.message);
      });
  };

  const columns = [
    {
      name: "serial_no",
      label: "Sl No",
      options: { filter: true, sort: true },
    },
    {
      name: "id_no",
      label: "IDENTITY NO",
      options: { filter: true, sort: true },
    },
    { name: "name", label: "NAME", options: { filter: true, sort: true } },
    {
      name: "title",
      label: "BOOK TITLE",
      options: { filter: true, sort: true },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          if (datas[dataIndex].status == "pending") {
            return (
              <span class="badge rounded-pill bg-info text-dark">Pending</span>
            );
          } else if (datas[dataIndex].status == "approved") {
            return <span class="badge rounded-pill bg-success">Approved</span>;
          } else if (datas[dataIndex].status == "rejected") {
            return <span class="badge rounded-pill bg-danger">Rejected</span>;
          } else if (datas[dataIndex].status == "returned") {
            return (
              <span class="badge rounded-pill bg-secondary">Returned</span>
            );
          }
        },
      },
    },
    {
      name: "start_date",
      label: "START DATE",
      options: { filter: true, sort: true },
    },
    {
      name: "end_date",
      label: "DUE DATE",
      options: { filter: true, sort: true },
    },
    {
      name: "returned_date",
      label: "RETURNED DATE",
      options: { filter: true, sort: true },
    },
    {
      name: "late_days",
      label: "DELAY(in days)",
      options: { filter: true, sort: true },
    },
    {
      name: "remark",
      label: "REMARKS",
      options: { filter: true, sort: true },
    },
    {
      name: "ACTIONS",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          if (datas[dataIndex].status == "pending") {
            return (
              <div className="d-flex">
                <IconButton
                  color="success"
                  title="Approve"
                  onClick={() => {
                    setId(datas[dataIndex].id);
                    setIsReturn(false);
                    handleShow();
                  }}
                >
                  <i class="fa-regular fa-circle-check"></i>
                </IconButton>
                <IconButton
                  color="error"
                  title="Reject"
                  onClick={() => {
                    handleReject(datas[dataIndex].id);
                  }}
                >
                  <i class="fa-regular fa-circle-xmark"></i>
                </IconButton>
              </div>
            );
          } else if (datas[dataIndex].status == "approved") {
            return (
              <div>
                <IconButton color="success" title="Return">
                  <i
                    class="fa-regular fa-share-from-square"
                    style={{ fontSize: "1.4rem" }}
                    onClick={() => {
                      console.log(datas[dataIndex]);
                      setId(datas[dataIndex].id);
                      setInitialDate(new Date(datas[dataIndex].start_date));
                      setShowDueDate(new Date(datas[dataIndex].end_date));
                      console.log(initialDate);
                      setIsReturn(true);
                      handleShow();
                    }}
                  ></i>
                </IconButton>
              </div>
            );
          }
        },
      },
    },
  ];
  const columns_user = [
    {
      name: "serial_no",
      label: "Sl No",
      options: { filter: true, sort: true },
    },
    {
      name: "id_no",
      label: "IDENTITY NO",
      options: { filter: true, sort: true },
    },
    { name: "name", label: "NAME", options: { filter: true, sort: true } },
    {
      name: "title",
      label: "BOOK TITLE",
      options: { filter: true, sort: true },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          if (datas[dataIndex].status == "pending") {
            return (
              <span class="badge rounded-pill bg-info text-dark">Pending</span>
            );
          } else if (datas[dataIndex].status == "approved") {
            return <span class="badge rounded-pill bg-success">Approved</span>;
          } else if (datas[dataIndex].status == "rejected") {
            return <span class="badge rounded-pill bg-danger">Rejected</span>;
          } else if (datas[dataIndex].status == "returned") {
            return (
              <span class="badge rounded-pill bg-secondary">Returned</span>
            );
          }
        },
      },
    },
    {
      name: "start_date",
      label: "START DATE",
      options: { filter: true, sort: true },
    },
    {
      name: "end_date",
      label: "DUE DATE",
      options: { filter: true, sort: true },
    },
    {
      name: "returned_date",
      label: "RETURNED DATE",
      options: { filter: true, sort: true },
    },
    {
      name: "late_days",
      label: "DELAY(in days)",
      options: { filter: true, sort: true },
    },
    {
      name: "remark",
      label: "REMARKS",
      options: { filter: true, sort: true },
    },
  ];

  useEffect(() => {
    JSON.parse(sessionStorage.getItem("auth")).role == "admin"
      ? setIsAdmin(true)
      : setIsAdmin(false);
    getRequestList();
  }, []);

  const datas = data;

  return (
    <div className="fluid-container">
      <ToastContainer position="top-right" theme="dark" />

      <div className="top_menu p-2 d-flex justify-content-start align-items-center">
        <div className="px-3">
          <i className="fa-solid fa-address-book fa-2x icon_design "></i>
        </div>
        <div className="px-2 my-1">
          <h4 className="my-1">Book Issue List</h4>
        </div>
      </div>
      <div>
        <div class="card m-5 p-3 ">
          <div class="card-body">
            <Datatable
              columns={isAdmin ? columns : columns_user}
              data={datas}
              tablename={"Book Issue List"}
              hideDeleteOption={true}
            />
          </div>
        </div>
      </div>

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Date Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!isReturn ? (
              <>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="startDate">
                      Start Date
                    </label>
                  </div>
                  <div class="col-8">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="dueDate">
                      Due Date
                    </label>
                  </div>
                  <div class="col-8">
                    <DatePicker
                      minDate={startDate}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="dueDate">
                      Due Date
                    </label>
                  </div>
                  <div class="col-8">
                    <DatePicker
                      selected={showDueDate}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div class="row align-items-center my-3">
                  <div class="col-4 text-right">
                    <label className="m-0" htmlFor="dueDate">
                      Return Date
                    </label>
                  </div>
                  <div class="col-8">
                    <DatePicker
                      minDate={initialDate}
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="fp-container"
        id="fp-container"
        style={{ visibility: "hidden" }}
      >
        <i
          className="fas fa-spinner fa-pulse fp-loader"
          style={{ fontSize: "70px" }}
        ></i>
      </div>
    </div>
  );
}

export default RequestList;
