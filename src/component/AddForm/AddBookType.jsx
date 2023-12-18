import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import localinstance from "../../localinstance";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddBookType = ({ fetch, fetchdata }) => {
  const [bookType, setBookType] = useState("");
  const [open, setopen] = useState(false);
  const [postdata, setpostdata] = useState([]);
  const [error, setError] = useState(false);
  const [bookTypeError, setBookTypeError] = useState(false);

  const handleaddtype = async () => {
    await postData();
    await fetch();
  };

  const postData = async () => {
    let dataToPost = {
      type: bookType,
    };
    console.log(dataToPost);

    if (validateForm()) {
      const res = await localinstance({
        url: `booktype/create`,
        method: "POST",
        data: dataToPost,
        headers: {
          Authorization: `${Cookies.get("token")}`,
          // accesskey: `auth74961a98ba76d4e4`,
        },
      });
      console.log(res.data.status);
      setpostdata(res.data.message);
      setopen(true);
      setBookType("");
    }
  };

  const handlesubject = () => {
    setopen(false);
    // fetch();
  };

  const validateForm = () => {
    let valid = true;
    if (bookType.length === 0) {
      setError(true);
      valid = false;
    }

    return valid;
  };

  const handleEnter = (val) => {
    console.log(val);
    let text = val.trim();
    console.log(text);

    {
      fetchdata.map((item) => {
        if (
          item.name === text ||
          item.name.toLowerCase() === text.toLowerCase()
        ) {
          setBookTypeError(true);
        } else if (text.length === 0) {
          setBookTypeError(false);
        } else {
          setError(false);
          setBookType(text);
        }
      });
    }
  };
  return (
    <div className="border-2 border-black rounded-md shadow-md shadow-slate-400 !bg-white ">
      <form>
        <div className="flex  justify-center p-3 border-2 border-slate-500 rounded-md !bg-slate-400">
          <div className="p-1 text-black font-extrabold">Add BookType</div>
        </div>
        <div className="flex gap-8 ">
          <div className="mx-3 my-3  items-center">BookType</div>
          <TextField
            className="!p-3"
            size="small"
            onChange={(e) => handleEnter(e.target.value)}
            error={error || bookTypeError}
            helperText={
              bookTypeError ? "BookType already available in database" : ""
            }
          />
        </div>
        <div className="flex justify-center p-3 mt-[2rem]">
          <Button
            type="reset"
            variant="contained"
            className=""
            onClick={handleaddtype}
          >
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
                New BookType Added Successfully!!!
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

export default AddBookType;
