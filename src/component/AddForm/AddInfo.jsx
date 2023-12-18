import { Button, TextField } from "@mui/material";
import BasicSelect from "../SearchDropdown/SearchDropdown";
import Cookies from "js-cookie";
import { useState, useEffect, useLayoutEffect } from "react";
import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import localinstance from "../../localinstance";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddInfo = () => {
  const [fetchdata, setfetchdata] = useState([]);
  const [fetchdata1, setfetchdata1] = useState([]);
  const [schoolid, setSchoolid] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [message, setmessage] = useState("");
  const [open, setopen] = useState(false);
  const [FirstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [phoneError, setphoneError] = useState(false);
  const [stateidError, setstateidError] = useState(false);
  const [schoolidError, setschoolidError] = useState(false);
  const [cityError, setcityError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [confirmpasswordError, setconfirmpasswordError] = useState(false);
  const [stateid, setstateid] = useState("");

  // const handleClickShowPassword = () => setshowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleOnSubmit = async (props) => {
    postData();
  };

  const postData = async () => {
    let dataToPost = {
      school: schoolid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: pass,
      confirmPassword: confirmpass,
    };
    // console.log(dataToPost);

    if (validateForm()) {
      const res = await localinstance({
        url: `auth/signup`,
        method: "POST",
        data: dataToPost,
        headers: {
          Authorization: `${Cookies.get("token")}`,
          // accesskey: `auth74961a98ba76d4e4`,
        },
      });
      // console.log(res.data);
      // console.log(res.data.message);

      // window.location.reload(true);
      Swal.fire({
        text: res.data.message,
        icon: "success",
        timer: 10000,
      });
    }
  };

  useLayoutEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await localinstance({
      url: "admin/get/states",
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    // console.log(res.data.message);
    setfetchdata(res.data.message);

    // fetch1(res.data.message.id);
  };

  const handleOrderProcessingForm = (value, type) => {
    switch (type) {
      case "select_state":
        // console.log(value, type);

        fetch1(value.id);
        setstateid(value.id);
        setstateidError(false);
        break;

      case "select_school":
        // console.log(value.id);
        setSchoolid(value.id);
        setschoolidError(false);
        break;

      default:
        break;
    }
  };

  const fetch1 = async (id) => {
    const res = await localinstance({
      url: `admin/get/states/school/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    // console.log(res.data.message);
    setfetchdata1(res.data.message);
  };

  const handlesubject = () => {
    setopen(false);
    // fetch();
  };

  const validateForm = () => {
    let valid = true;
    const RegexMob = /^(\+91)?0?[6-9]\d{9}$/;
    const RegexEmail =
      /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

    if (firstName.length === 0) {
      setFirstNameError(true);
      valid = false;
    }
    if (lastName.length === 0) {
      setlastNameError(true);
      valid = false;
    }
    if (email.length === 0) {
      setemailError(true);
      valid = false;
    }
    if (phone.length === 0 || phone.length > 10 || phone.length < 10) {
      setphoneError(true);
      valid = false;
    }
    if (schoolid.length === 0) {
      setschoolidError(true);
      valid = false;
    }
    if (stateid.length === 0) {
      setstateidError(true);
      valid = false;
    }
    if (pass.length === 0) {
      setpasswordError(true);
      valid = false;
    }
    if (confirmpass.length === 0) {
      setconfirmpasswordError(true);
      valid = false;
    }

    return valid;
  };

  const EnterFirstName = (e) => {
    if (FirstNameError) {
      setFirstNameError(false);
      setfirstName(e);
    } else {
      setfirstName(e);
    }
  };
  const EnterLastName = (e) => {
    if (lastNameError) {
      setlastNameError(false);
      setlastName(e);
    } else {
      setlastName(e);
    }
  };
  const EnterEmail = (e) => {
    const RegexEmail =
      /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/;

    if (emailError || RegexEmail.test(e)) {
      setemailError(false);
      setemail(e);
    } else if (!RegexEmail.test(e)) {
      setemailError(true);
    } else {
      setemail(e);
    }
  };
  const EnterPhone = (e) => {
    const RegexMob = /^(\+91)?0?[6-9]\d{9}$/;
    if (phoneError || RegexMob.test(e)) {
      setphoneError(false);
      setphone(e);
    } else if (!RegexMob.test(e)) {
      setphoneError(true);
    } else {
      setphone(e);
    }
  };

  const EnterPassword = (e) => {
    if (passwordError) {
      setpasswordError(false);
      setpass(e);
    } else {
      setpass(e);
    }
  };

  const EnterConfirmPassword = (e) => {
    if (confirmpasswordError) {
      setconfirmpasswordError(false);
      setconfirmpass(e);
    } else {
      setconfirmpass(e);
    }
  };

  return (
    <>
      {/* <AdminNavbar /> */}
      <div className="flex bg-white w-full">
        <div className="flex flex-col justify-center border-2 border-slate-400 w-[120%]  py-5   p-2 shadow-lg shadow-slate-400 rounded-lg">
          <div className="text-slate-400 !text-lg mb-5 mx-3">
            Basic Information
          </div>
          <form>
            <div className="flex gap-6">
              <div className="mx-3 py-2">
                First Name<span className="text-red-600">*</span>
              </div>
              <TextField
                name="FirstName"
                variant="outlined"
                onChange={(e) => EnterFirstName(e.target.value)}
                size="small"
                className="!w-full"
                error={FirstNameError}
              ></TextField>
              <br></br>
            </div>
            <div className="flex gap-6">
              <div className="mx-3  mt-3">
                Last Name<span className="text-red-600">*</span>
              </div>

              <TextField
                name="LastName"
                variant="outlined"
                onChange={(e) => EnterLastName(e.target.value)}
                size="small"
                className="!w-full !mt-2"
                error={lastNameError}
              ></TextField>
              <br></br>
            </div>
            <div className="flex gap-6 md:gap-[7%]">
              <div className="mt-3 mx-3">
                Email<span className="text-red-600">*</span>
              </div>

              <TextField
                name="Email"
                variant="outlined"
                onChange={(e) => EnterEmail(e.target.value)}
                size="small"
                className="!w-full !mt-2"
                error={emailError}
              ></TextField>
              <br></br>
            </div>
            <div className="flex gap-5 md:gap-[6%]">
              <div className="mt-3 mx-3">
                Phone<span className="text-red-600">*</span>
              </div>

              <TextField
                name="Phone"
                type="number"
                variant="outlined"
                onChange={(e) => EnterPhone(e.target.value)}
                size="small"
                className="!w-full !mt-2"
                error={phoneError}
              ></TextField>
              <br></br>
            </div>

            <div className="flex gap-7 lg:gap-[15%] mt-4   ">
              <div className="mx-3 ">
                State<span className="text-red-600">*</span>
              </div>

              <div className=" !mx-3  ">
                <BasicSelect
                  // onChange={(event, value) => console.log(value)}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  className="!w-full "
                  data={fetchdata}
                  Name={"select_state"}
                  label={"State"}
                  error={stateidError}
                />
              </div>
            </div>
            <div className="flex sm:gap-[2.7rem] gap-[15%] mt-4  ">
              <div className="mx-1 sm:mx-3 ">
                School<span className="text-red-600">*</span>
              </div>

              {/* <BasicSelect class="!w-[70%] mt-4 mx-3" label={"select_school"} /> */}
              <div className=" !mx-0 sm:!mx-3 ">
                <BasicSelect
                  // onChange={(event, value) => console.log(value)}
                  handleOrderProcessingForm={handleOrderProcessingForm}
                  class="!w-full mt-4 md:mt-0 "
                  data={fetchdata1}
                  Name={"select_school"}
                  label={"School"}
                  error={schoolidError}
                />
              </div>
            </div>

            <div className="flex gap-2 md:gap-6 mt-3">
              <div className="mx-3 ">
                Password <span className="text-red-600">*</span>
              </div>
              <TextField
                type={"password"}
                variant="outlined"
                onChange={(e) => EnterPassword(e.target.value)}
                size="small"
                className="!w-full "
                error={passwordError}
              ></TextField>
              <br></br>
            </div>
            <div className="flex gap-6 md:gap-0  mt-3">
              <div className="mx-3 md:mx-1 ">
                Confirm Password <span className="text-red-600">*</span>
              </div>
              <TextField
                type={"password"}
                variant="outlined"
                onChange={(e) => EnterConfirmPassword(e.target.value)}
                size="small"
                className="!w-full"
                error={confirmpasswordError}
              ></TextField>
              <br></br>
            </div>

            <div className="flex justify-center mt-3">
              <Button variant="contained" className="" onClick={handleOnSubmit}>
                Submit
              </Button>
              <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Transition}
              >
                <DialogTitle id="alert-dialog-title">"{message}"</DialogTitle>
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
      </div>
    </>
  );
};
export default AddInfo;
