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
  const [editingProduct, setEditingProduct] =
    (useState < ProductItem) | (null > null);

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id) => {
    // In a real application, you would update the state or make an API call here
    console.log(`Deleting product with id: ${id}`);
  };

  const handleSave = (updatedProduct) => {
    // In a real application, you would update the state or make an API call here
    console.log("Saving updated product:", updatedProduct);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="tabs tabs-boxed mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab ${activeTab === category ? "tab-active" : ""}`}
            onClick={() => setActiveTab(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrashAlt className="mr-2" /> Delete
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
