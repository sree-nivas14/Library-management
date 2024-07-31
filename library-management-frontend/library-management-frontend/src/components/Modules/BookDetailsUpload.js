import React, { useEffect, useState } from "react";
import "./Module.css";
import Datatable from "./Datatable/Datatable";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import helpers from "../Services/Helper";
import BookDetailsUploadModal from "./BookDetailsUploadModal";

function BookDetailsUpload() {
  const [data, setData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: null,
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publication_date: "",
    copies: "",
  });

  const getBookList = async () => {
    document.getElementById("fp-container").style.visibility = "visible";
    helpers
      .getBookList()
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

  useEffect(() => {
    getBookList();
  }, []);

  const handledelete = (rowsDeleted) => {
    var confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const deletedIds = rowsDeleted.data.map((row) => data[row.index].id);
      console.log("Deleted IDs:", deletedIds);
      document.getElementById("fp-container").style.visibility = "visible";
      var datas = { values: deletedIds };
      helpers
        .deleteBook(datas)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          if (response.data == 1) {
            toast("Book Deleted Successfully.", {
              type: "success",
            });
          } else {
            toast("Something Went Wrong", {
              type: "info",
            });
          }
          getBookList();
        })
        .catch(function (error) {
          document.getElementById("fp-container").style.visibility = "hidden";
          alert(error.response.data.message);
        });
    } else {
      getBookList();
    }
  };

  const handleAddClick = () => {
    setInitialValues({
      id: null,
      title: "",
      author: "",
      isbn: "",
      genre: "",
      publication_date: "",
      copies: "",
    });
    setShowModal(true);
  };

  const handleSubmit = (values) => {
    if (values.id) {
      document.getElementById("fp-container").style.visibility = "visible";
      helpers
        .updateBook(values)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          //console.log(response.data);
          if (response.data == 0) {
            toast("Book Updated Successfully.", {
              type: "success",
            });
            setShowModal(false);
            getBookList();
          } else {
            toast("Book Already Exists!", {
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
        .addBook(values)
        .then((response) => {
          document.getElementById("fp-container").style.visibility = "hidden";
          //console.log(response.data);
          if (response.data == 0) {
            toast("Book added successfully.", {
              type: "success",
            });
            setShowModal(false);
            getBookList();
          } else {
            toast("Book Already Exists with same ISBN", {
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
      name: "title",
      label: "TITLE",
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
      name: "isbn",
      label: "ISBN",
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
      label: "COPIES",
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
                // Handle edit action here, for example:
                console.log("Edit button clicked for row:", datas[dataIndex]);
                setInitialValues({
                  id: datas[dataIndex].id,
                  title: datas[dataIndex].title,
                  author: datas[dataIndex].author,
                  isbn: datas[dataIndex].isbn,
                  genre: datas[dataIndex].genre,
                  publication_date: datas[dataIndex].publication_date.replace(
                    /-/g,
                    "/"
                  ),
                  copies: datas[dataIndex].copies,
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

      <div className="top_menu p-3 d-flex justify-content-start align-items-center">
        <div className="px-3">
          <i class="fa-solid fa-book fa-2x icon_design "></i>
        </div>
        <div className="px-2 my-1">
          <h4 className="my-1">Books</h4>
        </div>
      </div>
      <div>
        <div class="card m-5 p-3 ">
          <div class="">
            <button
              className="btn btn-primary mx-3 d-flex"
              onClick={handleAddClick}
            >
              Add Book
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
      <BookDetailsUploadModal
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

export default BookDetailsUpload;
