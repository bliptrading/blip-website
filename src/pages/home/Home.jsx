import { Outlet, useLocation } from "react-router-dom";
import Hero from "../../components/hero/Hero";
import Products from "../../components/products/Products";

const Home = () => {
  const loc = useLocation();
  return (
    <>
      <div>
        {loc.pathname === "/" && (
          <>
            <Hero />
            <Products />
          </>
        )}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Home;
