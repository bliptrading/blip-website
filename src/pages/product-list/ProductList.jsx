import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import NoProduct from "../../components/no-products/NoProduct";
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../utils/firebase";
import HomeSkeleton from "../../components/home-page-skeleton/HomeSkeleton";

const db = getFirestore(app);

function ProductList() {
  const loc = useLocation();
  let pathList = `${loc.pathname}`.split("/");
  const category = pathList[2];
  const [filteredProduct, setFilter] = useState([]);
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSearch = () => {
    if (searchString.trim() === "") {
      return;
    }
    const encodedSearchString = encodeURIComponent(searchString);
    navigate(`/p/search/?q=${encodedSearchString}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching

      try {
        const catRef = collection(db, "products");
        const q = query(catRef, where("category", "==", category));
        const querySnapshot = await getDocs(q);

        // Process and store the matching documents
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });

        setFilter(products); // Update state with matching products
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [loc.pathname]); // Dependency array - runs effect when location changes

  return (
    <>
      <div className="breadcrumbs lg:block hidden text-sm mx-4">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <span>{pathList[1]}</span>
          </li>
          <li>
            <span>{pathList[2]}</span>
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
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search products and categories"
          className="flex-1 h-10 rounded-sm p-4 font-light text-black border-2 shadow-md ring-0 focus:border-red-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="flex mx-2 items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
        >
          <CiSearch />
        </button>
      </div>

      {!isLoading ? (
        <>
          {filteredProduct.length > 0 ? (
            <div className="grid lg:gap-10 grid-cols-2 mt-2 lg:m-12 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
              <ProductCard products={filteredProduct} />
            </div>
          ) : (
            <NoProduct /> // Show NoProduct only when loading is complete and no products found
          )}
        </>
      ) : (
        <HomeSkeleton /> // Show skeleton while loading
      )}
    </>
  );
}

export default ProductList;
