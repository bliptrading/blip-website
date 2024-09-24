import { useState, useEffect } from "react";
import ProductCard from "../product-card/ProductCard";
import { useLocation,  useSearchParams, useNavigate } from "react-router-dom";
import NotFound from "../404/NotFound";
import BlogSection from "../blog-section/BlogSection";
import Banner from "../banner/Banner";


export const product = [
  {
    title: "Amazon Echo (3rd generation)",
    category: "appliances",
    quantity: 1,
    price: "52",
    image:
      "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
    id: 1,
  },
  {
    title: "IFB 30 L Convection Microwave Oven",
    category: "appliances",
    quantity: 1,
    price: "239",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/81D8pNFmWzL._SL1500_.jpg",
    id: 2,
  },
  {
    title: "Samsung 49' Curved LED Gaming Monitor ",
    category: "appliances",
    quantity: 1,
    price: "1095",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg",
    id: 3,
  },
  {
    title: "Mama'S Pride Parboiled Rice 10kg",
    category: "grocery",
    quantity: 1,
    price: "13",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/52/934348/1.jpg?4747",
    id: 4,
  },
  {
    title: "Devon King'S Cooking Oil Keg - 3 litres",
    category: "grocery",
    quantity: 1,
    price: "4",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/01/890938/1.jpg?8149",
    id: 5,
  },
  {
    title: "Nestle Golden Morn Grainsmart 900g x1",
    category: "grocery",
    quantity: 1,
    price: "3",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/81/4801812/1.jpg?6772",
    id: 6,
  },
  {
    title: "Kellogg's Corn Flakes 300g Box (Kellogg's)",
    category: "grocery",
    quantity: 1,
    price: "6",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/53/095728/1.jpg?1256",
    id: 7,
  },
  {
    title: "Amstel Malta Can 33cl x 6",
    category: "grocery",
    quantity: 1,
    price: "5",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/65/969129/1.jpg?5342",
    id: 8,
  },
  {
    title: "Men's Sports Running Shoes ",
    category: "fashion",
    quantity: 1,
    price: "8",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/26/006249/1.jpg?0364",
    id: 9,
  },
  {
    title: "Men's Fashion Bracelet Four-piece",
    category: "fashion",
    quantity: 1,
    price: "6",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/21/8104152/1.jpg?7069",
    id: 10,
  },
  {
    title: "Fashion Anklet Let On The Leg",
    category: "fashion",
    quantity: 1,
    price: "11",
    image:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/6118622/1.jpg?9629",
    id: 11,
  },
  {
    title: "Ladies Leather Mini Hand Bag - Black",
    category: "fashion",
    quantity: 1,
    price: "10",
    image:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/30/231008/1.jpg?3542",
    id: 12,
  },
];

const Products = () => {
  const [productsArray, setProductArray] = useState(product);
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filterProducts = () => {
      let filtered = [...product];
      const currentPath = location.pathname.split("/")[2];
      const searchQuery = searchParams.get("q");

      if (currentPath && currentPath !== "all") {
        filtered = filtered.filter(
          (item) => item.category.toLowerCase() === currentPath.toLowerCase()
        );
      }

      if (searchQuery) {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProductArray(filtered);
    };

    filterProducts();
  }, [location.pathname, searchParams]);

  const handleFilter = (value) => {
    setActiveFilter(value);
    const navigate = useNavigate();
    navigate(value === "all" ? "/products" : `/products/${value}`);
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
      {productsArray.length > 0 ? (
        <div className="grid lg:gap-10 grid-cols-2 mt-8  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 ">
          <ProductCard products={productsArray} />
        </div>
      ) : (
        <NotFound />
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
