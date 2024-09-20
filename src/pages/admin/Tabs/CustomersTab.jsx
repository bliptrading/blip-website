import { useState } from "react";
import { FaSort, FaEye } from "react-icons/fa";

const customerData = [
  {
    id: 1,
    name: "Hart Hagerty",
    country: "United States",
    company: "Zemlak, Daniel and Leannon",
    job: "Desktop Support Technician",
    color: "Purple",
    avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
  },
  {
    id: 2,
    name: "Brice Swyre",
    country: "China",
    company: "Carroll Group",
    job: "Tax Accountant",
    color: "Red",
    avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
  },
  {
    id: 3,
    name: "Marjy Ferencz",
    country: "Russia",
    company: "Rowe-Schoen",
    job: "Office Assistant I",
    color: "Crimson",
    avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
  },
  {
    id: 4,
    name: "Yancy Tear",
    country: "Brazil",
    company: "Wyman-Ledner",
    job: "Community Outreach Specialist",
    color: "Indigo",
    avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
  },
];

function CustomersTab() {
  const [customers, setCustomers] = useState(customerData);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedCustomers = [...customers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setCustomers(sortedCustomers);
    setSortConfig({ key, direction });
  };

  const toggleCustomerSelection = (id) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((customerId) => customerId !== id)
        : [...prev, id]
    );
  };

  const toggleAllCustomers = () => {
    setSelectedCustomers((prev) =>
      prev.length === customers.length
        ? []
        : customers.map((customer) => customer.id)
    );
  };

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedCustomers.length === customers.length}
                    onChange={toggleAllCustomers}
                  />
                </label>
              </th>
              {["name", "job", "company", "color"].map((key) => (
                <th
                  key={key}
                  onClick={() => sortData(key)}
                  className="cursor-pointer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && <FaSort className="inline ml-1" />}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => toggleCustomerSelection(customer.id)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={customer.avatar} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{customer.name}</div>
                      <div className="text-sm opacity-50">
                        {customer.country}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {customer.job}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {customer.company}
                  </span>
                </td>
                <td>{customer.company}</td>
                <td>{customer.color}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">
                    <FaEye /> View
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomersTab;
