import React, { useLayoutEffect } from "react";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import UserTable from "../component/DataTable/UserTable";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import AddInfo from "../component/AddForm/AddInfo";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Users = ({ fetchdata }) => {
  const [open, setopen] = useState(false);
  const [data, setdata] = useState("");

  const handlesubject = () => {
    setopen(false);
  };

  useLayoutEffect(() => {}, []);

  const handleadduser = () => {
    setopen(true);
  };

  return (
    <>
      <div>
        <AdminNavbar />
      </div>

      <div className="flex justify-between mt-[10vh]">
        <div>
          <h1>Admin</h1>
          <div>
            <Breadcrumb />
          </div>
        </div>
        <div className="!p-[1rem]">
          <Button variant="contained" onClick={handleadduser}>
            Add User
          </Button>
          <Dialog
            PaperProps={{
              sx: {
                width: "29rem",
                // height: "100%",
                // backgroundColor: "rgb(235,215,224)",
              },
            }}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
          >
            {/* <DialogTitle id="alert-dialog-title">"{postdata}"</DialogTitle> */}

            {/* <DialogContentText id="alert-dialog-description">
                New Subject Added Successfully!!!
              </DialogContentText> */}
            {/* <div className="w-full mx-[2rem] sm:w-[70%]  sm:mx-[5rem] mt-[1rem] shadow-md shadow-black"> */}
            <AddInfo className={"relative"} />
            {/* </div> */}

            {/* <Button
                onClick={handlesubject}
                variant=""
                className="!bg-[#B31312] absolute bottom-[580px]"
              >
                Close
              </Button> */}
            <CloseIcon
              className="!bg-[#B31312] absolute bottom-[95%] left-[90%] cursor-pointer"
              onClick={handlesubject}
            />
          </Dialog>
        </div>
      </div>
      <div>
        <div className="p-6 mt-6">
          <UserTable />
        </div>
      </div>
    </>
  );
};
export default Users;
