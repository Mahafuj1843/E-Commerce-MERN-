import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
const Header = () => {
  return (
    <>
      <header className='header-top'>
        <div className='container-lg'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white fw-light py-1'>Free Shipping Over 50$ and Free Returns</p>
            </div>
            <div className='col-6'>
              <p className='text-end fw-light text-white py-1'>Hotline: +8801819011001</p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-mid'>
        <div className='container-lg'>
          <div className='row align-items-center py-2'>
            <div className='col-2'>
              <h3><Link className='text-white'>Electro Mart</Link></h3>
            </div>
            <div className='col-5'>
              <div className="input-group">
                <input type="text" className="form-control py-2" placeholder="Search Product...." aria-label="Search Product" aria-describedby="basic-addon2" />
                <span className="input-group-text fs-6" id="basic-addon2"><BsSearch /></span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-mid-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link className='d-flex align-items-center text-white gap-2'>
                    <img className='icons' src='images/compare.svg' />
                    <p className='fw-light mb-0'>Compare <br />Product</p>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center text-white gap-2'>
                    <img className='icons' src='images/wishlist.svg' />
                    <p className='mb-0 fw-light'>Favourit <br />Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link className='position-relatived-flex align-items-center gap-2'>
                    <img className='icons' src='images/cart.svg' />
                    <span className='position-absolute translate-middle badge rounded-pill bg-white text-dark'>
                      0</span>
                  </Link>
                </div>
                <div>
                  <Link className='d-flex align-items-center text-white gap-2'>
                    <img className='icons' src='images/user.svg' />
                    <p className='mb-0 fw-light'>Log In <br />My Account</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom py-1'>
        <div className='container-lg'>
          <div className='row'>
            <div className='col-12'>
              <div className='bottom-menu d-flex align-items-center'>
                <div className='menu-link'>
                  <div className='d-flex align-items-center gap-3 text-white'>
                  <div className="dropdown">
                    <span className="bg-transparent text-white text-uppercase border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img className='icons me-1' src='./images/menu.svg'></img>
                      Shop Categories
                    </span>
                    <ul class="dropdown-menu">
                      <li><Link className="dropdown-item" to="#">Action</Link></li>
                      <li><Link className="dropdown-item" to="#">Another action</Link></li>
                      <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                    </ul>
                  </div>
                    <NavLink className='text-white text-uppercase' to="/">Home</NavLink>
                    <NavLink className='text-white text-uppercase' to="/blog">Blog</NavLink>
                    <NavLink className='text-white text-uppercase' to="/about">About</NavLink>
                    <NavLink className='text-white text-uppercase' to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header