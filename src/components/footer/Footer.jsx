import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import {
  FaArrowAltCircleUp,
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';

function Footer() {
  const [size, setSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setSize(true);
      } else {
        setSize(false);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='footer'>
      <div className='footer_container_logo'>
        <NavLink to='/'>
          <img
            className='footer_logo'
            src={size ? 'images/logo_light.png' : 'images/logo_mini.png'}
            alt='sphereus'
          />
        </NavLink>
      </div>
      <div className='footer_social'>
        <a href='https://www.instagram.com' aria-label='footer_social'>
          <FaInstagramSquare className='footer_social_icon' />
        </a>
        <a href='https://www.facebook.com' aria-label='footer_social'>
          <FaFacebookSquare className='footer_social_icon' />
        </a>
        <a href='https://www.twitter.com' aria-label='footer_social'>
          <FaTwitterSquare className='footer_social_icon' />
        </a>
      </div>
      <div className='footer_link'>
        <div className='footer_link_url'>
          <NavLink to='/policy'>
            <p className='footer_link_url_txt'>Privacy Policy</p>
          </NavLink>
          <NavLink to='/cookies'>
            <p className='footer_link_url_txt'>Cookies</p>
          </NavLink>
          <NavLink to='/termsofservices'>
            <p className='footer_link_url_txt'>Terms of Services</p>
          </NavLink>
        </div>

        <div className='footer_link_btn'>
          <button
            type='button'
            className='btnToTop'
            aria-label='to top button'
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <FaArrowAltCircleUp />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
