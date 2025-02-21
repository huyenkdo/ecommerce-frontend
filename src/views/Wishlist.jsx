import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import { NavLink } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import ProductsContext from "../contexts/products_context";

function Wishlist() {
  const { wishlist } = useContext(ProductsContext);

  return (
    <div className="container my-4 w-50 d-grid">
      <h1 className="fw-lighter text-dark-main py-4 text-center">Here's what's in your wishlist</h1>
      <div className="mt-4 gap-4">
        {wishlist.map(item => {
          const cld = new Cloudinary({
            cloud: {
              cloudName: "did0eciid",
            },
          });

          const photo = cld.image(`development/${item.photo_key}`);

          return <div className="card mb-3 item-card bg-white-beige shadow-sm border-0" key={item.photo_key}>
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
                  </div>
        })}
      </div>
    </div>
   )
}

export default Wishlist;
