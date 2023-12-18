import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate, useParams } from "react-router-dom";

const ViewBook = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const data = useSelector((state) => state.books.books);
  useEffect(() => {
    console.log("BOOKDATA", data);
    console.log("id", id);
  });

  const handleBack = () => {
    console.log("id", id);
    navigate(`/home/view/${id}`);
  };
  return (
    <div>
      <div className="absolute top-[0.4rem] z-20 left-[45rem]">
        <Button
          variant="outlined"
          className="!text-blue-600 !bg-white"
          onClick={handleBack}
        >
          <KeyboardReturnIcon /> Back
          {/* <span>
          <ArrowBackIcon />
        </span> */}
        </Button>
      </div>
      <iframe
        id="fullScreen"
        src={data}
        allow="fullscreen"
        // ref={iframeref}
        className={`${"!h-[100vh] !w-[100vw] relative "}`}
      />
    </div>
  );
};

export default ViewBook;
