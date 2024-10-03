import { CiFacebook, CiInstagram, CiLocationOn } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FiTwitter, FiPhoneCall } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";
import logo from '../../assets/logo.jpeg'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      id="contact"
      className=" mt-8  bg-black text-gray-50 p-8   grid grid-cols-1  px-5 pb-4 mx-auto lg:flex lg:justify-between sm:grid-cols-2 gap-x-7  gap-y-10 lg:gap-y-0 lg:px-10"
    >
      <div>
        <h1 className="text-3xl text-red-500 font-bold roboto-thin ">
          Blip Trading
        </h1>
        <ul className="space-y-4 font-light mt-4 cursor-pointer">
          <li className="flex items-center">
            <AiOutlineMail className="mr-2 " /> bliptradingbusiness@gmail.com
          </li>
          <li className="flex items-center">
            <CiLocationOn className="mr-2 text-xl " />
            Kumasi, Ghana
          </li>
          <li className="flex items-center">
            <LuAlarmClock className="mr-2 " />
            10:00-18:00, Mon - Sat
          </li>
          <li className="flex items-center ">
            <FiPhoneCall className="mr-2 " /> 024 785 9178
          </li>
          <li className="flex items-center ">
            <FaWhatsapp className="mr-2 " /> 024 785 9178
          </li>
        </ul>
        <div className="flex py-5 space-x-5 text-xl cursor-pointer">
          <Link to="https://www.facebook.com/share/2KmRjzrTQ3PyiREb" passHref>
            <CiFacebook />
          </Link>
          
        </div>
      </div>
      <div>
        <h1 className=" text-lg  font-medium roboto-thin ">Company</h1>
        <ul className="space-y-2 flex flex-col mt-4 font-light  cursor-pointer">
          <Link to="" className="mb-2">
            About Us
          </Link>
          <Link className="" to={"/blog"}>
            Blog
          </Link>
          <Link to="">Contact</Link>
          <Link className="" to={"/admin/dashboard"}>
            Admin
          </Link>
        </ul>
      </div>
      <div className="flex flex-col items-center w-32 text-center ">
        <img alt="blip logo" src={logo} className="" />
        <p className="mt-2 text-sm text-gray-600">
          The best place for your shopping
        </p>
        <p>🇬🇭</p>

        <p className="mt-1 text-xs text-gray-500">
          © 2024 Blip Trading. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
