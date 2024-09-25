import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight, MdAdd } from "react-icons/md";
import { LiaStarSolid } from "react-icons/lia";
import { IoArrowBack } from "react-icons/io5";


export default function ReviewsPage() {
  return (
    <div className="w-full h-full">
      <section className="lg:m-12 lg:mt-12 rounded-md  bg-white  shadow-sm mx-1">
        <div className="card p-4 ">
          <div className="w-full flex">
            <Link className="font-light  link-hover flex" to={-1}>
              <IoArrowBack className="mt-1" size={30} />
            </Link>
            <span className="mt-2 lg:text-xl flex flex-row font-light lg:mx-2">
              CUSTOMER REVIEWS AND FEEDBACK
            </span>
            <div className="ml-auto">
              <button
                className=""
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <MdAdd className="hover:text-red-500" size={30} />
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Add Review</h3>

                  <div className="w-full mb-4">
                    <select className="select w-full max-w-xs">
                      <option disabled selected>
                        Pick your rating
                      </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <textarea
                      placeholder="say somthing"
                      className="textarea-secondary p-2 rounded-md"
                    ></textarea>
                  </div>
                  <div className="modal-action">
                    <button className="btn">Save</button>
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
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
