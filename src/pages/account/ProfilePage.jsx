import { FaRegUser } from "react-icons/fa";
import { LuPackage2 } from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";
function ProfilePage() {
  return (
    <>
      <div className="drawer md:drawer-open lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className="w-full ">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-black text-white min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <Link
              to="settings"
              className="roboto-thin  hover:bg-red-500 my-5 text-lg"
            >
              <div className="flex flex-row mx-2 p-2">
                <FaRegUser className="mt-1 mx-3" />
                My Account
              </div>
            </Link>

            <Link to="orders" className="roboto-thin text-lg hover:bg-red-500 ">
              <div className="flex flex-row mx-2 p-2">
                <LuPackage2 className="mt-1 mx-3" />
                Orders
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
