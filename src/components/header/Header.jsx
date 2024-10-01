import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { IoBasketOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import Store from "../../store/Store";
import { FaListUl } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPackage2 } from "react-icons/lu";
import { GiClothes } from "react-icons/gi";
import { PiBuildingApartmentLight } from "react-icons/pi";
import { GoHomeFill } from "react-icons/go";
import { BsBasket2 } from "react-icons/bs";
import logo from '../../assets/logo.jpeg'
import { signOut, getAuth } from "firebase/auth";
import { app } from "../../utils/firebase";
import { BsHandbag } from "react-icons/bs";
import {
  FaTshirt,
  FaMobileAlt,
  FaHome,
  FaHeartbeat,
  FaShoppingCart,
  FaBaby,
  FaFutbol,
  FaCar,
  FaBook,
  FaDigitalTachograph,
} from "react-icons/fa";


const Header = () => {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { cartArray } = Store();
  const [searchString, setSearchString] = useState("");
  const loc = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(app)

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        localStorage.removeItem('user')
        setLoggedIn(false)
        navigate('/')
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out: ", error);
      });
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const parse_user_data = JSON.parse(user);
      if (parse_user_data.email) {
        setLoggedIn(true);
      }
    }
  }, [loc.pathname]);

 const handleSearch = () => {
    if (searchString.trim() === "") {
      return;
    }
  const encodedSearchString = encodeURIComponent(searchString); // Encode the search string
  navigate(`/p/search/?q=${encodedSearchString}`); // Use the encoded string in the navigation
 }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };

