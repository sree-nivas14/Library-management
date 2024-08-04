import React, { useEffect, useState } from "react";
import "./Module.css";
import Datatable from "./Datatable/Datatable";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import helpers from "../Services/Helper";
import UserDetailsUploadModal from "./UserDetailsUploadModal";

function UserDetailsUpload() {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: null,
    identity_no: "",
    name: "",
    email: "",
    password: "",
    phone_no: "",
    role: "",
  });

  const getUserList = async () => {
    document.getElementById("fp-container").style.visibility = "visible";
    helpers
      .getUserList()
      .then((response) => {
        document.getElementById("fp-container").style.visibility = "hidden";
        setData(response.data);
      })
      .catch(function (error) {
        document.getElementById("fp-container").style.visibility = "hidden";
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handledelete = (rowsDeleted) => {
    var confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const deletedIds = rowsDeleted.data.map((row) => data[row.index].id);
      console.log("Deleted IDs:", deletedIds);
      document.getElementById("fp-container").style.visibility = "visible";
      var datas = { values: deletedIds };
      helpers
        .deleteUser(datas)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          if (response.data == 1) {
            toast("Data Deleted Successfully.", {
              type: "success",
            });
          } else {
            toast("Something Went Wrong", {
              type: "info",
            });
          }
          getUserList();
        })
        .catch(function (error) {
          document.getElementById("fp-container").style.visibility = "hidden";
          alert(error.response.data.message);
        });
    } else {
      getUserList();
    }
  };

  const handleAddClick = () => {
    setInitialValues({
      id: null,
      identity_no: "",
      name: "",
      email: "",
      password: "",
      phone_no: "",
      role: "",
    });
    setShowModal(true);
  };

  const handleSubmit = (values) => {
    if (values.id) {
      document.getElementById("fp-container").style.visibility = "visible";
      helpers
        .updateUser(values)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          if (response.data == 0) {
            toast("User Updated Successfully.", {
              type: "success",
            });
            setShowModal(false);
            getUserList();
          } else {
            toast("User Already Exists!", {
              type: "info",
            });
          }
        })
        .catch(function (error) {
          document.getElementById("fp-container").style.visibility = "hidden";
          alert(error.response.data.message);
        });
    } else {
      document.getElementById("fp-container").style.visibility = "visible";
      helpers
        .addUser(values)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          if (response.data == 0) {
            toast("User added successfully.", {
              type: "success",
            });
            setShowModal(false);
            getUserList();
          } else {
            toast("User Already Exists!", {
              type: "info",
            });
          }
        })
        .catch(function (error) {
          document.getElementById("fp-container").style.visibility = "hidden";
          alert(error.response.data.message);
        });
    }
  };

  const columns = [
    {
      name: "id_no",
      label: "IDENTITY NO",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "NAME",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "EMAIL ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone_number",
      label: "PHONE NUMBER",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "ROLE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ACTIONS",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <IconButton
              onClick={() => {
                setInitialValues({
                  id: datas[dataIndex].id,
                  identity_no: datas[dataIndex].id_no,
                  name: datas[dataIndex].name,
                  email: datas[dataIndex].email,
                  password: datas[dataIndex].password,
                  phone_no: datas[dataIndex].phone_number,
                  role: datas[dataIndex].role,
                });
                setShowModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const datas = data;

  return (
    <div className="fluid-container">
      <ToastContainer position="top-right" theme="dark" />

      <div className="top_menu p-2 d-flex justify-content-start align-items-center">
        <div className="px-3">
          <i className="fas fa-users fa-2x icon_design "></i>
        </div>
        <div className="px-2 my-1">
          <h4 className="my-1">Users</h4>
        </div>
      </div>
      <div>
        <div class="card m-5 p-3 ">
          <div class="">
            <button
              className="btn btn-primary mx-3 d-flex"
              onClick={handleAddClick}
            >
              Add User
            </button>
          </div>
          <div class="card-body">
            <Datatable
              handledelete={handledelete}
              columns={columns}
              data={datas}
              tablename={"Users List"}
            />
          </div>
        </div>
      </div>
      {/* Modal */}
      <UserDetailsUploadModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
      />
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

export default UserDetailsUpload;
