import { PiMoney } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { getFirestore, collection, getDocs, orderBy, query, limit, count } from "firebase/firestore";
import { getStorage,uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {app} from '../../../utils/firebase'
import { ToastContainer, toast} from "react-toastify";


const db = getFirestore(app)
const storage = getStorage(app)

function DashboardTab() {
  const [seletectedImage, setSelectedImage] = useState('')
  const [totalProducts, setTotalProucts] = useState(0) 
  const [imagePreview, setImagePreview] = useState(null);
  const [orderList, setOrderList] = useState([]);

  const [isLoading, setLoading]  = useState(false)
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

 useEffect(() => {
   const fetchData = async () => {
     setLoading(true);
     try {
       const ordersQuery = query(
         collection(db, "orders"),
         orderBy("timestamp", 'desc'), // Order by the 'timestamp' field
        
       );

       const querySnapshot = await getDocs(ordersQuery);

       let allDocs = [];
       querySnapshot.forEach((doc) => {
         allDocs.push(doc.data());
       });

       setOrderList(allDocs.slice(0,4));
     } catch (err) {
       toast.error(err);
     } finally {
       setLoading(false);
     }
   };

   fetchData();

    }, []);

    
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      // Query Firestore collection and limit to 4 documents
      const ordersQuery = query(
        collection(db, "products"),
      );

      const querySnapshot = await getDocs(ordersQuery);
      // Get the count of documents returned
      const count = querySnapshot.size;
      setTotalProucts(count)
       // Set state with the fetched documents
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }}
    fetchData()
  }

,[])
 

   const handleUploadProduct = async (data) => {
     // Check if an image is selected
     setLoading(true)
     if (!data.image || !data.image[0]) {
       alert("Please select an image to upload.");
       return;
     }

     // Create a preview URL for the selected image
     const previewUrl = URL.createObjectURL(data.image[0]);
     setImagePreview(previewUrl);

     try {
       const pathname = `${new Date().toISOString() + data.image[0].name }`;
       const storageRef = ref(storage, `products/${pathname}`);

       // Upload the file to Firebase Storage
       await uploadBytes(storageRef, data.image[0]);

       // Get the download URL of the uploaded file
       const filePathOnCloud = await getDownloadURL(storageRef);
       
       const productData = { 
        id: crypto.randomUUID(),
        name:data.name, 
        price:data.price, 
        description: data.description, 
        category: data.category,
        tags: data.tags,
        imageUrl: filePathOnCloud,
        pathRef: pathname
       }
       await addDoc(collection(db, "products"), productData);

       reset()
      //  console.log(productData)
       toast.success("Product added to store")

     } catch (error) {
       // Handle errors during upload
       console.error("Error uploading file:", error);
       alert("Error uploading file. Please try again.");
     } finally {
       // Optional: Reset the image preview or any other cleanup actions
       setImagePreview(null); // Reset image preview after upload
       setLoading(false)
     }
   };
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <div className="flex mt-2 flex-row">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn font-light text-md ml-4 bg-red-500 text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            New Product
          </button>
          <dialog id="my_modal_3" className="modal ">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-4">New Product!</h3>
              <form
                onSubmit={handleSubmit(handleUploadProduct)}
                className="form-control w-full "
              >
                <div className="mb-4 w-full ">
                  <label htmlFor="my-1 ">Product Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Product Name"
                    className="input mt-2 input-bordered w-full"
                    required
                  />
                </div>
                <div className="mb-4 w-full ">
                  <label htmlFor="my-5">Product Price</label>
                  <input
                    required
                    {...register("price")}
                    type="number"
                    placeholder="Price"
                    className="input text-md mt-2 input-bordered w-full"
                  />
                </div>
                <div className="mb-4 w-full ">
                  <label htmlFor="my-5">Add Category</label>
                  <input
                    required
                    {...register("category")}
                    type="text"
                    placeholder="New Category eg (electronics, home-decor)"
                    className="input text-md max-w-sm mt-2 input-bordered w-full"
                  />
                </div>

                <div className="mb-3 w-full">
                  <select
                    {...register("tags")}
                    required
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Choose Tags
                    </option>
                    <option>Discount</option>
                    <option>Latest</option>
                    <option>Top Deals</option>
                    <option>None</option>
                  </select>
                </div>

                <div className="mb-4 w-full ">
                  <input
                    {...register("image")}
                    type="file"
                    placeholder="product image"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
                {imagePreview && (
                  <div className="mb-4 rounded-lg">
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mx-auto w-40 rounded-lg"
                    />
                  </div>
                )}
                <div className="mb-4 w-full ">
                  <textarea
                    {...register("description")}
                    required
                    className="textarea w-full textarea-bordered"
                    placeholder="Description"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn font-light text-lg text-white bg-red-500 rounded-md"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-lg text-error"></span>
                  ) : (
                    `Save`
                  )}
                </button>
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="w-full mt-10 flex-col lg:flex-row items-center space-x-10   flex justify-center ">
        <div className="card bg-gradient-to-tr  from-[#382828] to-[#f0413b] text-white w-96">
          <div className="card-body">
            <h2 className="card-title mx-auto font-light text-2xl">Orders</h2>
            <MdOutlinePendingActions className="mx-auto" size={40} />
            <h4 className="font-medium text-3xl text-center">{orderList.length}</h4>
          </div>
        </div>
        <div
          className="m-2 bg-gradient-to-tr
          from-[#382828] to-[#f0413b] text-white w-96"
        >
          <div className="card-body">
            <h2 className="card-title mx-auto font-light text-2xl">Products</h2>
            <MdOutlinePendingActions className="mx-auto" size={40} />
            <h4 className="font-medium text-3xl text-center">{totalProducts}</h4>
          </div>
        </div>
      </div>
      {/* Table for recent orders*/}
      <div className="w-full p-4 m-4 ">
        <h1 className="text-xl text-center lg:font-light font-thin mb-6">
          Recent Orders
        </h1>
        {isLoading ? (
          <div className="w-full flex flex-col space-y-2">
            <div className="skeleton rounded-md h-12 w-full"></div>
            <div className="skeleton rounded-md h-12 w-full"></div>
            <div className="skeleton rounded-md h-12 w-full"></div>
          </div>
        ) : (
          <div className="overflow-x-scroll overflow-y-scroll max-h-48 ">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Date</th>
                  <th>No of Items</th>
                  <th>Amount (GHS)</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr>
                    <th>{order.orderId}</th>
                    <td>{order.fullname}</td>
                    <td>{order.email}</td>
                    <th>{order.number}</th>
                    <td>{order.date}</td>
                    <td>{order.items?.length}</td>
                    <td>{order.amount}</td>
                    <td className="btn m-2">
                      <LuEye size={20} className="text-red-500"></LuEye>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default DashboardTab;
