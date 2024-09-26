import React from "react";
import Image from "../../assets/road.svg";
import { Link, Navigate, useLocation } from "react-router-dom";
export default function NoProduct() {
  const loc = useLocation();
  const currentPath = loc.pathname.split('/')[2]

  if (currentPath === '' ){
    return (
      <Navigate  to={'/'} replace/>
    )
  }

  return (
    <div className="w-full flex-col p-4 flex items-center justify-center">
      <img
        height={780}
        width={820}
        src={Image}
        className="w-96 h-auto"
        alt="No products available"
      />
      <h1 className="my-4 text-center font-light text-3xl">
        No products found for  
          <span className="font-bold"> {currentPath}</span>
        </h1>
      <Link
        to={-1}
        className="mx-auto  my-4 flex  w-40 justify-center items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
      >
        Go Back
      </Link>
    </div>
  );
}
