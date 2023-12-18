import React from "react";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import AdminCard from "../component/AdminCard/AdminCard";

const Admin = () => {
  return (
    <>
      <div>
        <AdminNavbar />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="p-3">
          <div>Admin</div>
          <div>
            <Breadcrumb />
          </div>
        </div>
      </div>
      <div className="px-7 py-3 mt-[3rem] ">
        <div className="flex justify-center mt-4">
          <AdminCard />
        </div>
      </div>
    </>
  );
};

export default Admin;
