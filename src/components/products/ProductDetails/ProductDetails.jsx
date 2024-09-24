import { AiOutlineShoppingCart } from "react-icons/ai";
import ProductCard from "../../product-card/ProductCard";
import { product } from "../Products";
import { Link, useLocation } from "react-router-dom";
function ProductDetails() {
    
    const loc = useLocation()
    const itemPath = loc.pathname.split('/')[1]

    
  return (
    <>
      {/* Breadcrumb Section */}
      <div className=" py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <ul className="flex space-x-2">

                <Link to="/" className="hover:text-gray-800">
                  Home
                </Link>
              
              <li>/</li>
              <Link to='/' className="text-gray-800">{itemPath}</Link>
            </ul>
          </nav>
        </div>
      </div>

      {/* Product Content Section */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:flex md:space-x-6">
            {/* Prduct Image */}
            <div className="md:w-1/3">
              <img
                src="https://via.placeholder.com/600"
                alt="Blog Post"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-2/3">
              <h1 className="text-2xl mt-10 lg:mt-3 roboto-thin font-medium text-gray-900 mb-4">
                Blog Title
              </h1>
              <span>Price</span>
              <h1 className="text-xl mt-4  lg:mt-3 roboto-thin font-medium text-gray-900 mb-4">
                GHC 50.00
              </h1>
              <div className="flex flex-col space-x-4 text-gray-600 mb-6">
                <span>
                  <span className="font-extrabold">Description</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </span>
              </div>

              {/* Blog Content */}
              <div className="text-lg  font-light text-gray-700 space-y-4 leading-relaxed">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="my-1 w-full hover:bg-red-200 mx-auto bg-red-500 text-white flex items-center p-2 rounded-sm justify-center"
                >
                  <AiOutlineShoppingCart className="mr-2" /> Add
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="lg:mx-12 mx-1">
        <h1 className="text-white lg:mx-12 my-12 bg-red-500 p-2 text-center font-medium text-2xl">
          Similar Items
        </h1>
        <div className="grid lg:gap-10 grid-cols-2 mt-8  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 ">
          <ProductCard products={product} />
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
