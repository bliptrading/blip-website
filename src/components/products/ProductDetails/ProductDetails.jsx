import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductCard from "../../product-card/ProductCard";
import { Link, useLocation } from "react-router-dom";
import { LiaStarSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowRight, MdAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../utils/firebase";

const db = getFirestore(app);

function ProductDetails() {
  const loc = useLocation();
  const itemPath = loc.pathname.split("/")[1];
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setLoading] = useState(true); // Initially loading is true
  const [currentProduct, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        let allDocs = [];
        const querySnapShot = await getDocs(collection(db, "products"));
        querySnapShot.forEach((doc) => {
          allDocs.push(doc.data());
        });
        setAllProducts(allDocs);
        const currentProd = allDocs.filter((each) => each.slug === itemPath)[0];
        setProduct(currentProd);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchData();
  }, [itemPath]);

  const handleAddToCart = (product) => {
    // Logic for adding to cart
    console.log("Add to cart", product);
  };

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <ul className="flex space-x-2">
              <Link to="/" className="hover:text-gray-800">
                Home
              </Link>
              <li>/</li>
              <Link to="/" className="text-gray-800">
                {itemPath}
              </Link>
            </ul>
          </nav>
        </div>
      </div>

      {/* Product Content Section */}
      {!isLoading && currentProduct ? (
        <div className="py-10 lg:mx-40 my-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="md:flex md:space-x-6">
              {/* Product Image */}
              <div className="md:w-1/3">
                <img
                  src={currentProduct?.imageUrl}
                  alt={currentProduct?.name}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              {/* Product Details */}
              <div className="md:w-2/3">
                <h1 className="text-2xl mt-10 lg:mt-3 roboto-thin font-medium text-gray-900 mb-4">
                  {currentProduct?.name}
                </h1>
                <span>Price</span>
                <h1 className="text-xl mt-4 lg:mt-3 roboto-thin font-medium text-gray-900 mb-4">
                  GHC {currentProduct?.price}
                </h1>
                <div className="flex flex-col text-gray-600 mb-6">
                  <span className="font-extrabold">Description</span>
                  <p>{currentProduct?.description}</p>
                </div>
                <div className="text-lg font-light text-gray-700 space-y-4 leading-relaxed">
                  <button
                    onClick={() => handleAddToCart(currentProduct)}
                    className="my-1 w-full hover:bg-red-200 mx-auto bg-red-500 text-white flex items-center p-2 rounded-sm justify-center"
                  >
                    <AiOutlineShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Display skeleton loader when isLoading is true
        <div className="flex m-2 lg:my-10 lg:mx-44 items-center justify-center w-full space-x-8 lg:flex-row">
          <div className="skeleton lg:h-[380px] lg:w-[500px] w-full"></div>
          <div className="space-y-4 w-full">
            <div className="skeleton lg:h-10 h-56 w-[350px] lg:w-3/4 rounded-md"></div>
            <div className="skeleton h-10 w-3/4 lg:w-3/4 rounded-md"></div>
            <div className="skeleton h-10 w-3/4 rounded-md"></div>
            <div className="skeleton h-10 w-3/4 rounded-md"></div>
            <div className="skeleton h-10 w-3/4 rounded-md"></div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section className="lg:mx-12 rounded-md bg-white shadow-sm mx-1">
        <div className="card p-4">
          <div className="w-full flex">
            <button
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <MdAdd className="hover:text-red-500" size={30} />
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add Review</h3>
                <div className="w-full mb-4">
                  <select className="select w-full max-w-xs">
                    <option disabled selected>
                      Pick your rating
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="w-full">
                  <textarea
                    placeholder="Say something"
                    className="textarea-secondary p-2 rounded-md"
                  ></textarea>
                </div>
                <div className="modal-action">
                  <button className="btn">Save</button>
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <span className="mt-2 lg:text-xl font-light lg:mx-2">
              CUSTOMER REVIEWS AND FEEDBACK
            </span>
            <Link className="font-light link-hover ml-auto flex" to={"reviews"}>
              <span className="mt-2 w-full text-red-400">SEE ALL</span>
              <MdOutlineKeyboardArrowRight className="text-red-400" size={40} />
            </Link>
          </div>
          <hr />
          <div className="w-full my-2">
            <div className="w-full flex p-1">
              <LiaStarSolid className="text-red-400" size={20} />
              <LiaStarSolid className="text-red-400" size={20} />
              <LiaStarSolid size={20} />
              <LiaStarSolid size={20} />
              <LiaStarSolid size={20} />
              <span className="text-sm ml-auto font-thin">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="w-full">
              <h1 className="font-light text-base">
                This is an excellent product
              </h1>
              <span className="font-light text-gray-400 text-base">
                By James Aurthur
              </span>
              <hr />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Items Section */}
      <section className="lg:mx-12 mx-1">
        <h1 className="text-white lg:mx-12 my-12 bg-red-500 p-2 text-center font-medium text-2xl">
          Similar Items
        </h1>
        <div className="grid lg:gap-10 grid-cols-2 mt-8 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          <ProductCard products={allProducts.filter((each)=> ((each.category = currentProduct.category)))} />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
