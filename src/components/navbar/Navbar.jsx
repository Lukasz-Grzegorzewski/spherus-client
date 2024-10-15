import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../../contexts/ThemeContext';
import NavbarDesktop from './navbarDesktop/NavbarDesktop';
import NavbarMobile from './navbarMobile/NavbarMobile';

function Navbar({ handlePopUpLogIn, handleRegisterPopUp }) {
  const [size, setSize] = useState(false);
  const { themeToggle } = useContext(ThemeContext);

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
    <div className='navbar'>
      <div className='logo-container'>
        <NavLink to='/'>
          <img
            className='logo'
            src={
              size
                ? themeToggle
                  ? `${import.meta.env.VITE_URL_SPHERUS_API}/assets/images/front/logo_spherus_long_dark.png`
                  : `${import.meta.env.VITE_URL_SPHERUS_API}/assets/images/front/logo_spherus_long_light.png`
                : `${import.meta.env.VITE_URL_SPHERUS_API}/assets/images/front/logo_spherus_short.png`
            }
            alt='logo'
          />
        </NavLink>
      </div>
      {!size ? (
        <NavbarMobile
          handlePopUpLogIn={() => handlePopUpLogIn()}
          handleRegisterPopUp={() => handleRegisterPopUp()}
        />
      ) : (
        <NavbarDesktop
          handlePopUpLogIn={() => handlePopUpLogIn()}
          handleRegisterPopUp={() => handleRegisterPopUp()}
        />
      )}
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  handlePopUpLogIn: PropTypes.func.isRequired,
  handleRegisterPopUp: PropTypes.func.isRequired,
};
