import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="navbar px-3 navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">Jullery</NavLink>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? 'nav-link active' : 'navlink'}
                aria-current={({ isActive }) => isActive ? 'page' : ''}
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                to="/user"
                className={({ isActive }) => isActive ? 'nav-link active' : 'navlink'}
                aria-current={({ isActive }) => isActive ? 'page' : ''}
              >
                User
              </NavLink>
            </li> */}
          </ul>
          <div className='d-flex gap-4'>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <i className="align-content-center fa-regular fa-user fs-4"></i>
            <NavLink
              to="/wishlist"
              className='align-content-center text-dark'
            >
              <i className="fa-regular fa-heart fs-4"></i>
            </NavLink>
            <NavLink
              to="/cart"
              className='align-content-center text-dark'
            >
              <i className="fa-cart-shopping fa-solid fs-4"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
