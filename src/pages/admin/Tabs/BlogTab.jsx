import { useState } from "react";
import { FaSort, FaEye } from "react-icons/fa";



function BlogsTab() {
  const [blogs, setBlogss] = useState([]);
  

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-xl text-center lg:font-light font-thin mb-6">
        Manage Blogs
      </h1>
      <div>
        <button className="btn rounded-md bg-red-500 text-white font-light text-lg">
          Add Blog
        </button>
      </div>
      <div className="grid m-2 gap-2 md:gap-0 lg:gap-0 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 ">
        <div className="bg-base-100 w-96 shadow-xl">
          <figure className="px-3 pt-4">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions">
              <button className="btn bg-red-500 rounded-md text-white font-thin text-lg">
                Update
              </button>
              <button className="btn btn-ghost rounded-md text-black font-thin text-lg">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsTab;
