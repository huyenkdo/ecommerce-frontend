import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import { NavLink } from 'react-router';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

function Product() {
  const productID = useParams().product

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
        return cld.image(`development/${key}`);
      })
      setPhotos(photos);
    })
    .catch(error => {
      console.log(error);
    });
  }, [productID])


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
            <NavLink to="/cart" className="w-75 my-4">
              <button className="bg-dark-main btn px-4 py-2 text-color-beige w-100" type="button">Add to My bag</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
   )
}

export default Product;
