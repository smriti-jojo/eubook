import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { setBookList } from "../../store/MyBooks";
import { useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const BookCard = (props) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Books = useSelector((state) => state.books.books);

  useLayoutEffect(() => {}, []);

  const handleClick = () => {
    console.log(props.id);
    if (props.src === "myBooks") {
      navigate(`/user/${props.id}`);
    } else {
      navigate(`/home/view/${props.id}`);
    }
  };

  // const handleLibrary = () => {
  //   Swal.fire({
  //     title: "Please Add the Book to Your Home!!!",
  //     text: "*Click on star icon to add Book",
  //     icon: "warning",
  //   });
  // };
  // const addToBookList = (data) => {
  //   dispatch(setBookList(data));
  //   setOpen(false);
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleOpen = (id) => {
  //   let BookPresent = false;
  //   Books.map((book) => {
  //     if (book.id === id) {
  //       BookPresent = true;
  //     }
  //   });
  //   if (BookPresent) {
  //     Swal.fire({
  //       text: "Book Already Added",
  //       icon: "warning",
  //     });
  //   } else {
  //     setOpen(true);
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="rounded-lg shadow-xl shadow-[#b6b1b195] hover:cursor-pointer group  ">
      <div
        className="mt-2 relative w-[100%] "
        // onClick={props.type === "myBooks" ? handleClick : handleLibrary}
      >
        <div>
          <img
            src={props.bookcover}
            className="h-[450px] rounded-lg brightness-140  "
            alt="sem_book"
            onClick={props.type === "myBooks" ? handleClick : ""}
          />
        </div>
        {/* <div
          className={`absolute bottom-[26rem] -left-[1rem] hover:text-[#FFFF00] ${
            props.flag === true ? "!text-[#FF0000]" : "!text-[#FFFFFF]"
          }`}
          // onClick={() => handleOpen(props.id)}
        >
          {props.select}
        </div> */}
        {props.flag ? (
          <div
            className={`absolute bottom-[26rem] -left-[1rem] hover:text-[#FFFF00] !text-[#FF0000]`}
          >
            {props.select}
          </div>
        ) : (
          <div></div>
        )}

        <div
          className={`absolute bottom-[26rem] left-[19rem] hover:text-[#FFFF00] ${
            props.flag === true ? "!text-[#FF0000]" : "!text-[#FFFFFF]"
          }`}
        >
          {props.mark}
        </div>
        <div className="bg-[#a6d608] shadow-xl shadow-[#ec0bec69]  absolute bottom-3 rounded-md  w-[94%] px-5 py-4 mx-[3%] z-10 hover:bg-[#ff3c3c]">
          <h1 className="  text-[white] font-semibold text-[1.5rem] ">
            {props.name}
          </h1>
          <div className="flex gap-1 ">
            <div className="text-white ">{props.subject}</div>
            <div className="text-[white]  ">{props.series}-</div>

            <div className="text-white ">(Grade- {props.grade})</div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do You Want To Add "${props.name}" to Your Home?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            // onClick={() => addToBookList(props.data)}
            autoFocus
            className="!text-[#0f9200]"
          >
            Yes
          </Button>
          <Button onClick={handleClose} className="!text-[#FF0000]">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookCard;
