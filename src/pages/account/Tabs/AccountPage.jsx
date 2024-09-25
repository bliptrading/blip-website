import { useEffect, useState } from "react";
import { app } from "../../../utils/firebase";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {toast, ToastContainer} from 'react-toastify'
const db = getFirestore();

function AccountPage() {
  const [userInfo, setUserInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const userData = localStorage.getItem("user");
      const json_data = JSON.parse(userData);
      if (json_data.email) {
        const docRef = doc(db, "users", json_data.email);
        await updateDoc(docRef, userInfo); // Update Firestore document with userInfo
      }
    } catch (error) {
      setErrorMessage("Failed to update user information. Please try again.");
      toast.error(error)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("user");
      const json_data = JSON.parse(userData);
      if (json_data.email) {
        const docRef = doc(db, "users", json_data.email);
        const docSnap = await getDoc(docRef);
        setUserInfo(docSnap.data());
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(); // Call handleUpdate to update Firestore
    toast.success("Information Updated")
  };

  return (
    <div className="w-full h-full p-2">
      <div className="font-roboto-thin text-2xl m-6">Account Overview</div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="w-[22rem] bg-white lg:w-[30rem] h-auto my-2 border border-gray-300">
          <h1 className="p-4 ml-20 lg:ml-40 font-thin text-md">
            Account Information
          </h1>
          <form
            className="w-full p-4 form-control h-full"
            onSubmit={handleSubmit}
          >
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              @username
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                className="grow"
                placeholder="Username"
              />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              @email
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="grow"
                placeholder="Email"
                readOnly // Assuming email is not editable
              />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              Current Password
              <input
                type="password"
                name="currentPassword"
                value={userInfo.currentPassword}
                onChange={handleChange}
                className="grow"
                placeholder="Current Password"
              />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              New Password
              <input
                type="password"
                name="newPassword"
                value={userInfo.newPassword}
                onChange={handleChange}
                className="grow"
                placeholder="New Password"
              />
            </label>
            <button onClick={handleSubmit}
              type="submit"
              className="btn rounded-sm text-lg font-light hover:bg-black hover:text-red-500 bg-red-500 text-white w-40"
            >
              Save
            </button>
          </form>
        </div>
        <div className="w-[22rem] lg:w-[30rem] h-auto my-2 border bg-white border-gray-300">
          <div className="p-4 lg:ml-40 ml-20 font-thin text-md">
            Personal Information
          </div>
          <form
            className="w-full p-4 form-control h-full"
            onSubmit={handleSubmit}
          >
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              Phone
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="grow"
                placeholder="Phone"
              />
            </label>
            <label className="my-2 font-thin input input-bordered flex items-center gap-2">
              Address
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                className="grow"
                placeholder="Address"
              />
            </label>
            <select
              name="location"
              value={userInfo.location || ""}
              onChange={handleChange} // Add onChange to handle location updates
              className="select text-lg font-thin mt-4 select-bordered w-full"
            >
              <option disabled value="">
                Location
              </option>
              <option>Kumasi</option>
              <option>Accra</option>
            </select>

            <button onClick={handleSubmit}
              type="submit"
              className="btn mt-16 rounded-sm text-lg font-light hover:bg-black hover:text-red-500 bg-red-500 text-white w-40"
            >
              Save
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AccountPage;
