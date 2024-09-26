import { useState, useEffect } from "react";
import ProductCard from "../product-card/ProductCard";
import { useLocation,  useSearchParams, useNavigate } from "react-router-dom";
import NotFound from "../404/NotFound";
import BlogSection from "../blog-section/BlogSection";
import Banner from "../banner/Banner";
import { getFirestore,getDocs, collection } from "firebase/firestore";
import { app } from "../../utils/firebase";
import HomeSkeleton from "../home-page-skeleton/HomeSkeleton";

const db = getFirestore(app)



const Products = () => {
  const [productsArray, setProductArray] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const loc = useLocation()
   const [allProducts, setAllProducts] = useState([]);
   const [isLoading, setLoading] = useState([]);

   useEffect(() => {
     const fetchData = async () => {
       setLoading(true);
       try {
         let allDocs = [];
         const querySnapShot = await getDocs(collection(db, "products"));
         querySnapShot.forEach((doc) => {
           allDocs.push(doc.data());
         });
         console.log(allDocs);
         setProductArray(allDocs);
       } catch (err) {
       } finally {
         setLoading(false);
       }
     };
     fetchData();
   }, [loc.pathname]);

  useEffect(() => {
    const filterProducts = () => {
      
      const currentPath = location.pathname.split("/")[2];
      const searchQuery = searchParams.get("q");

    };

    filterProducts();
  }, [location.pathname, searchParams]);

  const handleFilter = (value) => {

    {/* Filter By tags */}
    setActiveFilter(value);
    const navigate = useNavigate();
  };

  return (
    <main
      className="container mt-[3rem] mx-auto px-5 lg:px-10 font-Lato"
      id="product"
    >
      <nav className="flex justify-between">
        <h1 className="text-2xl  font-light">
          Popular <span className="text-red-500">Products</span>
        </h1>
        <ul className="justify-between font-light hidden space-x-10 text-gray-500 cursor-pointer md:flex">
          <li
            onClick={() => handleFilter("all")}
            className={`cursor-pointer ${
              activeFilter === "all" ? "border-b-2 border-red-600" : ""
            }`}
          >
            All
          </li>
          <li
            onClick={() => handleFilter("appliances")}
            className={`cursor-pointer ${
              activeFilter === "appliances" ? "border-b-2 border-red-600" : ""
            }`}
          >
            Latest
          </li>
          <li
            onClick={() => handleFilter("grocery")}
            className={`cursor-pointer ${
              activeFilter === "grocery" ? "border-b-2 border-red-600" : ""
            }`}
          >
            Top Deals
          </li>
        </ul>
      </nav>
      {!isLoading ? (
        <div className="grid lg:gap-10 grid-cols-2 mt-8  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 ">
          <ProductCard products={productsArray} />
        </div>
      ) : (
        
      <HomeSkeleton />
      )}
      <div className="w-full">
        <Banner />

      </div>
      <section className="w-full ">
          <h1 className="text-white my-12 bg-red-500 p-2 text-center font-medium text-2xl">Blog Posts</h1>
        <BlogSection />
      </section>
      
    </main>
   
  );
};

export default Products;
