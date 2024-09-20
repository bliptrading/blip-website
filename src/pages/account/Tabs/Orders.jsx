function Orders() {
  // Sample data for orders (you can replace this with your actual data)
  const orders = [
    {
      id: 1,
      image: "/api/placeholder/100/100",
      productName: "Product 1",
      quantity: 2,
      price: 29.99,
      status: "Shipped",
    },
    {
      id: 2,
      image: "/api/placeholder/100/100",
      productName: "Product 2",
      quantity: 1,
      price: 49.99,
      status: "Processing",
    },
    {
      id: 3,
      image: "/api/placeholder/100/100",
      productName: "Product 3",
      quantity: 3,
      price: 19.99,
      status: "Delivered",
    },
    {
      id: 4,
      image: "/api/placeholder/100/100",
      productName: "Product 4",
      quantity: 1,
      price: 39.99,
      status: "Shipped",
    },
    {
      id: 5,
      image: "/api/placeholder/100/100",
      productName: "Product 5",
      quantity: 2,
      price: 24.99,
      status: "Delivered",
    },
    {
      id: 6,
      image: "/api/placeholder/100/100",
      productName: "Product 6",
      quantity: 1,
      price: 59.99,
      status: "Processing",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <img
                src={order.image}
                alt={order.productName}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <h2 className="font-semibold">{order.productName}</h2>
                <p className="text-sm text-gray-600">
                  Quantity: {order.quantity}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold">${order.price.toFixed(2)}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    order.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : order.status === "Shipped"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
