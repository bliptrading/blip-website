import { useState, useEffect } from "react";
import { collection,
   getFirestore, 
   getDocs,
   where, 
   query,
  } from "firebase/firestore";
import {app} from '../../../utils/firebase'
import { toast } from "react-toastify";


const db = getFirestore(app)
function Orders() {
    const [productLists, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [userOrdersList, setUserOrders] = useState([])
    useEffect(() => {
            const user = localStorage.getItem('user');

            const getComplexQuery = async () => {
                if (user) {
                    const email = JSON.parse(user).user.email;
                    const colRef = collection(db, "orders");

                    const q = query(
                      collection(db, "orders"),
                      where("email", "==", email)
                    );

                try {
                  let allDocs = []
                   const querySnapshot = await getDocs(q);
                   querySnapshot.forEach((doc) => {
                      allDocs.push(doc.data())
                    setProducts(allDocs)
                   });
                    
                } catch (error) {
                    toast.error("Error fetching documents: ");
                }finally {
                  setLoading(false)
                }
            }
        };

        getComplexQuery();
    }, []);

  return (
    <div className="w-full min-h-screen p-4 ">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Orders</h1>
      {isLoading ? (
        <div className="grid gap-2 md:gap-0 lg:gap-0 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 ">
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid gap-2 md:gap-0 lg:gap-0 lg:grid-cols-4  md:grid-cols-3 grid-cols-2 ">
          {productLists.map((each) =>
            each.items.map((order) => (
              <div className="p-1 lg:px-4 overflow-hidden my-8 bg-base-100 w-40 lg:w-60  h-60 shadow-xl">
                <figure className="">
                  <img
                    src={order.image}
                    alt="Shoes"
                    className="rounded-xl h-36 w-full"
                  />
                </figure>
                <div className="flex items-center flex-col text-center">
                  <h1 className="font-thin mt-2 text-sm overflow-clip">
                    {order.title}
                  </h1>
                  <div className="badge badge-outline  font-light ml-auto mt-4">
                    {order.category}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
