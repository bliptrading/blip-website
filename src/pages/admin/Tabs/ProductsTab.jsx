import { useState } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

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

const categories = [
  "all",
  ...new Set(products.map((product) => product.category)),
];

export default function ProductsTab() {
  const [activeTab, setActiveTab] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    console.log(`Deleting product with id: ${id}`);
    // Here you would typically filter out the deleted product from the state
  };

  const handleSave = (updatedProduct) => {
    console.log("Saving updated product:", updatedProduct);
    setEditingProduct(null);
    // Logic to update the product in your state or database would go here
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <div className="grid gap-2 md:gap-0 lg:gap-0 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-1 lg:px-4 overflow-hidden my-8 bg-base-100 w-40 lg:w-60 h-60 shadow-xl"
          >
            <figure>
              <img
                src={product.image}
                alt={product.title}
                className="rounded-xl h-36 w-full"
              />
            </figure>
            <div className="flex items-center flex-col text-center">
              <h1 className="font-thin mt-2 text-sm overflow-clip">
                {product.title}
              </h1>
              <div className="badge badge-outline font-light ml-auto mt-4">
                {product.category}
              </div>
              <div className="flex justify-between mt-2 w-full">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editingProduct);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={editingProduct.title}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={editingProduct.quantity}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button className="btn btn-circle btn-lg fixed bottom-8 right-8 bg-primary text-white">
        <FaPlus size={24} />
      </button>
    </div>
  );
}
