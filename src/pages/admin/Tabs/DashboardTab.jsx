import { PiMoney } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";

function DashboardTab() {
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <div className="flex mt-2 flex-row">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn ml-4 bg-red-500 text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            New Product
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-4">New Product!</h3>
              <form className="form-control w-full ">
                <div className="mb-4 w-full ">
                  <label htmlFor="my-1">Product Title</label>
                  <input
                    type="text"
                    placeholder="title"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4 w-full ">
                  <label htmlFor="my-1">Product Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="mb-4 w-full ">
                  <input
                    type="file"
                    placeholder="product image"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="mb-4 w-full ">
                  <textarea
                    className="textarea w-full"
                    placeholder="Description"
                  ></textarea>
                </div>
                <a className="btn font-light text-lg text-white bg-red-500 rounded-md">Save</a>
              </form>
            </div>
          </dialog>

          <button className="btn  text-white mx-2 btn-warning">Export</button>
        </div>
      </div>

      {/* Product Modal */}
      <dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="w-full mt-8 flex-row  flex justify-evenly ">
        <div className="card bg-gradient-to-tr mx-4 from-[#382828] to-[#f0413b] text-white w-96">
          <div className="card-body">
            <h2 className="card-title text-2xl font-light mx-auto">
              Total Sales
            </h2>
            <PiMoney className="mx-auto" size={50} />
          </div>
        </div>
        <div className="card bg-gradient-to-tr mx-4 from-[#382828] to-[#f0413b] text-white w-96">
          <div className="card-body">
            <h2 className="card-title mx-auto font-light text-2xl">Orders</h2>
            <MdOutlinePendingActions className="mx-auto" size={40} />
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card bg-gradient-to-tr mx-4 from-[#382828] to-[#f0413b] text-white w-96">
          <div className="card-body">
            <h2 className="card-title mx-auto font-light text-2xl">
              Customers
            </h2>
            <HiOutlineUsers className="mx-auto" size={40} />
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
      {/* Table for recent orders*/}
      <div className="w-full p-4 m-4">
        <h1 className="text-base-content text-3xl font-bold ">Recent Orders</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Email</th>
                <th>Product</th>
                <th>Price (GHS) </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardTab;
