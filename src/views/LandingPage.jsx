import { useContext } from "react";
import Card from "../components/Card";
import ProductsContext from "../contexts/products_context";

function LandingPage() {
  const { products, setProducts } = useContext(ProductsContext);

  return (
    <div className="container d-flex align-items-center flex-column mb-4 mt-5">
      <h1 className="fw-light text-dark-main">Discover our collection</h1>
      <div className="mt-4 row gap-4 justify-content-center text-center">
        {products.map(product => {
          return <Card product={product} key={product.id} />
        })}
      </div>
    </div>
   )
}

export default LandingPage;
