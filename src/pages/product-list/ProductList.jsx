import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import NotFound from "../../components/404/NotFound";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";


const product = [
  {
    title: "Amazon Echo (3rd generation)",
    category: "electronics",
    quantity: 1,
    price: "52",
    image:
      "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
    id: 1,
  },
  {
    title: "IFB 30 L Convection Microwave Oven",
    category: "electronics",
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

function ProductList() {
  const loc = useLocation();
  let pathList = `${loc.pathname}`.split("/");
  const [filteredProduct, setFilter] = useState([...product]);
  const navigate = useNavigate();

  let [searchParams] = useSearchParams();
  const [searchString, setSearchString] = useState("");


  useEffect(() => {
    const currentPath = pathList[2]; // Get the current category from the path
    const filterProducts = () => {
      let filtered = product.filter((each) => each.category === currentPath);

      // Check if there's a search query
      const searchQuery = searchParams.get("q");
      if (searchQuery) {
        filtered = filtered.filter((each) =>
          each.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilter(filtered); 
    };
    filterProducts();
  }, [loc.pathname, searchParams]); // Add searchParams as a dependency

  const handleSearch = () => {
    if (loc.pathname !== '/') {
      navigate(`${loc.pathname}?q=` + searchString);

    }
    navigate(`/?q=` + searchString);

  };


  return (
    <>
      <div className="breadcrumbs text-sm mx-4">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>{pathList[1]}</a>
          </li>
          <li>{pathList[2]}</li>
        </ul>
      </div>
      <IoMdArrowRoundBack
        onClick={() => navigate("/")}
        className=" lg:hidden m-4"
        size={30}
      />
      <div className="mx-auto xl:hidden lg:hidden md:hidden  flex justify-center items-center w-full p-4 h-32">
        <input
          type="text"
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search products and categories"
          className="flex-1 h-10 rounded-sm p-4  text-black outline-none  active:ring-red-300 active:outline-red-300 "
        />
        <button
          onClick={handleSearch}
          className="flex mx-2 items-center h-10 rounded-sm px-3 py-4 text-white bg-red-500"
        >
          <CiSearch />
        </button>
      </div>
      {filteredProduct.length > 0 ? (
        <div className="grid lg:gap-10 grid-cols-2 mt-8  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 ">
          <ProductCard products={filteredProduct} />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default ProductList;
