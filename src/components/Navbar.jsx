import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar px-3 navbar-expand-lg bg-dark-main sticky-top">
      <div className="container-fluid text-color-beige">
        <NavLink to="/" className="navbar-brand text-color-beige">Jullery</NavLink>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-3 ">
              <NavLink
                to="/"
                className='nav-link active text-color-beige'
              >
                Home
              </NavLink>
            </li>
          </ul>
          <div className='d-flex gap-4'>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-light border-beige" type="submit">Search</button>
            </form>
            <i className="align-content-center fa-regular fa-user fs-4"></i>
            <NavLink
              to="/wishlist"
              className='align-content-center text-color-beige'
            >
              <i className="fa-regular fa-heart fs-4"></i>
            </NavLink>
            <NavLink
              to="/cart"
              className='align-content-center text-color-beige'
            >
              <i className="fa-solid fa-bag-shopping fs-4"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
