import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Button, Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Checkbox } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import instance from "../instance";
import localinstance from "../localinstance";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AssignBooks = () => {
  const [searchVal, setSearchVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [open, setopen] = useState(false);
  const [fetchdata, setfetchdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [searchRow, setSearchRow] = useState([]);
  const [checked, setChecked] = useState(false);
  const [bookid, setbookid] = useState([]);
  const [postdata, setpostdata] = useState("");

  let { id } = useParams();
  useLayoutEffect(() => {
    fetch();
  }, []);

  //id conflicts can occur set a new id state to resolve
  const deleteid = async (id) => {
    console.log(id);

    try {
      const res = await instance({
        url: `series/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("token")}`,
          // accesskey: `auth74961a98ba76d4e4`,
        },
      });
      console.log(res.data.message);
      await fetch();
    } catch (error) {
      console.log(error.response.data.message.cause);
      if (
        error.response.data.message.cause === "Record to delete does not exist."
      ) {
        Swal.fire({
          text: "Book Cannot be deleted due to its utilization",
          icon: "warning",
        });
      }
    }
  };
  const fetch = async () => {
    const res = await localinstance({
      // url: `book/get/active`,

      url: `bookassign/get/user/unassignBooks/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    console.log("UNASSIGN-DATA---", res.data.message);
    let data = res.data.message;
    // let columns = Object.keys(res.data.message[0]);
    // console.log(columns);
    // setcolumns(columns);
    for (let obj of data) {
      obj.checked = false;
    }
    setfetchdata(data);
    // console.log(fetchdata);
    // fetch1(res.data.message.id);
    // setid(res.data.message.id);
  };

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
    console.log(fetchdata);
    setPage(0);
    let tempArr = [];
    for (let ele of fetchdata) {
      console.log(ele.series);
      let bookname = ele.name.toLowerCase();
      if (bookname.indexOf(searchVal.toLowerCase()) > -1) {
        tempArr.push(ele);
      }
    }
    console.log(tempArr);
    setSearchRow([]);
    if (tempArr.length === 0) {
      alert("No data Found");
    } else {
      setSearchRow(tempArr);
    }
  };

  const handlecheckbox = (e, data) => {
    console.log("value", e.target.value);
    console.log(data);
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

    console.log(id);
    console.log(fetchdata);
    let assign = [];
    for (let obj of fetchdata) {
      if (obj.checked === true) {
        assign.push({ bookid: obj.id });
      }
    }
    console.log(assign);
    setbookid(assign);
  };

  const handlebookassign = async () => {
    console.log(bookid);
    const res = await localinstance({
      url: `bookassign/create`,
      method: "POST",
      data: {
        userid: id,
        bookid: bookid,
      },
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    console.log(res.data);
    setpostdata(res.data.message);
    setopen(true);
  };
  const navigate = useNavigate();

  const handleback = () => {
    setopen(false);
    navigate("/admin/users");
  };
  return (
    <>
      <AdminNavbar />
      <div className="flex-col px-[2rem] py-4 mt-[10vh]">
        <div className="flex ">
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
                    "",
                    "BookName",
                    "Grade",
                    // "Author",
                    "Series",
                    "Subject",
                    "",
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
                        <TableCell align="left" className="bg-slate-200">
                          <Checkbox
                            value={index}
                            checked={data.checked}
                            onChange={(e) => handlecheckbox(e, data)}
                          />
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.name}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.gradeMaster.grade}
                        </TableCell>

                        <TableCell align="left" className="bg-slate-200">
                          {data.seriesMaster.series}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.subjectMaster.subject}
                        </TableCell>

                        <TableCell align="left" className="bg-slate-200">
                          <DeleteOutlineIcon
                            className=""
                            onClick={() => {
                              deleteid(data.id);
                            }}
                          />
                        </TableCell>
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
                        <TableCell align="left" className="bg-slate-200">
                          <Checkbox
                            value={index}
                            checked={data.checked}
                            onChange={(e) => handlecheckbox(e, data)}
                          />
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.name}
                        </TableCell>
                        <TableCell align="left" className="bg-slate-200">
                          {data.gradeMaster.grade}
                        </TableCell>
                        {/* <TableCell align="left" className="bg-slate-200">
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
                        {/* <TableCell align="left" className="bg-slate-200">
                      {data.status === true ? <Visibility /> : <VisibilityOff />}
                    </TableCell> */}
                        <TableCell align="left" className="bg-slate-200">
                          <DeleteOutlineIcon
                            className=""
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
        <div className="flex justify-end mt-3">
          <Button variant="contained" onClick={handlebookassign}>
            Assign
          </Button>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
          >
            <DialogTitle id="alert-dialog-title">"{postdata}"</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description"></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleback}>Go Back</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default AssignBooks;
