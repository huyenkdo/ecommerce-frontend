import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';

function Card({product}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "did0eciid",
    },
  });

  const photos = product.photos.map(({key}) => {
    return cld.image(`development/${key}`);
  })

  return (
    <div className="card bg-white-beige small shadow-sm border-0 p-0">
      <div id={`carousel${product.id}`} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {photos.map((photo, idx) => {
            return <div className={idx === 0 ? "carousel-item active" : "carousel-item"} key={photo.publicID}>
                      <AdvancedImage cldImg={photo} className="d-block w-100 link" alt="product-photo"/>
                   </div>
          })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${product.id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={`#carousel${product.id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.price} €</p>
      </div>
    </div>
   )
}

export default Card;
