function AccountPage() {
  return (
    <div className="w-full h-full  p-2">
      <div className="font-roboto-thinw-full text-2xl m-6">
        Account Overview
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-2">
        <div className="w-[22rem]  bg-white  lg:w-[30rem] h-auto my-2 border border-gray-300">
          <h1 className="p-4 ml-20 lg:ml-40 font-thin text-md">
            Account Information
          </h1>
          <form className="w-full p-4 form-control h-full ">
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              @username
              <input type="text" className="grow" placeholder="username" />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              @email
              <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Current Password"
              />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="New Password" />
            </label>
            <a className="btn rounded-sm text-lg font-light hover:bg-black hover:text-red-500 bg-red-500 text-white w-40">
              Save
            </a>
          </form>
        </div>
        <div className="w-[22rem] lg:w-[30rem] h-auto my-2 border  bg-white  border-gray-300">
          <div className="p-4 lg:ml-40 ml-20 font-thin text-md">
            Personal Information
          </div>
          <form className="w-full p-4 form-control h-full ">
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              Phone
              <input type="text" className="grow" placeholder="Phone" />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              Address
              <input type="text" className="grow" placeholder="Addresss" />
            </label>
            <select className="select text-lg font-thin mt-4 select-bordered w-full">
              <option disabled selected>
                Location
              </option>
              <option className="font-thin text-lg">Kumasi</option>
              <option className="font-thin text-lg">Accra</option>
            </select>

            <a className="btn mt-16 rounded-sm text-lg font-light hover:bg-black hover:text-red-500 bg-red-500 text-white w-40">
              Save
            </a>
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default AccountPage;
