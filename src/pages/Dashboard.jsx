import React, { useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import BookCard from "../component/BookCard/BookCard";
import { useLayoutEffect } from "react";
import localinstance from "../localinstance";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Loader from "../component/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setBookList } from "../store/MyBooks";
import { set } from "react-hook-form";

const Dashboard = () => {
  const [fetchbook, setfetchbook] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const Books = useSelector((state) => state.books.books);
  useLayoutEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    try {
      const res = await localinstance({
        url: `bookassign/get/user/bookMarkedBooks/${Cookies.get("id")}`,
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("token")}`,
        },
      });
      // console.log("boook-----", res.data.message);

      // console.log("bOKMARKEDBOOKS", res.data.message);
      let data = res.data.message;

      // console.log("setbooks-----", books);
      setfetchbook(data);
      dispatch(setBookList(data));
      setLoading(false);
    } catch (error) {
      // console.log("error", error.response.data.message);
      setLoading(false);
      if (error.response.data.message.trim() === "Login Expiry") {
        // console.log(error.response.data.message);
        Swal.fire({
          title: "Login Expired!!!",
          icon: "error",
        });
        Cookies.remove("user");
        Cookies.remove("role");
        Cookies.remove("token");
        Cookies.remove("id");
        navigate("/");
      }
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className=" pt-[13vh]  py-3 ">
        {loading ? (
          <Loader />
        ) : fetchbook.length === 0 ? (
          <div className="flex justify-center mt-[2rem] text-[2rem] font-bold">
            {" "}
            You Haven't added any Book to Home
          </div>
        ) : (
          <div className="  flex justify-center flex-wrap gap-[5%]  p-4  ">
            {fetchbook.map((data) => (
              <div className="mb-[5%] ">
                <BookCard
                  bookcover={data.book.book_cover}
                  name={data.book.name}
                  src={"user"}
                  type={"myBooks"}
                  id={data.book.id}
                  subject={data.book.subjectMaster.subject}
                  grade={data.book.gradeMaster.grade}
                  series={data.book.seriesMaster.series}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
