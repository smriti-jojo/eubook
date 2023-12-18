import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import instance from "../instance";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import localinstance from "../localinstance";
import { Button } from "@mui/material";
import AdminNavbar from "../component/Navbar/AdminNavbar";

const WishList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const [fetchdata, setfetchdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [id, setid] = useState("");

  useLayoutEffect(() => {
    fetch();
  }, []);

  const deleteid = async (id) => {
    console.log(id);
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
  };
  const fetch = async (id) => {
    const res = await localinstance({
      url: `series/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    console.log(res.data.message);
    console.log(res.data.message[0]);
    let columns = Object.keys(res.data.message[0]);
    console.log(columns);
    setcolumns(columns);
    setfetchdata(res.data.message);
    // fetch1(res.data.message.id);
    // setid(res.data.message.id);
    console.log(fetchdata);
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

  return (
    <>
      <AdminNavbar />
      <div className="flex justify-center mt-[3rem]">
        <div className="flex-col w-full md:w-[70%]">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead className="!bg-slate-400 !w-full">
                <TableRow>
                  {[
                    "USER ",
                    "PHONE",
                    "SCHOOL",
                    "BOOKNAME",
                    "BOOK GRADE",
                    "BOOK SUBJECT",
                    "BOOK SERIES",
                    "",
                  ].map((header, i) => (
                    <TableCell className="!font-black text-lg !bg-slate-500">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? fetchdata.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : fetchdata
                ).map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" className="bg-slate-200">
                      {"hii"}
                    </TableCell>
                    <TableCell align="left" className="bg-slate-200">
                      {data.series}
                    </TableCell>
                    {/* <TableCell align="left" className="bg-slate-200">
                      {data.status === true ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </TableCell> */}
                    <TableCell align="left" className="bg-slate-200">
                      {"St. Mary School"}
                    </TableCell>
                    <TableCell align="left" className="bg-slate-200">
                      {"Test_book"}
                    </TableCell>
                    <TableCell align="left" className="bg-slate-200">
                      {"1"}
                    </TableCell>
                    <TableCell align="left" className="bg-slate-200">
                      {"English"}
                    </TableCell>
                    <TableCell align="left" className="bg-slate-200">
                      {"Wow"}
                    </TableCell>
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
            <TablePagination
              component="div"
              count={fetchdata.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          <div className="flex justify-end gap-3">
            <Button variant="contained">Approve</Button>
            <Button variant="contained">Reject</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
