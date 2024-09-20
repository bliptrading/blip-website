import { FaListUl } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="w-full flex items-center  bg-center lg:bg-top bg-fixed  bg-my-image h-[250px]">
      {/* <img className="0w-36 ml-40" src="/bplip2.jpeg" /> */}
      <div className="w-full  lg:hidden flex items-center justify-center ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="bg-red-500 p-3 m-1">
            <FaListUl color={"white"} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-100 text-black menu rounded-sm z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to={"/category/fashion"}>Fashion</Link>
            </li>
            <li>
              <Link to="/category/home-decor">Home Decor</Link>
            </li>
            <Link to="/category/electronics">
              <a>Electronics</a>
            </Link>
          </ul>
        </div>
        <input
          type="text"
          placeholder="Search products and categories"
          className="flex-1 h-10 rounded-sm p-4 text-black outline-none "
        />
        <button className="flex mx-2 items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500">
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default Hero;
