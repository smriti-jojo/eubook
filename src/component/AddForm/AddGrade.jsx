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
const AddGrade = ({ fetch, fetchdata }) => {
  const [grade, setGrade] = useState("");
  const [open, setopen] = useState(false);
  const [postdata, setpostdata] = useState([]);
  const [error, setError] = useState(false);
  const [GradeError, setGradeError] = useState(false);

  const handleaddgrade = async () => {
    await postData();
    await fetch();
  };

  const postData = async () => {
    let dataToPost = {
      grade: grade,
    };
    console.log(dataToPost);
    if (validateForm()) {
      const res = await localinstance({
        url: `grade/create`,
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
    }
  };

  const handlesubject = () => {
    setopen(false);
    // fetch();
  };

  const handleEnter = (val) => {
    console.log(val);
    let text = val.trim();
    console.log(text);

    {
      fetchdata.map((item) => {
        if (item.grade === text) {
          setGradeError(true);
        } else if (text.length === 0 || text.length > 1) {
          setGradeError(false);
        } else {
          setError(false);
          setGrade(text);
        }
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    if (grade.length === 0) {
      setError(true);
      valid = false;
    }
    if (grade.length > 2) {
      setError(true);
      valid = false;
    }
    return valid;
  };

  return (
    <div className="border-2 border-black rounded-md shadow-md shadow-slate-400 !bg-white ">
      <form>
        <div className="flex  justify-center p-3 border-2 border-slate-500 rounded-md !bg-slate-400">
          <div className="p-1 text-black font-extrabold">Add Grade</div>
        </div>
        <div className="flex gap-8 ">
          <div className="mx-3 my-3  items-center">Grade</div>
          <TextField
            type="number"
            className="!p-3"
            size="small"
            onChange={(e) => handleEnter(e.target.value)}
            error={error || GradeError}
            helperText={GradeError ? "Grade already available in database" : ""}
          />
        </div>
        <div className="flex justify-center p-3 mt-[2rem]">
          <Button
            type="reset"
            variant="contained"
            className=""
            onClick={handleaddgrade}
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
                New Subject Added Successfully!!!
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

export default AddGrade;
