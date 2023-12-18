import React from "react";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import MenuBar from "../component/Menu/Menu";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import BookTable from "../component/DataTable/BookTable";

const CreateBook = () => {
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
          <MenuBar status={"addBook"} />
        </div>
      </div>
      <div className="">
        <div className="px-6 mt-6">
          <BookTable />
        </div>
      </div>
    </>
  );
};

export default CreateBook;
