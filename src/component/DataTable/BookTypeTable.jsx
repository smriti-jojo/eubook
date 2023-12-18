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
import AddSubject from "../AddForm/AddSubject";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import localinstance from "../../localinstance";
import Loader from "../Loader/Loader";
import AddGrade from "../AddForm/AddGrade";
import AddBookType from "../AddForm/AddBookType";
import Swal from "sweetalert2";

export default function BookTypeTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [isloading, setloading] = useState(true);
  const [fetchdata, setfetchdata] = useState([]);

  useLayoutEffect(() => {
    fetch();
  }, []);

  const deleteid = async (id) => {
    // console.log(id);
    try {
      const res = await instance({
        url: `booktype/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `${Cookies.get("token")}`,
          // accesskey: `auth74961a98ba76d4e4`,
        },
      });
    } catch (error) {
      // console.log(error.response.data.message.field_name);
      if (
        error.response.data.message.field_name === "bookmaterial_fk_1 (index)"
      ) {
        Swal.fire({
          text: "The BookType cannot be deleted at this time as it is currently in use.",
          icon: "warning",
        });
      }
    }
    await fetch();
  };
  const fetch = async (id) => {
    const res = await localinstance({
      url: `booktype/get/all`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    setfetchdata(res.data.message);
    setloading(false);
  };

  const Update = async (id, status) => {
    // console.log("UPDATE ID", id);
    // console.log("Status", status);
    const res = await instance({
      url: `booktype/update/status/${id}`,
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
    <div className="flex flex-col gap-5 sm:flex-row sm:gap-5 ">
      <div className="flex w-full md:w-[70%]">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className="!bg-slate-400 !w-full">
              <TableRow>
                {["BookType", "Active", "Action"].map((header, i) => (
                  <TableCell className="!font-black text-lg !bg-slate-500">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isloading ? (
              <loader />
            ) : (
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
                      {data.name}
                    </TableCell>
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
        <AddBookType fetch={fetch} fetchdata={fetchdata} />
      </div>
    </div>
  );
}
