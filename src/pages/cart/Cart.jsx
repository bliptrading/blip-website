import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Store from "../../store/Store";
import { AiOutlineDelete } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { usePaystackPayment } from "react-paystack";
import { toast, ToastContainer } from "react-toastify";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { app } from "../../utils/firebase";

const db = getFirestore(app);

const Cart = () => {
  const { cartArray, removeFromCart, clearCart } = Store();
  const [cart, setCart] = useState(cartArray);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDecrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleIncrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (acc, curr) => acc + Number(curr.price * curr.quantity),
    0
  );

  const billings = {
    tax: 3,
    shipping: 10,
    discount: 4,
    total: totalPrice,
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: "blipcart@gmail.com",
    amount:
      Math.round(
        billings.tax + billings.total + billings.shipping - billings.discount
      ) * 8000,
    publicKey: "pk_test_00fa1374806b1e0766cae0777c8b07d2f5b5c6d3",
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    toast.success("Payment successfully completed");
  };

  const onClose = () => {
    toast.error("Your order was cancelled");
  };

  React.useEffect(() => {
    setCart(cartArray);
  }, [cartArray]);

  const handlePayment = async (data) => {
    const user_data = localStorage.getItem("user");
    let json_user = JSON.parse(user_data);

    if (!user_data) {
      toast.error("You are not logged in");
      return;
    }

    try {
      await addDoc(collection(db, "orders", json_user.user.email, "orders"), {
        orderId: crypto.randomUUID().slice(0, 8).toUpperCase(),
        number: data.phone,
        fullname: data.fullName,
        items: [...cartArray],
        amount: billings.total,
        email: json_user.user.email,
        date: new Date().toLocaleString(),
      });
      clearCart();
      toast.success("Cart Emptied");
      toast.success("Order Completed");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Order Failed");
    }
  };

  return (
    <main className="container px-5 pt-12 mx-auto lg:px-10 lg:pt-20 font-Lato">
      {cartArray.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-5 text-center">
          <h1 className="text-3xl font-medium lg:text-6xl sm:text-5xl ">
            Shopping Cart is <span className="text-red-500">Empty</span>
          </h1>
          <p className="text-lg">
            Go to shop and add to cart product you'd like to buy.
          </p>
          <a href="/#product">
            <button className="flex items-center p-3 text-white bg-red-500 rounded-md animate-verticalBounce">
              <BiArrowBack className="mr-2" /> Return to Shop
            </button>
          </a>
        </div>
      ) : (
        <>
          <section className="flex flex-col justify-between py-10 lg:flex-row">
            <div className="w-full lg:w-8/12">
              <table className="w-full">
                {/* Table Header */}
                <thead className="border-b ">
                  <tr className="flex  text-md  items-center justify-between pb-2 ">
                    <th className="w-1/4 font-medium text-base ">Product</th>
                    <th className="w-1/4 font-medium ">Price</th>
                    <th className="w-1/4 font-medium ">Quantity</th>
                    <th className="w-1/4 font-medium ">Total</th>
                    <th className="w-1/4 font-medium "></th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="">
                  {cart.map((item) => (
                    <tr
                      key={item.id}
                      className="flex items-center justify-between py-4 border-b "
                    >
                      <td className="flex items-center justify-center w-1/4">
                        <img
                          src={item.image}
                          alt="fruit"
                          className="w-16 h-16 rounded-md lg:w-28 lg:h-28 "
                        />
                      </td>
                      <td className="text-sm font-light items-center justify-center w-1/4 lg:text-lg">
                        <span className="font-medium">GH&#8373; </span>
                        {item.price}
                      </td>
                      <td className="flex  text-md font-light justify-center w-1/4">
                        <button
                          className="w-8 h-8"
                          onClick={() => handleDecrementQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="flex text-base font-light items-center px-2">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8"
                          onClick={() => handleIncrementQuantity(item.id)}
                        >
                          +
                        </button>
                      </td>
                      <td className="flex font-medium items-center text-base justify-center w-1/4 lg:text-lg">
                        <span>GH&#8373; </span>
                        {item.price * item.quantity}
                      </td>

                      <div
                        className="flex items-center justify-center w-1/4 text-lg cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <AiOutlineDelete />
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <form
              className="p-5 my-8 ml-0 border rounded-md lg:w-4/12 lg:ml-4 h-fit"
              onSubmit={handleSubmit(handlePayment)}
            >
              <div className="w-full m-2">
                <input
                  type="text"
                  placeholder="Momo Number"
                  className={`input text-sm lg:text-lg  my-2 font-light input-bordered join-item w-full max-w-xs ${
                    errors.phone ? "input-error" : ""
                  }`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^0[0-9]{9}$/,
                      message:
                        "Phone number must be 10 digits long and start with 0.",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 font-thin text-sm ">
                    {errors.phone.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Full Name"
                  className={`input  text-sm lg:text-lg  input-bordered join-item font-light w-full max-w-xs ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 font-thin text-sm ">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Billing Info */}
              <div className="flex justify-between py-1">
                <h1 className="text-md font-light">Sub Total:</h1>
                <p className="text-md font-medium">
                  GH&#8373; {billings.total}.00
                </p>
              </div>
              <div className="flex justify-between py-4">
                <h1 className="py-3 text-md font-light">Discount:</h1>
                <p className="text-md font-medium">
                  GH&#8373; {billings.discount}.00
                </p>
              </div>
              <div className="flex justify-between py-4">
                <h1 className="py-3 text-md font-light">Delivery Fee:</h1>
                <p className="text-md font-medium">
                  GH&#8373; {billings.shipping}.00
                </p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-4">
                <h1 className="py-5 text-md font-light">Total:</h1>
                <p className="text-md font-bold">
                  GH&#8373;
                  {Math.round(
                    billings.total +
                      billings.tax +
                      billings.shipping -
                      billings.discount
                  )}
                  .00
                </p>
              </div>

              <button
                type="submit"
                className="w-full p-3 text-white text-lg font-light bg-red-500 rounded-md"
              >
                Checkout
              </button>
            </form>
          </section>
        </>
      )}
      <ToastContainer stacked />
    </main>
  );
};

export default Cart;
