import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { RiHome6Line } from "react-icons/ri";
import { CgNotes } from "react-icons/cg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoArrowBack } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { LiaSignOutAltSolid } from "react-icons/lia";

function AdminPage() {
  const navigate = useNavigate();
  const loc = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin");

    navigate("/admin/login");

  };

  const goBack = () => {
    if (loc.pathname.split("/")[2] !== "dashboard") {
      navigate(-1);
    }
  };

  const navLinks = [
    {
      id: 1,
      to: "dashboard",
      icon: <RiHome6Line className="" color="white" size={30} />,
      label: "Dashboard",
    },
    {
      id: 2,
      to: "orders",
      icon: <CgNotes className="" color="white" size={30} />,
      label: "Orders",
    },
    {
      id: 3,
      to: "products",
      icon: <HiOutlineShoppingBag className="" color="white" size={30} />,
      label: "Products",
    },
    {
      id: 4,
      to: "blog",
      icon: <IoNewspaperOutline className="" color="white" size={30} />,
      label: "Blogs",
    },
  ];

  return (
    <>
      {/* Main Content Area */}
      <div className="m-2 lg:hidden">
        <IoArrowBack onClick={goBack} size={30} />
      </div>
      <div className="w-full flex h-full flex-row">
        {/* Drawer for Sidebar Navigation */}
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <Outlet />
          </div>

          {/* Sidebar Menu */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-black font-light text-base text-white min-h-full w-80 p-4">
              {navLinks.map(({ id, to, icon, label }) => (
                <NavLink
                  key={id}
                  to={to}
                  className={({ isActive }) =>
                    `flex flex-row my-2 hover:bg-red-500 p-3 ${
                      isActive ? "bg-red-500" : ""
                    }`
                  }
                >
                  {icon}
                  <span className="mt-1 mx-2 roboto-thin text-lg font-medium">
                    {label}
                  </span>
                </NavLink>
              ))}
              <a
                onClick={handleLogout}
                className="flex items-center p-3 flex-row text-white hover:cursor-pointer hover:bg-red-500 rounded-md"
              >
                <LiaSignOutAltSolid size={30} />
                Sign Out
              </a>
            </ul>
          </div>
        </div>

        {/* Outlet for Nested Routes */}
      </div>
    </>
  );
}

export default AdminPage;
