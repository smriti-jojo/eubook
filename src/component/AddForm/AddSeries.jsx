import { Button, TextField } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
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
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddSeries = ({ fetch, fetchdata }) => {
  const [subjectid, setsubjectid] = useState("");
  const [series, setseries] = useState("");
  const [open, setopen] = useState(false);
  const [error, setError] = useState(false);
  const [postdata, setpostdata] = useState([]);
  const [fetchseriesdata, setfetchseriesdata] = useState([]);
  const [data, setData] = useState([]);
  const [seriesError, setSeriesError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  // console.log(series);
  useLayoutEffect(() => {
    fetchseries();
    // console.log("--fetch--", fetchdata);
  }, []);

  const fetchseries = async () => {
    const res = await localinstance({
      url: `subject/get/active`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    // console.log("fetchseriesData", res.data.message);
    setfetchseriesdata(res.data.message);
  };

  const handleOrderProcessingForm = (value, type) => {
    switch (type) {
      case "select_seriessubject":
        // console.log("subjectid", value.id);
        setSubjectError(false);
        setsubjectid(value.id);
        break;

      default:
        break;
    }
  };
  const handleaddsubject = async () => {
    await postData();
    await fetch();
  };

  const postData = async () => {
    let dataToPost = {
      subjectid: subjectid,
      series: series,
    };
    try {
      if (validateForm()) {
        const res = await localinstance({
          url: `series/create`,
          method: "POST",
          data: dataToPost,
          headers: {
            Authorization: `${Cookies.get("token")}`,
            // accesskey: `auth74961a98ba76d4e4`,
          },
        });

        setpostdata(res.data.message);
        setopen(true);
        setInterval(() => {
          window.location.reload(true);
        }, 2000);
      }
    } catch (error) {
      // console.log(error.response.data.status);
      if (error.response.data.status === "error") {
        Swal.fire({
          title: "Series Already Present in Database",
          icon: "warning",
          timer: 10000,
        }).then(() => {
          window.location.reload(true);
        });
      }
    }
  };

  const navigate = useNavigate();

  const handlesubject = () => {
    setopen(false);
  };

  // const handleEnter = (val) => {
  //   console.log(val);
  //   let text = val.trim();
  //   console.log(text);

  //   {
  //     fetch.map((item) => {
  //       if (item.name === text) {
  //         setError(true);
  //       } else if (text.length === 0) {
  //         setError(false);
  //       } else {
  //         setGrade(text);
  //       }
  //     });
  //   }
  // };
  const validateForm = () => {
    let valid = true;
    if (series.length === 0) {
      setError(true);
      valid = false;
    }
    if (subjectid.length === 0) {
      setSubjectError(true);
      valid = false;
    }

    return valid;
  };

  const handleEnter = (val) => {
    // console.log(val);
    let text = val.trim();
    // console.log(text);

    {
      fetchdata.map((item) => {
        if (item.series === text && item.subjectMaster.id === subjectid) {
          setSeriesError(true);
        } else if (text.length === 0) {
          setSeriesError(false);
        } else {
          setError(false);
          setSeriesError(false);
          setseries(text);
        }
      });
    }
  };

  return (
    <div className="border-2 border-black rounded-md shadow-md shadow-slate-400 !bg-white">
      <form>
        <div className="flex  justify-center p-3 border-2 border-slate-500 rounded-md !bg-slate-400">
          <div className="p-1 text-black font-extrabold">Add series</div>
        </div>
        <div className="flex gap-4">
          <div className="mx-3 my-3  items-center">Subject</div>

          <div className="mx-6">
            <BasicSelect
              handleOrderProcessingForm={handleOrderProcessingForm}
              className="!w-full "
              data={fetchseriesdata}
              Name={"select_seriessubject"}
              label={"Series"}
              error={subjectError}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="mx-3 my-3  items-center">Series</div>
          <TextField
            className="!p-3 !w-[55%]"
            size="small"
            onChange={(e) => handleEnter(e.target.value)}
            error={error || seriesError}
            helperText={seriesError ? "Series already present in database" : ""}
          />
        </div>
        <div className="flex justify-center p-3">
          <Button
            type="reset"
            variant="contained"
            className=""
            onClick={handleaddsubject}
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
                New Series Added Successfully!!!
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

export default AddSeries;
