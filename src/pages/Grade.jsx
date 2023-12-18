import React from "react";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import SubjectTable from "../component/DataTable/SubjectTable";
import GradeTable from "../component/DataTable/GradeTable";
import MenuBar from "../component/Menu/Menu";

const Grade = () => {
  return (
    <>
      <div>
        <AdminNavbar />
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between pt-[5rem]">
        <div className="p-3">
          <div>Admin</div>
          <div>
            <Breadcrumb />
          </div>
        </div>
        <div>
          <MenuBar status={"addGrade"} />
        </div>
      </div>

      <div className="">
        <div className="p-6 mt-6">
          <GradeTable />
        </div>
      </div>
    </>
  );
};
export default Grade;
