import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import helpers from "../Services/Helper";
import { useAuth } from "../../AuthContext";

function Signout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  // useEffect(() => {
  //   document.getElementById("fp-container").style.visibility = "visible";
  //   helpers
  //     .signout()
  //     .then((response) => {
  //       document.getElementById("fp-container").style.visibility = "hidden";
  //       //console.log(response.data);
  //       if (response.data == "success") {
  //         logout();
  //         sessionStorage.clear();
  //         navigate("/");
  //       }
  //     })
  //     .catch(function (error) {
  //       document.getElementById("fp-container").style.visibility = "hidden";
  //       alert(error.response.data.message);
  //     });
  // }, []);
  useEffect(() => {
    logout();
    sessionStorage.clear();
    navigate("/");
  }, []);

  return (
    <div>
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

export default Signout;
