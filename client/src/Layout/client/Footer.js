import React from 'react'
import { BsFacebook, BsTwitter, BsYoutube, BsInstagram } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='py-2'>
        <div className='container-lg'>
          <div className='row align-items-center py-3'>
            <div className='col-6'>
              <div className='footer-top d-flex align-items-center text-white gap-2'>
                <img className='newsletter-icon' src='images/newsletter.png' />
                <h3 className='mb-0'>Sign Up for Newsletter</h3>
              </div>
            </div>
            <div className='col-6'>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter your email" aria-label="Enter your email" aria-describedby="basic-addon2" />
                <span className="input-group-text fs-6" id="basic-addon2">Subscribe</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
        <div className='container-lg'>
          <div className='row text-white'>
            <div className='col-4'>
              <h6 className='mb-3'>Contact Us</h6>
              <div className='footer-links d-flex flex-column'>
                <address className='fs-6 fw-light'>Rno: 21 East Shohid Nogor,<br />
                  Oxygen, Chattogram.<br />
                  <p className='py-1'>PostalCode: 2000</p>
                  <p className='py-1'>Mobile: +8801819101010</p>
                  <p className='py-1'>Email: electromart@email.com</p>
                  <div className='d-flex align-items-center gap-3'>
                    <a className='p-1 rounded-pill btn'><BsFacebook className='text-white fs-4' /></a>
                    <a className='p-1 rounded-pill btn'><BsTwitter className='text-white fs-4' /></a>
                    <a className='p-1 rounded-pill btn'><BsYoutube className='text-white fs-4' /></a>
                    <a className='p-1 rounded-pill btn'><BsInstagram className='text-white fs-4' /></a>
                  </div>
                </address>
              </div>
            </div>
            <div className='col-3'>
              <h6>Information</h6>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white fw-light py-2 mb-1'>Privacy Policy</Link>
                <Link className='text-white fw-light py-2 mb-1'>Refund Policy</Link>
                <Link className='text-white fw-light py-2 mb-1'>Shipping Policy</Link>
                <Link className='text-white fw-light py-2 mb-1'>Terms of Service</Link>
                <Link className='text-white fw-light py-2 mb-1'>Blogs</Link>
              </div>
            </div>
            <div className='col-3'>
              <h6>Accounts</h6>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white fw-light py-2 mb-1'>Shops</Link>
                <Link className='text-white fw-light py-2 mb-1'>About Us</Link>
                <Link className='text-white fw-light py-2 mb-1'>FAQ</Link>
                <Link className='text-white fw-light py-2 mb-1'>Contact Us</Link>
              </div>
            </div>
            <div className='col-2'>
              <h6>Quick Links</h6>
              <div className='footer-links d-flex flex-column'>
                <Link className='text-white fw-light py-2 mb-1'>Laptops</Link>
                <Link className='text-white fw-light py-2 mb-1'>Mobils</Link>
                <Link className='text-white fw-light py-2 mb-1'>Tablats</Link>
                <Link className='text-white fw-light py-2 mb-1'>Watchs</Link>
                <Link className='text-white fw-light py-2 mb-1'>Accesserise</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='border-top py-3'>
        <div class="container-lg">
          <div className='row'>
            <div className='text-left text-white'>
              <span>Powered by Electro Mart.<br />&copy; 2023
                All rights reserved.</span>
            </div>
            <div></div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer