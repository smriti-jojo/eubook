import React from "react";

const PageNotFound = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="!flex-col">
          <div className="text-[25rem] font-mono ">404</div>
          <div className="text-[4rem] font-serif text-red-500">
            OOPS!PAGE NOT FOUND
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
