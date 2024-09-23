import { useEffect, useState } from "react";
import { FaFileExport, FaSort } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import  {app} from '../../../utils/firebase';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { LuEye } from "react-icons/lu";

const orderData = [
  {
    id: 1,
    name: "Cy Ganderton",
    job: "Quality Control Specialist",
    company: "Littel, Schaden and Vandervort",
    location: "Canada",
    lastLogin: "12/16/2020",
    favoriteColor: "Blue",
  },
  // ... (other data entries)
];
const db = getFirestore(app)
function OrdersTab() {
  const [orderList, setOrderList] = useState([])
  const [isLoading, setLoading] = useState(false)


  useEffect(()=> {
    const fetchData = async()=> {
      setLoading(true)
      try {
        let allDocs = []
       const querySnapShot =  await getDocs(collection(db,'orders'))
       querySnapShot.forEach((doc)=> {
        allDocs.push(doc.data())
       })
       console.log(allDocs)
       setOrderList(allDocs)
      }catch(err) {

      }finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="w-full p-4 h-full">
      <h1 className="text-xl text-center lg:font-light font-thin mb-6">
        Orders
      </h1>
      <div className="mb-4 flex justify-between">
        <button className="btn btn-warning text-white">
          <FaFileExport className="mr-2" /> Export
        </button>
        <select
          required
          className="select select-sm select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Filter
          </option>
          <option>Latest</option>
          <option>Electronics</option>
        </select>
      </div>
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
  );
}

export default OrdersTab;
