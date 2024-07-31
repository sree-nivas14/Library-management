import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sign_in from "./components/Sign_in/Sign_in";
import Header from "./components/Header/Header";
import SideNavigationBar from "./components/Sidebar/SideNavigationBar";
import BookRequest from "./components/Modules/BookRequest";
import RequestList from "./components/Modules/RequestList";
import ProtectedRoutes from "./components/Modules/ProtectedRoutes";
import UserDetailsUpload from "./components/Modules/UserDetailsUpload";
import DataTable from "./components/Modules/Datatable/Datatable";
import BookDetailsUpload from "./components/Modules/BookDetailsUpload";
import Dashboard from "./components/Modules/Dashboard";
import Signout from "./components/Sign_in/Signout";
import { useAuth } from "./AuthContext";

const App = () => {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sign_in />} />
        <Route path="/Sign_in" element={<Sign_in />} />
        <Route path="/Signout" element={<Signout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Dashboard" element={<Dashboards auth={auth} />} />
          {/* {auth.role === "admin" && (
            <> */}
          <Route path="/UserDetailsUpload" element={<Users auth={auth} />} />
          <Route path="/BookDetailsUpload" element={<Books auth={auth} />} />
          {/* </>
          )}
          {auth.role === "user" && (
            <> */}
          <Route path="/BookRequest" element={<BookRequests auth={auth} />} />
          {/* </>
          )} */}
          <Route path="/RequestList" element={<RequestLists auth={auth} />} />
          <Route path="/data_table" element={<DataTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const LayoutWithSidebar = ({ children, auth }) => {
  return (
    <div className="container-fluid layout-with-sidebar p-0">
      <div className="d-flex  w-100">
        <div className=" ">
          <SideNavigationBar auth={auth} />
        </div>
        <div className="w-100 ">
          <div className="content ">{children}</div>
        </div>
      </div>
    </div>
  );
};

const Dashboards = ({ auth }) => {
  return (
    <LayoutWithSidebar auth={auth}>
      <Dashboard />
    </LayoutWithSidebar>
  );
};

const BookRequests = ({ auth }) => {
  return (
    <LayoutWithSidebar auth={auth}>
      <BookRequest />
    </LayoutWithSidebar>
  );
};

const RequestLists = ({ auth }) => {
  return (
    <LayoutWithSidebar auth={auth}>
      <RequestList />
    </LayoutWithSidebar>
  );
};

const Users = ({ auth }) => {
  return (
    <LayoutWithSidebar auth={auth}>
      <UserDetailsUpload />
    </LayoutWithSidebar>
  );
};

const Books = ({ auth }) => {
  return (
    <LayoutWithSidebar auth={auth}>
      <BookDetailsUpload />
    </LayoutWithSidebar>
  );
};

export default App;
