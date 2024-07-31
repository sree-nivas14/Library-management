import React, { useState } from "react";
import "./SideNavigationBar.css";
import college_logo from "./college_logo.png";
import { NavLink } from "react-router-dom";

function SideNavigationBar({ auth }) {
  const role = auth.role;
  const toggleSidebar = () => {
    document.body.classList.toggle("collapsed");
  };

  return (
    <>
      <nav>
        <div className="sidebar-top">
          <span className="expand-btn" onClick={toggleSidebar}>
            <i className="fa-solid fa-chevron-right toggle text-light fa-1x"></i>
          </span>
          <img src={college_logo} className="logo" alt="College Logo" />
          <div className="hide">
            <div className="d-flex flex-column">
              <div className="side_top_nav">KLN</div>
              <div className="side_sub_top_nav">College Of Engineering</div>
            </div>
            {/* <span>KLN</span>
            <br />
            <span>College Of Engineering</span> */}
          </div>
        </div>
        <div className="sidebar-links">
          <ul>
            <div>
              <li>
                <NavLink exact="true" to="/Dashboard" activeclassname="active">
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <span className="link hide">Dashboard</span>
                </NavLink>
              </li>
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      exact="true"
                      to="/UserDetailsUpload"
                      activeclassname="active"
                    >
                      <div className="icon">
                        <i className="fas fa-users"></i>
                      </div>
                      <span className="link hide">Manage Users</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/BookDetailsUpload" activeclassname="active">
                      <div className="icon">
                        <i class="fa-solid fa-book"></i>
                      </div>
                      <span className="link hide">Manage Books</span>
                    </NavLink>
                  </li>
                </>
              )}
              {role === "user" && (
                <>
                  <li>
                    <NavLink to="/BookRequest" activeclassname="active">
                      <div className="icon">
                        <i className="fa-solid fa-paper-plane"></i>
                      </div>
                      <span className="link hide">Book Request</span>
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/RequestList" activeclassname="active">
                  <div className="icon">
                    <i className="fa-solid fa-paper-plane"></i>
                  </div>
                  <span className="link hide">Book Issue List</span>
                </NavLink>
              </li>
            </div>
            <div>
              <li>
                <NavLink to="/Signout" activeclassname="active">
                  <div className="icon">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                  <span className="link hide">Logout</span>
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default SideNavigationBar;
