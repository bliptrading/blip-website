import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { RiHome6Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { HiOutlineShoppingBag, HiOutlineUsers } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";

function AdminPage() {

  const navigate = useNavigate()
  const loc = useLocation()
  const goBack = () => {
    if(loc.pathname.split('/')[2] !== 'dashboard') {
      navigate(-1)
    }

  }
  return (
    <>
      {/* Main Content Area */}
      <div className="m-2 lg:hidden">
        <IoArrowBack onClick={goBack}  size={30} />
      </div>
      <div className="w-full flex h-full flex-row">
        {/* Drawer for Sidebar Navigation */}
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <Outlet />
          </div>

          {/* Sidebar Menu */}
          <div className="drawer-side ">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu  bg-black font-light text-base text-white min-h-full w-80 p-4">
              <NavLink
                to={"dashboard"}
                className="flex flex-row hover:bg-red-500 p-3"
              >
                <RiHome6Line className="" color="white" size={30} />
                <a className="mt-1 mx-2 roboto-thin text-lg font-medium ">
                  Dashboard
                </a>
              </NavLink>
              <NavLink
                to={"orders"}
                className="flex flex-row  p-3 hover:bg-red-500"
              >
                <CgNotes className="" color="white" size={30} />
                <a className="mx-2">Orders</a>
              </NavLink>
              <NavLink
                to={"products"}
                className="flex flex-row  p-3 hover:bg-red-500"
              >
                <HiOutlineShoppingBag className="" color="white" size={30} />
                <a className="mt-1 mx-2">Products</a>
              </NavLink>
              <NavLink
                to={"blog"}
                className="flex flex-row  p-3 hover:bg-red-500"
              >
                <IoNewspaperOutline className="" color="white" size={30} />
                <a className="mt-1 mx-2">Blog</a>
              </NavLink>
            </ul>
          </div>
        </div>

        {/* Outlet for Nested Routes */}
      </div>
    </>
  );
}

export default AdminPage;
