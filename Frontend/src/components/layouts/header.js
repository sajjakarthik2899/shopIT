import React from 'react'
import logo from '../../images/shopit_logo.png';
import profile from '../../images/default_avatar.jpg';
import { useGetMyProfileQuery } from '../../Redux/api/usersApi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../Redux/api/authApi';
const Header = () => {
  const {isLoading} = useGetMyProfileQuery();
  const navigate = useNavigate
  const [logout, {data}] = useLazyLogoutQuery();
  const {user} = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.cart);
  const handleLogout = async () => {
    logout();
    navigate(0); // Refresh the page to reflect the logout
  }
  return (
    <div>
        <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src={logo} alt="ShopIT Logo" />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form action="your_search_action_url_here" method="get">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value=""
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">{cartItems?.length}</span>
        </a>
        {user? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src={profile}
                alt="User Avatar"
                className="rounded-circle"
              />
            </figure>
            <span>{user?.name}</span>
          </button>
          <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
            <Link className="dropdown-item" href="/admin/dashboard"> Dashboard </Link>

            <Link className="dropdown-item" href="/my/orders"> Orders </Link>

            <Link className="dropdown-item" href="/myprofile"> Profile </Link>

            <Link className="dropdown-item text-danger" href="/" onClick={handleLogout}> Logout </Link>
          </div>
        </div>
        ) : (
          !isLoading && <Link to="/login" className="btn ms-4" id="login_btn"> Login </Link>
        )}
      </div>
        </nav>
    </div>
  )
}

export default Header
