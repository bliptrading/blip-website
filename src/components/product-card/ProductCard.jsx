import { AiOutlineShoppingCart } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import Store from "../../store/Store";

const ProductCard = ({ products }) => {
  const { cartArray, addToCart, removeFromCart } = Store();
  const handleAddToCart = (cart) => {
    const itemExist = cartArray.find((item) => item.id === cart.id);
    if (!itemExist) {
      addToCart(cart);
      toast.success("Item added");
    }
  };

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-sm transition-all hover:scale-110 duration-150 hover:cursor-pointer my-4 lg:my-1 lg:p-4 shadow-md lg:w-[240px] max-w-full lg:max-w-[250px]  "
        >
          <img
            src={product.image}
            alt="product"
            className="w-32 mx-auto rounded-lg h-28"
          />
          <div className="space-y-1 text-center pt-1 p-4">
            <h3 className="text-md md:my-2 lg:my-2 rubik-text font-normal first-letter:uppercase h-auto">
              {product.title}
            </h3>

            <div className=" flex text-lg flex-col text-center justify-between items-start">
              <p className="text-md font-medium mx-auto rubik-text md:my-2 lg:my-2">
                <span className="text-sm mt-4 rubik-text ">GH&#8373; </span>
                {product.price}.00{" "}
              </p>
              {!cartArray.find((item) => item.id === product.id) ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="my-1 w-full hover:bg-red-200 mx-auto bg-red-500 text-white flex items-center p-2 rounded-sm justify-center"
                >
                  <AiOutlineShoppingCart className="mr-2" /> Add
                </button>
              ) : (
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="my-1 flex items-center p-2 rounded-md mx-auto justify-center"
                >
                  <AiOutlineShoppingCart className="mr-2" /> Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      <ToastContainer theme="dark" />
    </>
  );
};

export default ProductCard;
