import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LiaStarSolid } from "react-icons/lia";
import { IoArrowBack } from "react-icons/io5";


export default function ReviewsPage() {
  return (
    <div className="w-full h-full">
      <section className="lg:m-12 lg:mt-12 rounded-md  bg-white  shadow-sm mx-1">
        <div className="card p-4 ">
          <div className="w-full flex">
            <Link
              className="font-light  link-hover flex"
              to={-1}
            >
            <IoArrowBack className="text-red-400" size={40} />
            </Link>
            <span className="mt-2 lg:text-xl flex flex-row font-light lg:mx-2">
              CUSTOMER REVIEWS AND FEEDBACK
            </span>
          </div>
          <hr></hr>
          <div className="w-full my-2">
            <div className="w-full flex p-1">
              <LiaStarSolid className="text-red-400" size={20} />
              <LiaStarSolid className="text-red-400" size={20} />
              <LiaStarSolid size={20} />
              <LiaStarSolid size={20} />
              <LiaStarSolid size={20} />

              <span className="text-sm ml-auto font-thin">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="w-full">
              <h1 className="font-light text-base">
                This is an excellent product
              </h1>
              <span className="font-light text-gray-400 text-base">
                By James Aurthur
              </span>
              <hr></hr>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
