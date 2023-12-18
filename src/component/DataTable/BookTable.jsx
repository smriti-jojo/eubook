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
import instance from "../../instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddBook from "../AddForm/AddBook";
import AddAuthor from "../AddForm/AddAuthor";
import localinstance from "../../localinstance";
import Swal from "sweetalert2";
import { Toolbar } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function AuthorTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchVal, setSearchVal] = useState("");
  const [fetchdata, setfetchdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [id, setid] = useState("");
  const [searchRow, setSearchRow] = useState([]);

  useLayoutEffect(() => {
    fetch();
  }, []);

  // const deleteid = async (id) => {
  //   console.log(id);
  //   const res = await localinstance({
  //     url: `/book/delete/${id}`,
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `${Cookies.get("token")}`,
  //       // accesskey: `auth74961a98ba76d4e4`,
  //     },
  //   });
  //   console.log(res.data.message);
  //   await fetch();
  // };

  const fetch = async (id) => {
    const res = await localinstance({
      url: `book/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });
    console.log("booktable", res.data.message);
    setfetchdata(res.data.message);
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

  const deleteid = async (id) => {
    // console.log(id);
    try {
      const res = await instance({
        url: `book/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("token")}`,
          // accesskey: `auth74961a98ba76d4e4`,
        },
      });
      // console.log(res.data.message);
      Swal.fire({
        title: res.data.message,

        icon: "warning",
      });

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

  return (
    <div className=" flex flex-col gap-5 sm:flex-row sm:gap-5 ">
      <div className="flex w-full md:w-[70%] md:h-[70%]">
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
                      <TableCell align="left" className="bg-slate-200">
                        {/* <Checkbox
                          value={index}
                          checked={data.checked}
                          onChange={(e) => handlecheckbox(e, data)}
                        /> */}
                      </TableCell>
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
                      <TableCell align="left" className="bg-slate-200">
                        {/* <Checkbox
                          value={index}
                          checked={data.checked}
                          onChange={(e) => handlecheckbox(e, data)}
                        /> */}
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
                      <TableCell align="left" className="bg-slate-200">
                        <DeleteOutlineIcon
                          className="!text-[#FF0000] cursor-pointer"
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
      <div className="flex w-full md:w-[60%] px-4 ">
        <AddBook fetch={fetch} />
      </div>
    </div>
  );
}
