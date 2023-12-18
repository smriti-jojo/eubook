import React from "react";
import Semester_Book_1_Sem_1 from "../../assets/Semester_Book_1_Sem_1.jpg";
import { Button } from "@mui/material";
import Face3Icon from "@mui/icons-material/Face3";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Person4Icon from "@mui/icons-material/Person4";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";

const AdminCard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-[6rem] sm:flex-row  ">
      {[
        {
          icon: <Face3Icon />,
          name: "User",
          links: "/admin/users",
          color: "bg-gradient-to-r from-orange-200 to-yellow-200",
        },
        // { icon: <MenuBookIcon />, name: "Book", links: "/admin/users" },
        // { icon: <Person4Icon />, name: "Admin", links: "/admin/users" },
        {
          icon: <LibraryBooksIcon />,
          name: "All Books",
          links: "/admin/all_books",
          color: "bg-gradient-to-r from-orange-200 to-yellow-200",
        },
      ].map((data) => (
        <div
          className={`flex bg-white justify-between shadow-lg shadow-slate-500 rounded-xl `}
        >
          <div className="p-[6rem]">
            <div className="flex justify-center items-center ">
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => navigate(data.links)}
              >
                <div className="flex justify-center">{data.icon}</div>
                <div>{data.name}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCard;
