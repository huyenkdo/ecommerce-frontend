import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import { NavLink } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import ProductsContext from "../contexts/products_context";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

function Wishlist() {
  const { wishlist, setWishlist } = useContext(ProductsContext);

  const removeFromWishlist = (productID) => {
    const url = `${process.env.REACT_APP_API_URL}/wishlists/${productID}`;
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        'X-User-Email': process.env.REACT_APP_USER_EMAIL,
        'X-User-Token': process.env.REACT_APP_USER_TOKEN
      }
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
    <div className="container my-4 d-grid">
      {wishlist.length > 0 ? (
        <>
          <h1 className="fw-lighter text-dark-main py-4 text-center">Here's what's in your wishlist</h1>
          <div className="d-flex gap-4 justify-content-center mt-4">
            {wishlist.map(item => {
              const cld = new Cloudinary({
                cloud: {
                  cloudName: "did0eciid",
                },
              });

              const photo = cld.image(`development/${item.photo_key}`).delivery(quality(auto()));

              return <div className="card mb-3 item-card bg-white-beige shadow-sm border-0 small position-relative" key={item.photo_key}>
                        <div className="d-flex">
                          <NavLink to={`/product/${item.id}`}>
                            <AdvancedImage cldImg={photo} className="rounded-start item-photo link" alt="product-photo"/>
                          </NavLink>
                          <div className="align-items-center d-flex">
                            <div className="card-body">
                              <h5 className="card-title text-dark-main">{item.name}</h5>
                              <p className="card-text text-dark-main"><small className="text-body-secondary">{item.price} €</small></p>
                            </div>
                          </div>
                        </div>
                        <i className="bottom-0 end-0 fa-heart-circle-minus fa-solid fs-5 m-2 position-absolute text-dark-main link" onClick={() => {removeFromWishlist(item.id)}}></i>
                      </div>
            })}
          </div>
        </>
      ) : (
        <h1 className="fw-lighter text-dark-main py-4 text-center">Your wishlist is empty</h1>
      )}
    </div>
   )
}

export default Wishlist;
