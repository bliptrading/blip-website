import { useState } from "react";
import { FaFileExport, FaSort } from "react-icons/fa";

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

function OrdersTab() {
  const [orders, setOrders] = useState(orderData);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedOrders = [...orders].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setOrders(sortedOrders);
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <button className="btn btn-warning text-white">
          <FaFileExport className="mr-2" /> Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {[
                "name",
                "job",
                "company",
                "location",
                "lastLogin",
                "favoriteColor",
              ].map((key) => (
                <th
                  key={key}
                  onClick={() => sortData(key)}
                  className="cursor-pointer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && <FaSort className="inline ml-1" />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.job}</td>
                <td>{order.company}</td>
                <td>{order.location}</td>
                <td>{order.lastLogin}</td>
                <td>{order.favoriteColor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTab;
