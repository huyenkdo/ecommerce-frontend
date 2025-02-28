import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { NavLink } from 'react-router';
import { useContext } from 'react';
import ProductsContext from "../contexts/products_context";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

function Cart() {
  const { items, totalPrice, setItems, setTotalPrice } = useContext(ProductsContext);

  const handleSubmit = () => {
    const url = `${process.env.REACT_APP_API_URL}/checkout`;
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        'X-User-Email': process.env.REACT_APP_USER_EMAIL,
        'X-User-Token': process.env.REACT_APP_USER_TOKEN
      }
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      setItems(result.order_items);
      setTotalPrice(result.total_price);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: "did0eciid",
    },
  });

  return (
    <div className="container my-4 w-50 d-grid">
      {items.length > 0 ? (
        <>
          <h1 className="fw-lighter text-dark-main py-4 text-center">
            Here's what's in your bag
          </h1>
          <div className="mt-4 gap-4">
            {items.map(item => {
              const photo = cld.image(`development/${item.photo_key}`).delivery(quality(auto()));
              return (
                <div className="card mb-3 item-card bg-white-beige shadow-sm border-0" key={item.photo_key}>
                  <div className="d-flex">
                    <NavLink to={`/product/${item.product_id}`}>
                      <AdvancedImage cldImg={photo} className="rounded-start item-photo link" alt="product-photo" />
                    </NavLink>
                    <div className="align-items-center d-flex">
                      <div className="card-body">
                        <h5 className="card-title text-dark-main">{item.name}</h5>
                        <p className="card-text text-dark-main">Quantity: {item.quantity}</p>
                        <p className="card-text text-dark-main">
                          <small className="text-body-secondary">{item.total_price} €</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h1 className="fw-semibold py-4 text-dark-main text-end fs-xxl">
            Total: {totalPrice} €
          </h1>
          <NavLink to="/cart" className="active text-end">
            <button
              className="bg-dark-main btn check-out-btn text-color-beige py-3"
              type="button"
              onClick={handleSubmit}
            >
              Check Out
            </button>
          </NavLink>
        </>
      ) : (
        <h1 className="fw-lighter text-dark-main py-4 text-center">Your bag is empty</h1>
      )}
    </div>
  );
}

export default Cart;
