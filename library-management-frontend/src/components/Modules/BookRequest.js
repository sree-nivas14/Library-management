import React, { useState, useEffect } from "react";
import "./Module.css";
import Datatable from "./Datatable/Datatable";
import { ToastContainer, toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import helpers from "../Services/Helper";

function BookRequest() {
  const [data, setData] = useState();

  const handleSendRequest = (value) => {
    var data = { id: value };
    document.getElementById("fp-container").style.visibility = "visible";
    helpers
      .sendBookRequest(data)
      .then((response) => {
        document.getElementById("fp-container").style.visibility = "hidden";
        if (response.data.status == "success") {
          toast(response.data.message, {
            type: "success",
          });
          getAvailableBooks();
        } else {
          toast(response.data.message, {
            type: "error",
          });
        }
        // setData(response.data);
      })
      .catch(function (error) {
        document.getElementById("fp-container").style.visibility = "hidden";
        //console.log(error.response);
        alert(error.response.data.message);
      });
  };

  const getAvailableBooks = async () => {
    document.getElementById("fp-container").style.visibility = "visible";
    helpers
      .getAvailableBooks()
      .then((response) => {
        document.getElementById("fp-container").style.visibility = "hidden";
        //console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        document.getElementById("fp-container").style.visibility = "hidden";
        //console.log(error.response);
        alert(error.response.data.message);
      });
  };

  const columns = [
    {
      name: "isbn",
      label: "ISBN",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "author",
      label: "AUTHOR",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "title",
      label: "TITLE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "genre",
      label: "GENRE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "publication_date",
      label: "PUBLICATION DATE",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "copies",
      label: "AVAILABILITY",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex) => {
          if (datas[dataIndex].copies == 0) {
            return (
              <span
                class="badge rounded-pill bg-danger d-block"
                style={{ fontSize: "0.7rem" }}
              >
                Not Available
              </span>
            );
          } else {
            return (
              <span
                class="badge rounded-pill bg-success d-block"
                style={{ fontSize: "0.7rem" }}
              >
                Available{" "}
                <span class="mx-1" style={{ fontSize: "0.7rem" }}>
                  {datas[dataIndex].copies}
                </span>
              </span>
            );
          }
        },
      },
    },
    {
      name: "ACTIONS",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          if (datas[dataIndex].copies == 0) {
            return (
              // <IconButton>
              <button class="btn btn-primary blur_button mx-2">
                Send Request <i class="fa-solid fa-paper-plane"></i>
              </button>
              // </IconButton>
            );
          } else {
            return (
              <IconButton
                onClick={() => {
                  handleSendRequest(datas[dataIndex].id);
                }}
              >
                <button class="btn btn-primary">
                  Send Request <i class="fa-solid fa-paper-plane"></i>
                </button>
              </IconButton>
            );
          }
        },
      },
    },
  ];

  useEffect(() => {
    // viewStudentList();
    getAvailableBooks();
  }, []);

  const datas = data;

  return (
    <div className="fluid-container">
      <ToastContainer position="top-right" theme="dark" />

      <div className="top_menu p-3 d-flex justify-content-start align-items-center">
        <div className="px-3">
          <i className="fa-solid fa-paper-plane fa-2x icon_design "></i>
        </div>
        <div className="px-2 my-1">
          <h4 className="my-1">Book Request</h4>
        </div>
      </div>
      <div>
        <div class="card m-5 p-3 ">
          <div class="card-body">
            <Datatable
              // handledelete={handledelete}
              columns={columns}
              data={datas}
              tablename={"Book List"}
              hideDeleteOption={true}
            />
          </div>
        </div>
      </div>

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

export default BookRequest;
