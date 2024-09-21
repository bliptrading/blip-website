import { useState, useEffect } from "react";
import useLocalUser from "../../../hooks/localStorageHook";
import { collection,
   getFirestore, 
   getDocs
  } from "firebase/firestore";
import {app} from '../../../utils/firebase'
import { toast } from "react-toastify";
const db = getFirestore(app)
function Orders() {
  const [productLists, setProducts] = useState([])
  
  useEffect(() => {
        const user = localStorage.getItem('user');
        
        const getComplexQuery = async () => {
            if (user) {
                const email = JSON.parse(user).user.email;
                const colRef = collection(db, "orders", email, "orders");
                
                try {
                    const docsSnap = await getDocs(colRef);
                    const products = []; // Temporary array to hold fetched products

                    docsSnap.forEach((doc) => {
                        products.push(doc.data()); // Push each document's data into the array
                    });

                    setProducts(products); // Set the state with the fetched products
                    console.log(products); // Log the fetched products
                } catch (error) {
                    toast.error("Error fetching documents: ");
                }
            }
        };

        getComplexQuery();
    }, []);
  // Sample data for orders (you can replace this with your actual data)
  const orders = [
    
    {
      id: 6,
      image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/26/006249/1.jpg?0364",
      productName: "Product 6",
      quantity: 1,
      price: 59.99,
      status: "Processing",
    },
  ];

  return (
    <div className="w-full min-h-screen p-4 ">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid gap-2 grid-cols-2 ">
        {productLists.map((each) =>
          each.items.map((order) => (
            <div className="px-3 bg-base-100 w-40 h-48 shadow-xl">
              <figure className="">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="rounded-xl mt-2 w-full"
                />
              </figure>
              <div className="flex items-center flex-col text-center">
                <h1 className="font-thin mt-2 text-sm">{order.title}</h1>
                <div className="badge badge-outline  font-light ml-auto mt-4">Fashion</div>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
