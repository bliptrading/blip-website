import { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import { getFirestore,
   updateDoc,
   getDocs,
   doc ,
   collection, 
   deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject} from "firebase/storage";
import { app } from "../../../utils/firebase";
import { ToastContainer, toast } from "react-toastify";

const db = getFirestore(app);
const storage = getStorage(app);

const products = [
  {
    title: "Amazon Echo (3rd generation)",
    category: "appliances",
    quantity: 1,
    price: "52",
    image:
      "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
    id: 1,
  },
  // ... (rest of the product data)
];


export default function ProductsTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async(product) => {
    
    try {
      const imageRef = ref(storage,`products/${product.pathRef}`);
      await deleteDoc(doc(db, "products", product._id));
      await deleteObject(imageRef);
      toast.success("Product deleted successfully")
    }catch(err) {
      console.log(err)
      toast.error("Could not delete product")
    }
  };

  const handleSave = async(updatedProduct) => {
    console.log("Saving updated product:", updatedProduct);
    try {
      const currentRef = doc(db, "products", updatedProduct._id);
      await updateDoc(currentRef, {
        ...updatedProduct
      });
      toast.success(
        "Product edited sucessfully"
      )
      setEditingProduct(null);

    }catch(err){
      toast.success(err);
    }
  };


  useEffect(()=> {
    const fetchProducts = async()=> {
      setLoading(true)
      try {
        let allDocs = [];
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id)
          allDocs.push({_id:doc.id, ...doc.data()})
          setAllProducts(allDocs)
          
          
        });
      }catch (err){
        toast.error("Product could not be loaded")
        
      }finally {
        setLoading(false)
      }
    }
    fetchProducts()
    
  },[])

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-xl text-center lg:font-light font-thin mb-6">
        Manage Products
      </h1>
      {isLoading ? (
        <div className="w-full flex flex-row space-x-4">
          <div className="skeleton rounded-md h-44 w-44 lg:w-60 lg:h-60"></div>
          <div className="skeleton rounded-md h-44 w-44 lg:w-60 lg:h-60"></div>
          <div className="skeleton hidden lg:block rounded-md h-44 w-44 lg:w-60 lg:h-60"></div>
          <div className="skeleton hidden lg:block rounded-md h-44 w-44 lg:w-60 lg:h-60"></div>
        </div>
      ) : (
        
        <div className="grid gap-2 md:gap-0 lg:gap-0 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="p-1 lg:px-4 overflow-hidden my-8 bg-base-100 w-40 lg:w-60  shadow-xl"
          >
            <figure>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="rounded-xl h-36 w-full"
              />
            </figure>
            <div className="flex items-center flex-col text-center">
              <h1 className="font-thin mt-2 text-sm overflow-clip">
                {product.name}
              </h1>
              <h1 className="font-light ml-auto text-lg overflow-clip">
                GH&#8373; {product.price}
              </h1>
              <div className="w-full flex flex-col">
                <div className="badge mx-2 badge-outline font-light ml-auto mt-4">
                  {product.category}
                </div>
                <div className="badge badge-outline font-light ml-auto mt-4">
                  {product.tags}
                </div>
              </div>
              <div className="hidden lg:flex justify-between  mt-2 w-full">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> 
        
      )}

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-light mx-auto mb-4">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingProduct);
              }}
            >
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block input w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="mt-1 input max-w-xs block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-3 w-full">
                <select
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  required
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Choose Category
                  </option>
                  <option>Fashion</option>
                  <option>Electronics</option>
                  <option>Home Decor</option>
                </select>
              </div>
              <div className="mb-3 w-full">
                <select
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      tags: e.target.value,
                    })
                  }
                  required
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    Choose Tags
                  </option>
                  <option>None</option>
                  <option>Latest</option>
                  <option>Top Deals</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="btn rounded-sm btn-ghost"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn rounded-sm bg-red-500 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
