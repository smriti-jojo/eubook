import React from "react";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import AdminNavbar from "../component/Navbar/AdminNavbar";

import SeriesTable from "../component/DataTable/SeriesTable";

// import Menu from "../component/Menu/Menu";
import MenuBar from "../component/Menu/Menu";

const Series = () => {
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
          <MenuBar status={"addSeries"} />
        </div>
      </div>
      <div className="">
        <div className="p-6 mt-6">
          <SeriesTable />
        </div>
      </div>
    </>
  );
};
export default Series;
