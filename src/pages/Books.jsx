import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useLayoutEffect } from "react";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TablePagination from "@mui/material/TablePagination";
import { Button, Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Checkbox } from "@mui/material";
import { Padding, Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import MenuBar from "../component/Menu/Menu";
import { Dialog } from "@mui/material";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContent";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BookIcon from "@mui/icons-material/Book";

const Books = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchVal, setSearchVal] = useState("");
  const [fetchdata, setfetchdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setid] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [BookUrlerror, setBookUrlerror] = useState(false);
  const [book_url, setbook_url] = useState("");
  const [book_id, setbook_id] = useState("");
  const [cover_id, setcover_id] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [BookCoverError, setBookCoverError] = useState("");
  const [bookCover, setbookCover] = useState("");
  const [OpenCover, setOpenCover] = useState(false);

  useLayoutEffect(() => {
    fetch();
  }, []);

  const deleteid = async (id) => {
    // console.log(id);
    try {
      const res = await localinstance({
        url: `book/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("token")}`,
          // accesskey: `auth74961a98ba76d4e4`,
        },
      });
      // console.log(res.data.message);

      //   await fetch();
    } catch (error) {
      // console.log(error.response.data.message.field_name);
      if (
        error.response.data.message.field_name === "booksassign_fk_1 (index)"
      ) {
        // alert(
        //   "The book cannot be deleted at this time as it is currently in use."
        // );
        Swal.fire({
          title: "Book is not available for deletion",
          text: "In light of its current utilization, this book is not available for deletion.",
          icon: "warning",
        });
      }
    }
    await fetch();
  };
  const fetch = async () => {
    const res = await localinstance({
      url: `book/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    let data = res.data.message;
    console.log("fetchBOOK-------", res.data.message);
    // for (let obj of data) {
    //   console.log("bookamterail---", obj.bookMaterial[0].book_url);
    // }
    setfetchdata(res.data.message);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const navigate = useNavigate();
  const handleview = () => {
    navigate("/admin/all_books/view");
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchdata.length) : 0;

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    // console.log(fetchdata);
    setPage(0);
    let tempArr = [];
    for (let ele of fetchdata) {
      // console.log(ele.series);
      let bookname = ele.name.toLowerCase();
      if (bookname.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    // console.log(tempArr);
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const handlecheckbox = (e, data) => {
    // console.log("value", e.target.value);
    // console.log(data);
    // let tempindex = [];
    // tempindex.push(e.target.value);
    // console.log(tempindex);
    let temp = [...fetchdata];
    for (let obj of temp) {
      if (data.id === obj.id) {
        obj.checked = !obj.checked;
      }
    }
    setfetchdata(temp);
  };

  const Update = async (id, status) => {
    // console.log("UPDATE ID", id);
    // console.log("Status", status);
    const res = await localinstance({
      url: `book/update/status/${id}`,
      method: "PUT",
      data: {
        status: !status,
      },
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
    // console.log("UPDATE STATUS", res.data.message);
    await fetch();
  };

  const handleOpen = (id) => {
    console.log("---id---", id);
    setbook_id(id);
    setOpen(true);
  };

  const handleOpenCover = (id) => {
    setcover_id(id);
    setOpenCover(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCover = () => {
    setOpenCover(false);
  };

  const handleBookUrl = async (e) => {
    // console.log("----BOOKID---", book_id);
    const PutData = {
      book_url: book_url,
    };
    // console.log("PUTDATA-----", PutData);
    try {
      const res = await localinstance({
        url: `book/update/material/${book_id}`,
        method: "PUT",
        data: PutData,
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
      });
      console.log("---UPDATE Book---", res.data.message);
      const resData = res.data.message;
      if (resData === "Book URL updated successfully") {
        Swal.fire({
          title: "Book Updated Successfully",
          icon: "success",
        });
        // setAnchorEl(e.currentTarget);
        setOpen(false);
      }
      // Swal.fire({
      //   title: "Book Updated Successfully",
      //   icon: "success",
      // });
      // // setAnchorEl(e.currentTarget);
      // setOpen(false);
      await fetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  // const openPop = Boolean(anchorEl);
  // const idPop = openPop ? "simple-popover" : undefined;

  const handleEnter = (val) => {
    const regex = /index\.html$/;
    let value = val.trim();

    if (!regex.test(value) && value.length > 0) {
      setBookUrlerror(true);
    } else if (value.length === 0) {
      setBookUrlerror(false);
    } else {
      setError(false);
      setBookUrlerror(false);
      setbook_url(value);
    }
  };

  const handleEnterCover = (val) => {
    const regex = /(https?:\/\/.*\.(?:png|jpg))/i;
    let value = val.trim();
    if (!regex.test(value) && value.length > 0) {
      setBookCoverError(true);
    } else if (value.length === 0) {
      setBookCoverError(false);
    }
    //  else if (!regex.test(book_cover)) {
    //   setBookCoverError(true);
    // }
    else {
      setError(false);
      setBookCoverError(false);
      setbookCover(value);
    }
  };

  const handleBookCover = async (e) => {
    // console.log("----BOOKID---", book_id);
    const PutData = {
      coverPageUrl: bookCover,
    };
    // console.log("PUTDATA-----", PutData);
    try {
      const res = await localinstance({
        url: `book/update/coverpage/${cover_id}`,
        method: "PUT",
        data: PutData,
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
      });
      console.log("---UPDATE BooK COVER---", res.data.message);
      const resData = res.data.message;
      // if (resData === "Book URL updated successfully") {
      //   Swal.fire({
      //     title: "Book Updated Successfully",
      //     icon: "success",
      //   });
      //   // setAnchorEl(e.currentTarget);
      //   setOpen(false);
      // }
      // Swal.fire({
      //   title: "Book Updated Successfully",
      //   icon: "success",
      // });
      // // setAnchorEl(e.currentTarget);
      setOpenCover(false);
      await fetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="">
        <div>
          <AdminNavbar />
        </div>
        <div className="flex justify-between mt-[5rem] ">
          <div className="p-3">
            <div>Admin</div>
            <div>
              <Breadcrumb />
            </div>
          </div>
          <div>
            {" "}
            <MenuBar status={"addBooks"} />{" "}
          </div>
        </div>
        {/* <div className=" flex flex-col gap-5 sm:flex-row sm:gap-5 "> */}
        <div className="flex w-full px-[2rem] py-4 justify-center">
          <div className="flex w-[80%] ">
            <TableContainer component={Paper}>
              <Toolbar className="bg-slate-400 flex justify-between">
                <div className="flex">
                  <TextField
                    id="search-bar"
                    className="text"
                    onInput={(e) => {
                      handleSearch(e.target.value);
                    }}
                    label="Enter Search Value"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    type="search"
                  />
                  <div className="bg-slate-300">
                    <IconButton
                      type="submit"
                      aria-label="search"
                      onClick={filterTable}
                    >
                      <SearchIcon style={{ fill: "blue" }} />
                    </IconButton>
                  </div>
                </div>

                <TablePagination
                  rowsPerPageOptions={[
                    10,
                    50,
                    100,
                    { label: "All", value: -1 },
                  ]}
                  colSpan={3}
                  count={
                    searchRow.length === 0 ? fetchdata.length : searchRow.length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Toolbar>

              <Table aria-label="simple table">
                <TableHead className="!bg-slate-400 !w-full">
                  <TableRow>
                    {[
                      "BookName",
                      "Grade",
                      // "Author",
                      "Series",
                      "Subject",
                      "Preview",
                      "Edit",
                      "Action",
                    ].map((header, i) => (
                      <TableCell className="!font-black text-lg !bg-slate-500">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchRow.length === 0
                    ? (rowsPerPage > 0
                        ? fetchdata.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : fetchdata
                      ).map((data, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          {/* <TableCell align="left" className="bg-slate-200">
                            <Checkbox
                              value={index}
                              checked={data.checked}
                              onChange={(e) => handlecheckbox(e, data)}
                            />
                          </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            {data.name}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.gradeMaster.grade}
                          </TableCell>
                          {/* <TableCell algradeign="left" className="bg-slate-200">
                    {data.series}
                  </TableCell> */}
                          {/* <TableCell align="left" className="bg-slate-200">
                            {data.bookAuthor.author}
                          </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            {data.seriesMaster.series}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.subjectMaster.subject}
                          </TableCell>
                          {/* <TableCell
                            align="left"
                            className="bg-slate-200"
                            onClick={() => Update(data.id)}
                          >
                            {data.status === true ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </TableCell> */}
                          <TableCell
                            align="left"
                            className="bg-slate-200 cursor-pointer "
                          >
                            <div className="flex-col ">
                              {/* <div>
                                <Button variant="contained">Cover</Button>
                              </div> */}
                              {data.bookMaterial.map((item) => (
                                <div className="p-2 border-solid border-2  w-[5.2rem] rounded-md bg-blue-600 text-white justify-center">
                                  <a href={item.book_url} target="_blank">
                                    Book
                                  </a>
                                </div>
                              ))}
                              <div className="p-2 border-solid border-2  w-[5.2rem] rounded-md bg-blue-600 text-white justify-center">
                                <a href={data.book_cover} target="_blank">
                                  Cover
                                </a>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell
                            align="left"
                            className="bg-slate-200 cursor-pointer"
                          >
                            <div className="flex-col">
                              <div className="p-2">
                                <AutoStoriesIcon
                                  onClick={() => handleOpen(data.id)}
                                />

                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  // PaperProps={{
                                  //   sx: {
                                  //     size: "1200px",
                                  //   },
                                  // }}
                                  fullWidth
                                  maxWidth="sm"
                                >
                                  <DialogTitle className="font-bold">
                                    Edit Book Url
                                  </DialogTitle>
                                  <DialogContent>
                                    {/* <DialogContentText>
                                  To subscribe to this website, please enter
                                  your email address here. We will send updates
                                  occasionally.
                                </DialogContentText> */}
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="name"
                                      label="Enter Book Url"
                                      fullWidth
                                      variant="standard"
                                      onChange={(e) =>
                                        handleEnter(e.target.value, data.id)
                                      }
                                      error={error || BookUrlerror}
                                      helperText={
                                        BookUrlerror
                                          ? "Enter Valid Book Url"
                                          : ""
                                      }
                                    />
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={handleClose}
                                      className="!text-[#FF0000]"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleBookUrl}
                                      className="!text-[#008000]"
                                    >
                                      Save
                                    </Button>
                                    {/* <Popover
                                  id={idPop}
                                  open={openPop}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{ p: 200 }}>
                                    The content of the Popover.
                                  </Typography>
                                </Popover> */}
                                  </DialogActions>
                                </Dialog>
                              </div>
                              <div className="p-2">
                                <BookIcon
                                  onClick={() => handleOpenCover(data.id)}
                                />

                                <Dialog
                                  open={OpenCover}
                                  onClose={handleCloseCover}
                                  // PaperProps={{
                                  //   sx: {
                                  //     size: "1200px",
                                  //   },
                                  // }}
                                  fullWidth
                                  maxWidth="sm"
                                >
                                  <DialogTitle className="font-bold">
                                    Edit Book Cover
                                  </DialogTitle>
                                  <DialogContent>
                                    {/* <DialogContentText>
                                  To subscribe to this website, please enter
                                  your email address here. We will send updates
                                  occasionally.
                                </DialogContentText> */}
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="name"
                                      label="Enter Book Cover"
                                      fullWidth
                                      variant="standard"
                                      onChange={(e) =>
                                        handleEnterCover(
                                          e.target.value,
                                          data.id
                                        )
                                      }
                                      error={error || BookCoverError}
                                      helperText={
                                        BookCoverError
                                          ? "Enter Valid Book Cover"
                                          : ""
                                      }
                                    />
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={handleCloseCover}
                                      className="!text-[#FF0000]"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleBookCover}
                                      className="!text-[#008000]"
                                    >
                                      Save
                                    </Button>
                                    {/* <Popover
                                  id={idPop}
                                  open={openPop}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{ p: 200 }}>
                                    The content of the Popover.
                                  </Typography>
                                </Popover> */}
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell
                            align="left"
                            className="bg-slate-200 cursor-pointer"
                          >
                            <DeleteOutlineIcon
                              className="!text-[#FF0000]"
                              onClick={() => {
                                deleteid(data.id);
                              }}
                            />
                          </TableCell>
                          {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                      ))
                    : (rowsPerPage > 0
                        ? searchRow.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : searchRow
                      ).map((data, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          {/* <TableCell align="left" className="bg-slate-200">
                            <Checkbox
                              value={index}
                              checked={data.checked}
                              onChange={(e) => handlecheckbox(e, data)}
                            />
                          </TableCell> */}
                          <TableCell align="left" className="bg-slate-200">
                            {data.name}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.gradeMaster.grade}
                          </TableCell>
                          {/* <TableCell align="left" className="bg-slate-200">
                      {data.series}
                    </TableCell> */}

                          <TableCell align="left" className="bg-slate-200">
                            {data.seriesMaster.series}
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            {data.subjectMaster.subject}
                          </TableCell>
                          {/* <TableCell align="left" className="bg-slate-200">
                            {data.status === true ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </TableCell> */}
                          <TableCell
                            align="left"
                            className="bg-slate-200 cursor-pointer "
                          >
                            <div className="flex-col ">
                              {/* <div>
                                <Button variant="contained">Cover</Button>
                              </div> */}
                              {data.bookMaterial.map((item) => (
                                <div className="p-2 border-solid border-2  w-[5.2rem] rounded-md bg-blue-600 text-white justify-center">
                                  <a href={item.book_url} target="_blank">
                                    Book
                                  </a>
                                </div>
                              ))}
                              <div className="p-2 border-solid border-2  w-[5.2rem] rounded-md bg-blue-600 text-white justify-center">
                                <a href={data.book_cover} target="_blank">
                                  Cover
                                </a>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            className="bg-slate-200 cursor-pointer"
                          >
                            <div className="flex-col">
                              <div className="p-2">
                                <AutoStoriesIcon
                                  onClick={() => handleOpen(data.id)}
                                />

                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  // PaperProps={{
                                  //   sx: {
                                  //     size: "1200px",
                                  //   },
                                  // }}
                                  fullWidth
                                  maxWidth="sm"
                                >
                                  <DialogTitle className="font-bold">
                                    Edit Book Url
                                  </DialogTitle>
                                  <DialogContent>
                                    {/* <DialogContentText>
                                  To subscribe to this website, please enter
                                  your email address here. We will send updates
                                  occasionally.
                                </DialogContentText> */}
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="name"
                                      label="Enter Book Url"
                                      fullWidth
                                      variant="standard"
                                      onChange={(e) =>
                                        handleEnter(e.target.value, data.id)
                                      }
                                      error={error || BookUrlerror}
                                      helperText={
                                        BookUrlerror
                                          ? "Enter Valid Book Url"
                                          : ""
                                      }
                                    />
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={handleClose}
                                      className="!text-[#FF0000]"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleBookUrl}
                                      className="!text-[#008000]"
                                    >
                                      Save
                                    </Button>
                                    {/* <Popover
                                  id={idPop}
                                  open={openPop}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{ p: 200 }}>
                                    The content of the Popover.
                                  </Typography>
                                </Popover> */}
                                  </DialogActions>
                                </Dialog>
                              </div>
                              <div className="p-2">
                                <BookIcon
                                  onClick={() => handleOpenCover(data.id)}
                                />

                                <Dialog
                                  open={OpenCover}
                                  onClose={handleCloseCover}
                                  // PaperProps={{
                                  //   sx: {
                                  //     size: "1200px",
                                  //   },
                                  // }}
                                  fullWidth
                                  maxWidth="sm"
                                >
                                  <DialogTitle className="font-bold">
                                    Edit Book Cover
                                  </DialogTitle>
                                  <DialogContent>
                                    {/* <DialogContentText>
                                  To subscribe to this website, please enter
                                  your email address here. We will send updates
                                  occasionally.
                                </DialogContentText> */}
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="name"
                                      label="Enter Book Cover"
                                      fullWidth
                                      variant="standard"
                                      onChange={(e) =>
                                        handleEnterCover(
                                          e.target.value,
                                          data.id
                                        )
                                      }
                                      error={error || BookCoverError}
                                      helperText={
                                        BookCoverError
                                          ? "Enter Valid Book Cover"
                                          : ""
                                      }
                                    />
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={handleCloseCover}
                                      className="!text-[#FF0000]"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleBookCover}
                                      className="!text-[#008000]"
                                    >
                                      Save
                                    </Button>
                                    {/* <Popover
                                  id={idPop}
                                  open={openPop}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                >
                                  <Typography sx={{ p: 200 }}>
                                    The content of the Popover.
                                  </Typography>
                                </Popover> */}
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="left" className="bg-slate-200">
                            <DeleteOutlineIcon
                              className="!text-[#FF0000]"
                              onClick={() => {
                                deleteid(data.id);
                              }}
                            />
                          </TableCell>
                          {/* <TableCell align="right">{row.protein}</TableCell> */}
                        </TableRow>
                      ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 41 * emptyRows }}>
                      <TableRow colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
