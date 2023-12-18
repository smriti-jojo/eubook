import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import BasicSelect from "../SearchDropdown/SearchDropdown";
import instance from "../../instance";
import localinstance from "../../localinstance";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddUser = ({ fetch }) => {
  const [subjectid, setsubjectid] = useState("");
  const [series, setseries] = useState("");
  const [open, setopen] = useState(false);
  const [fetchdata, setfetchdata] = useState([]);
  const [postdata, setpostdata] = useState([]);

  const handleaddsubject = async () => {
    setopen(true);
    await postData();
    await fetch();
  };

  const postData = async () => {
    let dataToPost = {
      subjectid: subjectid,
      series: series,
    };
    console.log(dataToPost);

    const res = await localinstance({
      url: `series/create`,
      method: "POST",
      data: dataToPost,
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    console.log(res.data.status);
    console.log(res.data.message);
    setpostdata(res.data.message);
  };

  const navigate = useNavigate();

  const handlesubject = () => {
    setopen(false);
    // fetch();
  };

  return (
    // <div className=" flex w-full bg-purple-500">
    //   <div className=" bg-pink-600 w-1/2">
    //     <BasicSelect className="w-full" />
    //   </div>
    // <div className="flex justify-end  items-center p-[5%] h-screen  w-[90%] sm:w-full ">
    <div className="border-2 border-black rounded-md shadow-md shadow-slate-400 ">
      <form>
        <div className="flex  justify-center p-3 border-2 border-slate-500 rounded-md bg-slate-400">
          <div className="p-1 text-black font-extrabold">Add series</div>
        </div>
        <div className="flex gap-4">
          <div className="mx-3 my-3  items-center">SubjectID</div>
          <TextField
            className="!p-3"
            size="small"
            onChange={(e) => setsubjectid(e.target.value)}
          />
        </div>
        <div className="flex gap-8">
          <div className="mx-3 my-3  items-center">Series</div>
          <TextField
            className="!p-3"
            size="small"
            onChange={(e) => setseries(e.target.value)}
          />
        </div>
        <div className="flex justify-center p-3">
          <Button variant="contained" className="" onClick={handleaddsubject}>
            Submit
          </Button>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
          >
            <DialogTitle id="alert-dialog-title">"{postdata}"</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                New Users Added Successfully!!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlesubject}>
                Close <CloseIcon />
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
