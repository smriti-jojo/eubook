import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
// import { Button } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBookList } from "../../store/MyBooks";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const MaterialTabs = (props) => {
  console.log("DATA", props.datas);
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(0);
  const [len, setLen] = useState(props.datas.length);
  const [booktype, setbooktype] = useState("");
  const [data, setData] = useState(props.datas[0].url);
  const [full, setFull] = useState(false);

  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    setData(props.datas[0].url);
    console.log("---props.datas------", props.datas[0].url);
    console.log("props.id", id);
    // if (booktype === "WORKSHEETS") {
    //   setData(props.datas[1].url);
    // }
    // if (full === false) {
    //   console.log("full", full);
    //   // setFull(true);
    // }
  }, [props.sem]);

  useEffect(() => {
    props.size(true);
  }, [full]);
  // const handleKey = (e) => {
  //   if (e.keyCode === 27) {
  //     console.log("ESCAPE KEY");
  //   }
  // };

  const navigate = useNavigate();
  const handleClick = (url, index, data, booktype) => {
    setbooktype(booktype);

    setActive(index);
    setData(url);
  };

  const handleFullScreen = () => {
    // const fullScreen = document.getElementById("fullScreen");
    // console.log("fullscreen");
    // console.log("fullsize", fullsize);
    // setfullsize(true);
    // console.log("fullsize", fullsize);
    // props.size(true);

    // console.log(true);
    // fullScreen.requestFullscreen();
    setFull(true);
    // if (iframeref.current) {
    //   console.log("fullscreen");

    //   iframeref.current.requestFullscreen();
    // }
  };

  const handleFullScreen1 = () => {
    if (iframeref.current) {
      console.log("fullscreen");

      iframeref.current.requestFullscreen();
    }
  };

  const iframeref = useRef();

  console.log(data);

  // const onMyFrameLoad = () => {
  //   return true;
  // };

  const handleFull = () => {
    dispatch(setBookList(data));
    navigate(`/home/view-book/${id}`);
  };

  // var iframe = document.getElementById("i_frame");
  // document.addEventListener("DOMContentLoaded", () =>
  //   alert("DOMContentLoaded")
  // );
  // const iframe = document.getElementById("iframe");
  return (
    <>
      <div className="flex-col mx-[1rem] my-[1rem] h-[100%] p-[1rem] w-full">
        {props.datas.map((data, index) => (
          <span
            onClick={() =>
              handleClick(data.url, data.index, data, data.booktype)
            }
          >
            <Button
              className={`${
                active === data.index
                  ? "!bg-[#ff3c3c] !shadow-red-500 !shadow-md "
                  : "!bg-inherit !text-blue-600"
              } !p-[0.8rem] !mx-2`}
              variant="contained"
            >
              {data.booktype}
            </Button>
          </span>
        ))}

        {/* {props.datas.length === 0 ? ( */}

        <div className="mt-[1.5rem] sm:mt-[2rem] relative">
          <div className="ml-[30%] sm:ml-[45%] absolute z-10 mt-1">
            <Button
              onClick={handleFull}
              className={`!text-blue-600 !bg-white `}
              variant="outlined"
            >
              Full Screen
            </Button>
          </div>

          {/* {full ? ( */}
          {/* <iframe
            id="fullScreen"
            src={data}
            allow="fullscreen"
            ref={iframeref}
            className={`${"!h-[115vh] !w-[100vw] absolute top-0  left-0"}`}
          /> */}
          {/* ) : ( */}
          <iframe
            id="iframe"
            loading="eager"
            // onload={onMyFrameLoad}
            src={data}
            allow="fullscreen"
            ref={iframeref}
            className={`${"!h-[70vh] !w-full"}`}
          />
          {/* )} */}
          {/* <iframe
            src={data}
            ref={iframeref}
            className={`${full ? "!h-[115vh] !w-[100vw]" : "!h-full !w-full"}`}
          /> */}

          {/* fullscreen not working*/}
          {/* {full ? (
            <iframe
              id="fullScreen"
              src={data}
              allow="fullscreen"
              ref={iframeref}
              className={`${"!h-[115vh] !w-[100vw]"}`}
            />
          ) : (
            <iframe
              id="fullScreen"
              src={data}
              allow="fullscreen"
              ref={iframeref}
              className={`${"!h-[70vh] !w-full"}`}
            />
          )} */}
        </div>
        {/* ) : (
          <div>
            <iframe src={data} width="80%" className=" mt-[2rem] h-[60vh]" />
          </div>
        )} */}
      </div>
    </>
  );
};

export default MaterialTabs;
