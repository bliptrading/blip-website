import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const handleSearch = () => {
    if (searchString.trim() === "") return; // Prevent empty searches

    // Navigate based on current location
    if (loc.pathname !== "/") {
      navigate(`${loc.pathname}?q=${encodeURIComponent(searchString)}`);
    } else {
      navigate(`/?q=${encodeURIComponent(searchString)}`);
    }
  };

  return (
    <div className="w-full flex items-center bg-center lg:bg-top bg-fixed bg-my-image h-[250px]">
      <div className="w-full px-4 xl:hidden lg:hidden flex items-center justify-center ">
        <input
          type="text"
          placeholder="Search products and categories"
          className="flex-1 font-light h-10 rounded-sm p-4 text-black outline-none"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)} // Update state on input change
        />
        <button
          onClick={handleSearch} // Call handleSearch function
          className="flex mx-2 items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default Hero;
