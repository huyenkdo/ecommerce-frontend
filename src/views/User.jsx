import { NavLink } from 'react-router';
import { useEffect, useState, useContext } from 'react';
import ProductsContext from "../contexts/products_context";

function User() {
  const { orders } = useContext(ProductsContext);

  return (
    <div className="container my-4">
      <h1 className="fw-lighter text-dark-main py-4 text-center">{orders.length > 0 ? `Hello, ${orders[0].user_first_name} ${orders[0].user_last_name}!` : ''}</h1>
      <div className="d-flex gap-4 justify-content-center mt-4">
        <div className="bg-white-beige border-0 card item-card mb-3 p-4 shadow-sm small w-75 fit-height">
          <h5 className="card-title text-dark-main">Your past orders</h5>
          <ul className="list-group list-group-flush rounded mt-3">
            {orders.map(order => {
              return <li className="bg-beige-light list-group-item" key={order.id}>{`Order #${order.id} : ${order.item_nb} items, ${order.total_price}€`}</li>
            })}
          </ul>
        </div>
      </div>
    </div>
   )
}

export default User;
