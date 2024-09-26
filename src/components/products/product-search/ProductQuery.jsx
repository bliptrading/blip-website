import { CiSearch } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoProduct from "../../no-products/NoProduct";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../product-card/ProductCard";
import HomeSkeleton from "../../home-page-skeleton/HomeSkeleton";
import { app } from "../../../utils/firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const db = getFirestore(app);

export default function ProductQuery() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || ""; // Default to empty string if no query
  const [isLoading, setLoading] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  const handleSearch = () => {
    if (searchString.trim() === "") {
      return;
    }
    const encodedSearchString = encodeURIComponent(searchString); // Encode the search string
    navigate(`/p/search/?q=${encodedSearchString}`); // Use the encoded string in the navigation
  };

  function filterProducts(products, searchString) {
    // Trim and convert the search string to lowercase for case-insensitive search
    const trimmedSearchString = searchString.trim().toLowerCase();

    // Filter products based on the search string
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(trimmedSearchString) ||
        product.description.toLowerCase().includes(trimmedSearchString) ||
        product.category.toLowerCase().includes(trimmedSearchString)
      );
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let allDocs = [];
        const querySnapShot = await getDocs(collection(db, "products"));
        querySnapShot.forEach((doc) => {
          allDocs.push(doc.data());
        });

        // Filter products based on the current query
        if (query.length > 0) {
          const fproducts = filterProducts(allDocs, query);
          setFilteredProducts(fproducts);
        } else {
          setFilteredProducts(allDocs); // If no query, show all products
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loc.pathname, query]); // Fetch data when location or query changes

  return (
    <>
      <div className="breadcrumbs hidden lg:block text-sm mx-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <span>Search</span>
          </li>
        </ul>
      </div>
      <IoMdArrowRoundBack
        onClick={() => navigate("/")}
        className="lg:hidden m-4"
        size={30}
      />
      <div className="mx-auto xl:hidden lg:hidden md:hidden flex justify-center items-center w-full p-4 h-32">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search products and categories"
          className="flex-1 h-10 rounded-sm p-4 font-light text-black border-1 ring-0 focus:border-red-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex mx-2 items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
        >
          <CiSearch />
        </button>
      </div>

      {!isLoading ? (
        filteredProducts.length > 0 ? (
          <div className="grid m-4 lg:m-12 lg:gap-10 grid-cols-2 mt-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
            <ProductCard products={filteredProducts} />
          </div>
        ) : (
          <NoProduct />
        )
      ) : (
        <HomeSkeleton />
      )}
    </>
  );
}
