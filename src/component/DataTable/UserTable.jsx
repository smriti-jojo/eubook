import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import localinstance from "../../localinstance";
import AddInfo from "../AddForm/AddInfo";
import { Button, Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Calender from "../Calendar/Calendar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Loader from "../Loader/Loader";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function UserTable({ props }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setopen] = useState(false);
  const [fetchdata, setfetchdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [id, setid] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const [searchRow, setSearchRow] = useState([]);
  const [expiry, setExpiry] = useState("");
  const [datemessage, setDatemessage] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setLoading(true);
    const res = await localinstance({
      url: `user/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });

    let data = res.data.message;

    setfetchdata(res.data.message);

    // fetch1(res.data.message.id);
    setLoading(false);
  };

  const handleaddexpiry = () => {
    setopen(true);
  };

  const handlestatus = async (id, stat) => {
    const res = await localinstance({
      url: `user/update/status/${id}`,
      method: "PUT",
      data: {
        status: !stat,
      },
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    let temp = [...fetchdata];
    for (let obj of temp) {
      if (id === obj.id) {
        obj.status = !stat;
      }
    }
    // fetch();
    setfetchdata(temp);
  };
  const navigate = useNavigate();

  const handleassignbook = (id) => {
    // console.log(id);
    navigate(`/admin/users/assign_books/${id}`);
  };
  const handlebook = (id) => {
    // console.log(id);
    navigate(`/admin/users/books/${id}`);
  };

  //   const handledialogclose = () => {
  //     setopen(false);
  //   };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fetchdata.length) : 0;

  const handleSearch = (val) => {
    setSearchVal(val.trim());
  };

  const filterTable = () => {
    // console.log(searchVal);
    // console.log(rowdata)
    setPage(0);
    let tempArr = [];
    for (let ele of fetchdata) {
      // console.log(ele)
      let firstName = ele.firstName.toLowerCase();
      let lastName = ele.lastName.toLowerCase();
      if (
        firstName.indexOf(searchVal.toLowerCase()) > -1 ||
        lastName.indexOf(searchVal.toLowerCase()) > -1
      ) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const handledialog = () => {
    setopen(true);
  };

  const handlesubject = () => {
    setopen(false);

    // fetch();
  };

  const handledateprops = (date) => {
    setExpiry(date);
  };

  const handlecalenderdate = async (id) => {
    // console.log(id);
    // console.log(expiry);
    // setopen(false);
    const res = await localinstance({
      url: `user/update/expiry/${id}`,
      method: "PUT",
      data: {
        expiry: expiry,
      },
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    // console.log(res.data.message);
    alert(res.data.message);
    setDatemessage(res.data.message);

    setopen(false);
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-5 ">
      <div className="flex !w-full p-4  ">
        <TableContainer
          component={Paper}
          //   sx={{ minWidth: 1000, marginLeft: 5 }}
        >
          <Toolbar className="bg-slate-400 flex justify-between !w-[320%] sm:!w-[180%] md:!w-[200%] lg:!w-full">
            <div className="flex ">
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
              rowsPerPageOptions={[10, 50, 100, { label: "All", value: -1 }]}
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
                  "First_Name",
                  "Last_Name",
                  "Email",
                  "Phone",
                  "Created At",
                  "Category",
                  "Status",
                  "",
                ].map((header, i) => (
                  <TableCell className="!font-black text-lg !bg-slate-500 ">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {loading ? (
              <div>
                <Loader />
              </div>
            ) : (
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
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" className="bg-slate-200">
                          {data.firstName}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.lastName}
                        </TableCell>
                        {/* <TableCell align="left" className="bg-slate-200">
                    {data.status === true ? <Visibility /> : <VisibilityOff />}
                  </TableCell> */}
                        <TableCell align="left" className="bg-slate-200">
                          {data.email}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.phone}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.createdAt}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.UserCategory.category}
                        </TableCell>

                        <TableCell
                          align="left"
                          className="bg-slate-200 cursor-pointer"
                        >
                          <div
                            onClick={() => handlestatus(data.id, data.status)}
                          >
                            {data.status === true ? (
                              <Visibility className="!text-[#008000]" />
                            ) : (
                              <VisibilityOff className="!text-[#FF0000]" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.UserCategory.category === "Admin" ? (
                            <div></div>
                          ) : (
                            <div className="flex gap-2 cursor-pointer">
                              <Button
                                variant="contained"
                                onClick={() => handleassignbook(data.id)}
                                className=" !w-full gap-1"
                              >
                                Assign <span> Books</span>
                              </Button>
                              <div>
                                <Button
                                  variant="contained"
                                  className="!w-full gap-1 !bg-slate-500 cursor-pointer"
                                  onClick={handleaddexpiry}
                                >
                                  Add <span>Expiry</span>
                                </Button>
                                <Dialog
                                  PaperProps={{
                                    sx: {
                                      backgroundColor: "",
                                    },
                                  }}
                                  open={open}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                  TransitionComponent={Transition}
                                >
                                  <DialogContent className="">
                                    <div className=" mx-[5rem] mt-[1rem] shadow-md shadow-black">
                                      <Calender
                                        handledateprops={handledateprops}
                                      />
                                      <CloseIcon
                                        className="!bg-[#B31312] absolute bottom-[150px] left-[440px] cursor-pointer"
                                        onClick={handleClose}
                                      />
                                    </div>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={() =>
                                        handlecalenderdate(data.id)
                                      }
                                      variant="contained"
                                    >
                                      Set Date
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                              <Button
                                variant="contained"
                                className=" !w-full gap-1"
                                onClick={() => handlebook(data.id)}
                              >
                                Books
                              </Button>
                            </div>
                          )}
                        </TableCell>

                        {/* <TableCell align="left" className="bg-slate-200">
                    <DeleteOutlineIcon
                      className=""
                      onClick={() => {
                        deleteid(data.id);
                      }}
                    />
                  </TableCell> */}
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
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" className="bg-slate-200">
                          {data.firstName}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.lastName}
                        </TableCell>
                        {/* <TableCell align="left" className="bg-slate-200">
                    {data.status === true ? <Visibility /> : <VisibilityOff />}
                  </TableCell> */}
                        <TableCell align="left" className="bg-slate-200">
                          {data.email}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.phone}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.createdAt}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.UserCategory.category}
                        </TableCell>

                        <TableCell align="left" className="bg-slate-200">
                          <div
                            onClick={() => handlestatus(data.id, data.status)}
                          >
                            {data.status === true ? (
                              <Visibility className="!text-[#008000] cursor-pointer" />
                            ) : (
                              <VisibilityOff className="!text-[#FF0000] cursor-pointer" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.UserCategory.category === "Admin" ? (
                            <div></div>
                          ) : (
                            <div className="flex gap-2 cursor-pointer">
                              <Button
                                variant="contained"
                                onClick={() => handleassignbook(data.id)}
                                className=" !w-full gap-1"
                              >
                                Assign <span> Books</span>
                              </Button>
                              <div>
                                <Button
                                  variant="contained"
                                  className="!w-full gap-1 !bg-slate-500 cursor-pointer"
                                  onClick={handleaddexpiry}
                                >
                                  Add <span>Expiry</span>
                                </Button>
                                <Dialog
                                  PaperProps={{
                                    sx: {
                                      backgroundColor: "",
                                    },
                                  }}
                                  open={open}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description"
                                  TransitionComponent={Transition}
                                >
                                  <DialogContent className="">
                                    <div className=" mx-[5rem] mt-[1rem] shadow-md shadow-black">
                                      <Calender
                                        handledateprops={handledateprops}
                                      />
                                      <CloseIcon
                                        className="!bg-[#B31312] absolute bottom-[150px] left-[440px] cursor-pointer"
                                        onClick={handleClose}
                                      />
                                    </div>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={() =>
                                        handlecalenderdate(data.id)
                                      }
                                      variant="contained"
                                    >
                                      Set Date
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                              <Button
                                variant="contained"
                                className=" !w-full gap-1"
                                onClick={() => handlebook(data.id)}
                              >
                                Books
                              </Button>
                            </div>
                          )}
                        </TableCell>

                        {/* <TableCell align="left" className="bg-slate-200">
                    <DeleteOutlineIcon
                      className=""
                      onClick={() => {
                        deleteid(data.id);
                      }}
                    />
                  </TableCell> */}
                        {/* <TableCell align="right">{row.protein}</TableCell> */}
                      </TableRow>
                    ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 41 * emptyRows }}>
                    <TableRow colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
          {/* <TablePagination
            component="div"
            count={fetchdata.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </TableContainer>
      </div>
      {/* <div className="flex w-full justify-center md:w-[60%] p-4">
        <AddInfo />
      </div> */}
    </div>
  );
}
