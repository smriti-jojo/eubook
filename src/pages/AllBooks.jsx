import React, { useLayoutEffect, useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import BookCard from "../component/BookCard/BookCard";
import { useParams } from "react-router-dom";
import Loader from "../component/Loader/Loader";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { setBookList } from "../store/MyBooks";
import { useSelector } from "react-redux";
import instance from "../instance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Checkbox } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";
import { Fab, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import background from "../assets/background.jpg";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useIsSmall } from "../Hooks/small";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AllBooks = () => {
  const [fetchbook, setfetchbook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(false);
  const [addbooksid, setaddbooksid] = useState([]);
  const [removebooksid, setremovebooksid] = useState([]);
  const [addCount, setaddCount] = useState(0);
  const [removeCount, setremoveCount] = useState(0);
  let { id } = useParams();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmall = useIsSmall();

  const Books = useSelector((state) => state.books.books);
  useLayoutEffect(() => {
    fetch(id);
    // console.log("BOOOK", Books);
  }, [Books]);

  const fetch = async (id) => {
    // console.log(id);
    const res = await localinstance({
      url: `bookassign/get/user/assignBooks/${Cookies.get("id")}`,
      // url: `bookassign/get/user/bookMarkedBooks/${Cookies.get("id")}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
    // console.log("ASSIGNBOOK", res.data.message);
    let data = res.data.message;
    let bookdata = [];

    data.map((item) => {
      bookdata.push({ ...item, flag: false });
    });

    for (let fetch of bookdata) {
      // console.log("IDDDDD", fetch.id);
      Books.map((data) => {
        if (data.book.id === fetch.book.id) {
          // console.log("DUPLICATE FOUND", fetch.id);
          fetch.flag = true;
        }
      });

      // console.log("---FETCHBOOK---", bookdata);
      // console.log("datanotsorted---", bookdata);
      // bookdata.sort((a, b) => a.book.name - b.book.name);
      // console.log("datasorted", bookdata);
      setfetchbook(bookdata);
      // console.log("fetchbookk", fetchbook);
      setLoading(false);
    }
  };

  const MarkBooks = async (userid, bookid) => {
    // console.log("USERID", userid);
    // console.log("BOOKID", bookid);

    let dataToPost = {
      userId: userid,
      bookId: bookid,
    };
    const res = await instance({
      url: `bookassign/add/bookmark`,
      method: "POST",
      data: dataToPost,
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
    // console.log("----add books----", res.data.message);

    Swal.fire({
      text: "Book Marked Successfully",
      icon: "success",
      timer: 10000,
    }).then(() => {
      navigate("/home");
    });
  };

  {
  }
  const RemoveBooks = async (userid, bookid) => {
    // console.log("USERID", userid);
    // console.log("BOOKID", bookid);

    let dataToPost = {
      userId: userid,
      bookId: bookid,
    };
    const res = await instance({
      url: `bookassign/remove/bookmark`,
      method: "POST",
      data: dataToPost,
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
    // console.log("-REMOVE BOOKS-", res.data.message);

    Swal.fire({
      text: "BookMark Removed Successfully",
      icon: "success",
      timer: 10000,
    }).then(() => {
      navigate("/home");
    });
  };

  const handleBooks = async (userid, bookid, status) => {
    // console.log("--bookid--", bookid);

    if (status === Boolean(false)) {
      let countremoveBook = removeCount + 1;
      let Books = [...removebooksid];

      if (Books.includes(bookid)) {
        // console.log("Bookid present");
        countremoveBook = removeCount - 1;
        Books.splice(Books.indexOf(bookid), 1);
      } else {
        Books.push(bookid);
      }

      setremovebooksid(Books);
      // console.log("Removebooks-----", Books);

      setremoveCount(countremoveBook);
    } else {
      let countAddBook = addCount + 1;
      let AddBooks = [...addbooksid];
      if (AddBooks.includes(bookid)) {
        // console.log("Bookid present");
        countAddBook = addCount - 1;
        AddBooks.splice(AddBooks.indexOf(bookid), 1);
      } else {
        AddBooks.push(bookid);
      }

      setaddbooksid(AddBooks);
      // console.log("AddBooks-----", AddBooks);
      setaddCount(countAddBook);
    }
  };

  const handleAddBooks = async () => {
    addbooksid.map((item) => {
      MarkBooks(Cookies.get("id"), item);
    });
  };

  const handleRemoveBooks = async () => {
    removebooksid.map((item) => {
      RemoveBooks(Cookies.get("id"), item);
    });
  };

  return (
    <div className="">
      <div>
        <Navbar />
      </div>

      <div className=" pt-[13vh]  py-3">
        {loading ? (
          <Loader />
        ) : (
          <div className="  flex justify-center flex-wrap gap-[3.5rem] p-4 relative ">
            {/* <div className="p-2  ml-3  mt-3 ">
              <Tooltip title="Add More Names">
                <Fab color={"red"} size="small" aria-label="add">
                  Add to <HomeIcon />
                </Fab>
              </Tooltip>
            </div> */}
            <div className="fixed right-0 top-[50%]  z-10 ">
              <Tooltip title="Click to Add Books">
                <Fab
                  color={"primary"}
                  size="large"
                  aria-label="add"
                  variant="extended"
                  onClick={handleAddBooks}
                  className={isSmall ? "!px-[2rem]" : "!p-[1rem] !py-[1rem]"}
                >
                  {isSmall ? (
                    addCount > 0 ? (
                      <div>
                        Add Books{" "}
                        <span className="!rounded-xl !bg-[#3F00FF] px-2 py-1">
                          {addCount}
                        </span>
                      </div>
                    ) : (
                      `Add Books`
                    )
                  ) : addCount > 0 ? (
                    <div>
                      <AddIcon />{" "}
                      <span className="!rounded-xl !bg-[#3F00FF] px-2 py-1">
                        {addCount}
                      </span>
                    </div>
                  ) : (
                    <AddIcon />
                  )}
                </Fab>
              </Tooltip>
            </div>
            <div
              className={`fixed  top-[60%]  z-10 ${
                isSmall ? "right-0" : "right-[1%]"
              }`}
            >
              <Tooltip title="Click to Remove Books">
                <Fab
                  color={"primary"}
                  size="large"
                  aria-label="remove"
                  variant={"extended"}
                  onClick={handleRemoveBooks}
                >
                  {isSmall ? (
                    removeCount > 0 ? (
                      <div>
                        Remove Books{" "}
                        <span className="!rounded-xl !bg-[#3F00FF] px-2 py-1">
                          {removeCount}
                        </span>
                      </div>
                    ) : (
                      `Remove Books`
                    )
                  ) : removeCount > 0 ? (
                    <div className="">
                      <RemoveIcon />{" "}
                      <span className="!rounded-xl !bg-[#3F00FF] px-2 py-1">
                        {removeCount}
                      </span>
                    </div>
                  ) : (
                    <RemoveIcon />
                  )}
                </Fab>
              </Tooltip>
            </div>

            {fetchbook.map((data) => (
              <div className="mb-[5%]">
                <BookCard
                  data={data}
                  flag={data.flag}
                  // select={
                  //   <StarIcon
                  //     sx={{ fontSize: "70px" }}
                  //     onClick={
                  //       data.flag
                  //         ? () => RemoveBooks(Cookies.get("id"), data.book.id)
                  //         : () => MarkBooks(Cookies.get("id"), data.book.id)
                  //     }
                  //   />
                  // }

                  select={
                    <Button
                      variant="outlined"
                      className="-skew-y-12 !text-[#FF0000] !bg-white !cursor-auto backdrop-brightness-75"
                      color="warning"
                    >
                      Added
                    </Button>
                  }
                  mark={
                    <Checkbox
                      size="large"
                      icon={<BookmarkBorderIcon className="" />}
                      checkedIcon={<BookmarkIcon className="text-[#FF0000]" />}
                      onClick={
                        data.flag
                          ? // ? () => RemoveBooks(Cookies.get("id"), data.book.id)
                            () =>
                              handleBooks(
                                Cookies.get("id"),
                                data.book.id,
                                false
                              )
                          : () =>
                              handleBooks(Cookies.get("id"), data.book.id, true)
                        // : () => MarkBooks(Cookies.get("id"), data.book.id)
                      }
                    />
                  }
                  type={"allBooks"}
                  bookcover={data.book.book_cover}
                  name={data.book.name}
                  src={"all_books"}
                  id={data.id}
                  subject={data.book.subjectMaster.subject}
                  grade={data.book.gradeMaster.grade}
                  series={data.book.seriesMaster.series}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
