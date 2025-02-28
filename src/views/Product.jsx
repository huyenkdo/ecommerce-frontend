import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import { NavLink } from 'react-router';
import { useParams } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import ProductsContext from "../contexts/products_context";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

function Product() {
  const productID = useParams().product
  const { setItems, setTotalPrice, setWishlist } = useContext(ProductsContext);

  const [product, setProduct] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/products/${productID}`;
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      setProduct(result);

      const cld = new Cloudinary({
        cloud: {
          cloudName: "did0eciid",
        },
      });
      const photos = result.photos.map(({key}) => {
        return cld.image(`development/${key}`).delivery(quality(auto()));
      })
      setPhotos(photos);
    })
    .catch(error => {
      console.log(error);
    });
  }, [productID])

  const handleSubmit = (e) => {
    const orderItem = {
      'product_id': productID
    }
    const url = `${process.env.REACT_APP_API_URL}/order_items`;
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        'X-User-Email': process.env.REACT_APP_USER_EMAIL,
        'X-User-Token': process.env.REACT_APP_USER_TOKEN
      },
      body: JSON.stringify(orderItem)
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
  };

  const addToWishlist = () => {
    const product = {
      'product_id': productID
    }
    const url = `${process.env.REACT_APP_API_URL}/wishlists`;
    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json",
        'X-User-Email': process.env.REACT_APP_USER_EMAIL,
        'X-User-Token': process.env.REACT_APP_USER_TOKEN
      },
      body: JSON.stringify(product)
    };
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
      setWishlist(result)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="container d-flex mb-4">
      <div className="flex-grow-1 row row-cols-2 w-100">
        <div className="col-8 mt-5">
          {photos.map((photo, idx) => {
            return <div className='mb-3' key={photo.publicID}>
                      <AdvancedImage cldImg={photo} className="d-block w-100" alt="product-photo"/>
                   </div>
          })}
        </div>
        <div className='col-4'>
          <div className='align-items-center mt-5 sticky-top sticky-margin bg-white-beige d-flex flex-column p-3 px-4 shadow-sm'>
            <h2 className='fw-light my-4 text-dark-main'>{product.name}</h2>
            <p className='align-self-baseline fst-italic fw-lighter text-xs'>{product.price} €</p>
            <p className='fw-lighter'>{product.description}</p>
            <div className='align-items-center d-flex gap-3 justify-content-center w-100'>
              <NavLink to="/cart" className="w-75 my-4">
                <button className="bg-dark-main btn px-4 py-2 text-color-beige w-100" type="button" onClick={handleSubmit}>Add to My bag</button>
              </NavLink>
              <NavLink to="/wishlist">
                <i className="fa-solid fa-heart-circle-plus text-dark-main fs-4 link" onClick={addToWishlist}></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
   )
}

export default Product;