const linkItems = [
  { id: 1, to: "/", label: "All", icon: <FaShoppingCart /> },
  { id: 2, to: "/category/fashion", label: "Fashion", icon: <FaTshirt /> },
  {
    id: 3,
    to: "/category/electronics",
    label: "Electronics",
    icon: <FaMobileAlt />,
  },
  {
    id: 4,
    to: "/category/home-living",
    label: "Home & Living",
    icon: <FaHome />,
  },
  {
    id: 5,
    to: "/category/health-beauty",
    label: "Health & Beauty",
    icon: <FaHeartbeat />,
  },
  {
    id: 6,
    to: "/category/groceries",
    label: "Groceries",
    icon: <FaShoppingCart />,
  },
  { id: 7, to: "/category/baby-kids", label: "Baby & Kids", icon: <FaBaby /> },
  {
    id: 8,
    to: "/category/sports-outdoors",
    label: "Sports & Outdoors",
    icon: <FaFutbol />,
  },
  { id: 9, to: "/category/automotive", label: "Automotive", icon: <FaCar /> },
  {
    id: 10,
    to: "/category/books-stationery",
    label: "Books & Stationery",
    icon: <FaBook />,
  },
  {
    id: 11,
    to: "/category/digital-goods",
    label: "Digital Goods",
    icon: <FaDigitalTachograph />,
  },
];
  return (
    <>
      <nav className="">
        <div className="items-center h-20 hidden px-8 py-4 text-white bg-black lg:flex">
          <Link to="/" className="flex items-center">
            <div className="lg:w-14 rounded-full">
              <img className="" alt="blip logo" src={logo} />
            </div>
            <h1 className="mt-3 mx-4 roboto-thin text-3xl font-bold text-red-500">
              {/* <span className="text-2xl ml-1 roboto-thin font-bold text-red-500"> */}
              Blip Trading
              {/* </span> */}
            </h1>
          </Link>
          <div className="flex flex-1 items-center px-[3rem] ">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="bg-red-500 p-3 m-1">
                <FaListUl color={"white"} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-100 text-black menu rounded-sm z-[1] w-52 p-2 shadow"
              >
                {linkItems.map(({ id, to, label }) => (
                  <Link key={id} className="mx-4 my-2" to={to}>
                    {label}
                  </Link>
                ))}
              </ul>
            </div>
            <input
              type="text"
              onChange={(e) => setSearchString(e.target.value)}
              placeholder="Search products and categories"
              className="flex-1 h-10 rounded-sm p-4 text-black outline-none "
            />
            <button
              onClick={handleSearch}
              className="flex mx-2 items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
            >
              SEARCH
            </button>
          </div>
          <div className="flex">
            {!isLoggedIn ? (
              <Link to="/accounts/login">
                <div className="flex p-2 rounded-sm  w-50 items-center bg-red-500 mx-2">
                  {/* <AiOutlineUser size={20} /> */}
                  <h1 className=" ">SIGN IN</h1>
                </div>
              </Link>
            ) : (
              <div className="dropdown dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex p-2 rounded-sm  w-50 items-center bg-red-500 mx-2"
                >
                  <AiOutlineUser size={20} />
                  ACCOUNT
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content space-y-4 menu text-black bg-base-100 rounded-md z-[1] w-52 p-2 shadow"
                >
                  <li className="mt-2">
                    <Link to="/profile/settings">
                      <AiOutlineUser size={20} />
                      My Account
                    </Link>
                  </li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 font-medium p-4 hover:cursor-pointer text-md mx-2 text-center hover:bg-red-200 rounded-sm  text-white"
                  >
                    LOGOUT
                  </button>
                </ul>
              </div>
            )}

            <div className="flex items-center mx-2">
              <Link to="/cart" className="flex items-center">
                <span>
                  <AiOutlineShoppingCart size={30} className="text-red-500 " />
                </span>
                <span className="relative flex items-center justify-center w-4 h-4 text-xs text-white rounded-full right-2 bg-stone-700 bottom-2">
                  {cartArray.length}
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between p-4 bg-black lg:hidden">
          <div
            className="block text-3xl text-white lg:hidden"
            onClick={() => setNav(!nav)}
          >
            {!nav ? <IoMenuOutline /> : <IoClose />}
          </div>
          <Link to="/" className="flex items-center text-xl font-bold ">
            <div className="w-11 mx-1 rounded-full">
              <img alt="#" src={logo} />
            </div>
            <h1 className="text-red-500 rubik-text">Blip Trading</h1>
          </Link>
          <ul
            onClick={() => setNav(!nav)}
            className={`absolute details top-[70px] transition-all duration-150  z-20 bg-black items-center  left-0 py-5 h-0 ${
              nav ? "h-72 max-h-72 overflow-y-auto w-9/12" : "h-0 w-0"
            }`}
          >
            {nav && (
              <div className="flex flex-col mx-2 text-lg h-96">
                {loc.pathname.split("/")[1] !== "admin" ? (
                  <>
                    <li className="flex my-2 items-center font-thin  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                      <Link
                        to="/profile/settings"
                        className="flex items-center"
                      >
                        <IoSettingsOutline className="mr-2" /> My Account
                      </Link>
                    </li>
                    <li className="flex my-1 items-center font-thin  bg-black   w-44 p-2 text-white rounded-sm cursor-pointer">
                      <Link to="/profile/orders" className="flex items-center">
                        <LuPackage2 size={20} className="mr-2" /> Orders
                      </Link>
                    </li>
                    {isLoggedIn ? (
                      <li className="flex my-1 items-center font-normal mx-auto w-full  bg-black    text-white rounded-sm cursor-pointer">
                        <a
                          onClick={logout}
                          className="flex w-full justify-center p-2  bg-red-500 text-white items-center"
                        >
                          LOG OUT
                        </a>
                      </li>
                    ) : (
                      <Link
                        to="/accounts/signup"
                        className="flex my-1 items-center font-normal mx-auto w-full  bg-black    text-white rounded-sm cursor-pointer"
                      >
                        <a className="flex w-full justify-center p-2  bg-red-500 text-white items-center">
                          REGISTER
                        </a>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    {loc.pathname.split("/")[1] !== "admin" ? (
                      <>
                        <li className="flex items-center  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                          <Link to="/" className="flex items-center">
                            <IoBasketOutline size={30} className="mr-1" />{" "}
                            Dashboard
                          </Link>
                        </li>
                        <li className="flex items-center  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                          <Link to="/" className="flex items-center">
                            <IoBasketOutline size={30} className="mr-1" />{" "}
                            Orders
                          </Link>
                        </li>
                        <li className="flex items-center  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                          <Link to="/" className="flex items-center">
                            <IoBasketOutline size={30} className="mr-1" />{" "}
                            Products
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                          <Link
                            to="/admin/dashboard"
                            className="flex font-light items-center"
                          >
                            <GoHomeFill size={25} className="mr-1" /> Dashboard
                          </Link>
                        </li>
                        <li className="flex items-center  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                          <Link
                            to="/admin/orders"
                            className="flex font-light items-center"
                          >
                            <BsBasket2 size={25} className="mr-1" /> Orders
                          </Link>
                        </li>
                        <li className="flex items-center  w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                          <Link
                            to="/admin/products"
                            className="flex font-light items-center"
                          >
                            <BsHandbag size={25} className="mr-1" /> Products
                          </Link>
                        </li>
                      </>
                    )}
                  </>
                )}

                <li className="h-8 border-t font-thin border-t-gray-700 w-full">
                  <span className="mx-3 ">CATEGORIES</span>
                </li>
                <li className="flex items-center font-thin w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                  <Link to="/" className="flex items-center">
                    <IoBasketOutline className="mr-1" /> Latest Products
                  </Link>
                </li>
                {linkItems.map((each)=> (
                  <li key={each.name} className="flex items-center font-thin w-auto p-2 text-white bg-black  rounded-sm cursor-pointer">
                    <Link to={each.to} className="flex items-center">
                      {each.icon}
                      <span className="mx-1">
                      {each.label}
                      </span>
                    </Link>
                  </li>
                ))}
                
              </div>
            )}
          </ul>

          <div className="">
            <Link to="/cart" className="flex  items-center">
              <AiOutlineShoppingCart size={30} className="text-red-500 " />
              <span className="relative flex items-center justify-center w-4 h-4 text-xs text-white rounded-full right-2 bg-stone-700 bottom-2">
                {cartArray.length}
              </span>
            </Link>
          </div>

          <Link to={!isLoggedIn ? "/accounts/login" : "/profile/settings"}>
            <AiOutlineUser className="text-red-500 " size={25} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
