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
import AddSeries from "../AddForm/AddSeries";
import AddAuthor from "../AddForm/AddAuthor";
import localinstance from "../../localinstance";
import Swal from "sweetalert2";

export default function AuthorTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const [fetchdata, setfetchdata] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [id, setid] = useState("");

  useLayoutEffect(() => {
    fetch();
  }, []);

  // const deleteid = async (id) => {
  //   console.log(id);
  //   const res = await instance({
  //     url: `/author/delete/${id}`,
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `${Cookies.get("token")}`,
  //       // accesskey: `auth74961a98ba76d4e4`,
  //     },
  //   });
  //   console.log(res.data.message);
  //   await fetch();
  // };

  const Update = async (id, status) => {
    // console.log("UPDATE ID", id);
    // console.log("Status", status);
    const res = await instance({
      url: `author/update/status/${id}`,
      method: "PUT",
      data: {
        status: !status,
      },
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
    // console.log(res.data.message);
    await fetch();
  };

  const fetch = async (id) => {
    const res = await localinstance({
      url: `author/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    // console.log(res.data.message);
    // console.log(res.data.message[0]);
    let columns = Object.keys(res.data.message[0]);
    // console.log(columns);
    setcolumns(columns);
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

  const deleteid = async (id) => {
    // console.log(id);
    try {
      const res = await instance({
        url: `author/delete/${id}`,
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
      if (error.response.data.message.field_name === "book_fk (index)") {
        Swal.fire({
          text: "The author cannot be deleted at this time as it is currently in use.",
          icon: "warning",
        });
      }
    }
    await fetch();
  };
  return (
    <div className=" flex flex-col gap-5 sm:flex-row sm:gap-5 ">
      <div className="flex w-full md:w-[70%]">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className="!bg-slate-400 !w-full">
              <TableRow>
                {["Author", "Active", "Action"].map((header, i) => (
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
                    {data.author}
                  </TableCell>
                  {/* <TableCell align="left" className="bg-slate-200">
                    {data.series}
                  </TableCell> */}
                  <TableCell
                    align="left"
                    className="bg-slate-200 cursor-pointer"
                    onClick={() => {
                      Update(data.id, data.status);
                    }}
                  >
                    {data.status === true ? (
                      <Visibility className="!text-[#367E18]" />
                    ) : (
                      <VisibilityOff className="!text-[#B31312]" />
                    )}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="bg-slate-200 cursor-pointer"
                  >
                    <DeleteOutlineIcon
                      className="!text-[#B31312]"
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
      </div>
      <div className="flex w-full md:w-[60%] p-4">
        <AddAuthor fetch={fetch} fetchdata={fetchdata} />
      </div>
    </div>
  );
}
