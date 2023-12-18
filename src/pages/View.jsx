import React from "react";
import Navbar from "../component/Navbar/Navbar";
import Breadcrumb from "../component/Breadcrumb/Breadcrumb";
import MaterialTabs from "../component/Tabs/MaterialTabs";
import VerticalTabs from "../component/Tabs/VerticalTabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AdminNavbar from "../component/Navbar/AdminNavbar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import localinstance from "../localinstance";

const View = () => {
  const [fetchbook, setfetchbook] = useState(null);
  // const [fetchbook1, setfetchbook1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSem, setCurrentSem] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [sl, setsl] = useState([]);
  const [full, setFull] = useState(false);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  let { id } = useParams();
  useLayoutEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    console.log(id);
    const res = await localinstance({
      url: `book/get/user/bookmateial/${id}`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    });
    console.log(res.data.message);
    let bookdata = res.data.message;
    console.log(res.data.slug[0]);
    setCurrentSem(res.data.slug[0]);
    if (bookdata.length === 0) {
      alert("bookmaterial is empty");
    }
    // console.log("FETCHDATA", res.data);
    setfetchbook(res.data);
    // setfetchbook1(res.data.slug);
    setLoading(false);
    // returnData();
  };

  const changeSem = (value) => {
    // console.log("semValue", value);
    // console.log("Index", index);
    setCurrentSem(value);
    // console.log("change");
    returnData();
  };

  const returnData = () => {
    const data = fetchbook.message.filter((item) => item.sl === currentSem);
    // console.log("book --");
    // console.log(data);
    let bookData = [];

    data.map((item, index) => {
      bookData.push({
        index: index,
        sl: item.sl,
        url: item.url,
        booktype: item.booktype,
        id: item.id,
      });
    });
    // console.log(bookData);
    return bookData;
  };

  // console.log("tes");
  // console.log(fetchbook1);

  const handleSize = (size) => {
    // console.log("handlesize", size);
    setFull(size);
  };

  return (
    <div className="w-full ">
      <div>
        <Navbar />
      </div>

      <div className=" h-[100vh] ">
        <div className="h-[100vh]">
          {/* <div className="p-2 text-[2rem] md:text-[2.5rem] font-semibold">
            Books Material
          </div> */}
          <div className="border-stone-300 pt-[4.4rem] ">
            {isMatch ? (
              <>
                <div className="flex-col  ">
                  <div className="mx-[2rem] mt-[2rem] w-[40%]">
                    {loading ? null : (
                      <VerticalTabs
                        datas={fetchbook.slug}
                        semdatas={fetchbook.message}
                        changeSem={changeSem}
                        dat={returnData()}
                      />
                    )}
                  </div>

                  <div className="w-[90%] ml-[0.5rem] ">
                    {loading ? null : (
                      <MaterialTabs
                        datas={returnData()}
                        sem={currentSem}
                        size={handleSize}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className=" flex  ml-4 ">
                  <div className=" py-2 mt-[4rem] w-[10%] ">
                    {loading ? null : (
                      <VerticalTabs
                        datas={fetchbook.slug}
                        semdatas={fetchbook.index}
                        changeSem={changeSem}
                        dat={returnData()}
                      />
                    )}
                  </div>

                  {loading ? null : (
                    <MaterialTabs
                      datas={returnData()}
                      sem={currentSem}
                      size={handleSize}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
