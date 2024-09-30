import { PiMoney } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { getFirestore, collection,addDoc ,getDocs, orderBy, query, limit, count } from "firebase/firestore";
import { getStorage,uploadBytes , getDownloadURL, ref } from "firebase/storage";
import {app} from '../../../utils/firebase'
import { ToastContainer, toast} from "react-toastify";
import { generateSlug } from "../../../utils/helpers";

const db = getFirestore(app)
const storage = getStorage(app)

const categoryItems = [
  { label: "All", slug: "all" },
  { label: "Fashion", slug: "fashion" },
  { label: "Home & Living", slug: "home-living" },
  { label: "Electronics", slug: "electronics" },
  { label: "Health & Beauty", slug: "health-beauty" },
  { label: "Groceries", slug: "groceries" },
  { label: "Baby & Kids", slug: "baby-kids" },
  { label: "Sports & Outdoors", slug: "sports-outdoors" },
  { label: "Automotive", slug: "automotive" },
  { label: "Books & Stationery", slug: "books-stationery" },
  { label: "Digital Goods", slug: "digital-goods" },
];


function DashboardTab() {
  const [seletectedImages, setSelectedImages] = useState([])
  const [totalProducts, setTotalProucts] = useState(0) 
  const [imagePreview, setImagePreview] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [altImages, setAltImages] = useState([]);

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
  
    const createPreview = (e)=> {
      // console.log(e)
      let url = URL.createObjectURL(e.target.files[0])
      setImagePreview(url)
    }

   const createPreviewList = (e) => {
    
    let  allAltImages = []
    console.log(e)
    for (const elm of e) {
      allAltImages.push(URL.createObjectURL(elm))
    }
    setSelectedImages(allAltImages)
   }

   const handleUploadProduct = async (data) => {
    
     setLoading(true)
     if (!data.image || !data.image[0]) {
       alert("Please select an image to upload.");
       setLoading(false)
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

       let allImageUrls = [];
       const filePathOnCloud = await getDownloadURL(storageRef);
       if (data.altImages){
        for (const elm of data.altImages){
          const pathImage = `${new Date().toISOString() + elm.name}`;
          const fileRef = ref(storage, `products/${pathImage}`);
          await uploadBytes(fileRef, elm)
          const downloadUrl = await getDownloadURL(fileRef)
          allImageUrls.push({name:elm.name , src:downloadUrl})

        }
       }
       
       const productData = { 
        id: crypto.randomUUID(),
        name:data.name, 
        price:data.price, 
        description: data.description, 
        category: `${data.category}`.toLowerCase(),
        tags: data.tags,
        imageUrl: filePathOnCloud,
        pathRef: pathname,
        slug:generateSlug(data.name+ " " +data.tags+ " " +data.category ),
        reviews:[],
        otherImages:[...allImageUrls],
        quantity:1
       }
       if (altImages){
         await addDoc(collection(db, "products"), productData);

       }

       reset()
       setSelectedImages([])
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
                    <option>Flash Sales</option>
                  </select>
                </div>
                <div className="mb-3 w-full">
                  <select
                    {...register("category")}
                    required
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Choose Category
                    </option>

                    {categoryItems.map((each) => (
                      <option key={each.label} value={each.slug}>
                        {each.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 w-full ">
                  <label htmlFor="my-5 text-base-100">Product Image</label>
                  <br></br>

                  <input
                    {...register("image")}
                    onChange={createPreview}
                    type="file"
                    placeholder="product image"
                    multiple={false}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="mb-4 w-full flex justify-start rounded-lg">
                  {imagePreview && (
                    <div className="avatar">
                      <div className="w-32 rounded">
                        <img src={imagePreview} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="mb-4 w-full ">
                  <label className="text-sm text-gray-400" htmlFor="altImages">
                    Alternative Images
                  </label>
                  <br></br>
                  <input
                    {...register("altImages")}
                    onChange={(e) => createPreviewList(e.target.files)}
                    type="file"
                    multiple={true}
                    placeholder="product image"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div> 
                {
                  seletectedImages && (
                  <div className="mb-4 w-full flex  flex-shrink-1 flex-row justify-start">
                    {seletectedImages.map((each) => (
                      <div className="avatar mx-1 ">
                        <div className="w-28 rounded">
                          <img src={each} />
                        </div>
                      </div>
                    ))}
                  </div>
                  )
                }
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
        <div className="rounded-md bg-gradient-to-tr  from-[#382828] to-[#f0413b] text-white w-96">
          <div className="card-body">
            <h2 className="card-title mx-auto font-light text-2xl">Orders</h2>
            <MdOutlinePendingActions className="mx-auto" size={40} />
            <h4 className="font-medium text-3xl text-center">
              {orderList.length}
            </h4>
          </div>
        </div>
        <div
          className="m-2 rounded-md bg-gradient-to-tr
          from-[#382828] to-[#f0413b] text-white w-96"
        >
          <div className="card-body">
            <h2 className="card-title mx-auto font-light text-2xl">Products</h2>
            <MdOutlinePendingActions className="mx-auto" size={40} />
            <h4 className="font-medium text-3xl text-center">
              {totalProducts}
            </h4>
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
