import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  FaCog,
  FaPowerOff,
  FaQuestion,
  FaRegStar,
  FaUser,
  FaUserPlus,
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../../../contexts/UserContext';
import Toggle from './Toggle';

function MenuBurger({
  isBurgerClicked = false,
  setIsBurgerClicked,
  handlePopUpLogIn,
  handleRegisterPopUp,
}) {
  const { isAdmin, userToken, id } = useContext(UserContext);

  const [size, setSize] = useState(false);
  const [user, setUser] = useState(null);

  const inputImgAvatar = useRef();
  const refBurgerContainer = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    function getUser(idUserContext) {
      axios
        .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/users/${idUserContext}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.error(err));
    }
    getUser(id);
  }, [id]);

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
    <div
      ref={refBurgerContainer}
      className={
        isBurgerClicked ? 'menu-burger active' : 'menu-burger inactive'
      }
    >
      {user && userToken && userToken.length > 0 ? (
        <div className='buttons'>
          {isAdmin && isAdmin === 1 && (
            <NavLink to='/admin'>
              <button
                className='btn btn-admin-panel'
                type='button'
                onClick={() => {
                  setIsBurgerClicked(false);
                }}
              >
                <FaCog className='signin-icon' /> Admin Panel
              </button>
            </NavLink>
          )}
          <div className='profile-favorites-container'>
            <NavLink to='/profile'>
              <div className='btn-profil-image-container'>
                <button
                  className='btn btn-profil'
                  type='button'
                  onClick={() => {
                    setIsBurgerClicked(false);
                  }}
                >
                  <FaUser className='signin-icon' /> Profil
                </button>
                {user && (
                  <img
                    ref={inputImgAvatar}
                    className='img-avatar-profil'
                    src={`${import.meta.env.VITE_URL_SPHERUS_API}/${user.url}`}
                    alt='avatar'
                    onError={() => {
                      inputImgAvatar.current.src =
                        'https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg';
                    }}
                  />
                )}
              </div>
            </NavLink>

            <NavLink to='/favorite'>
              <button
                className='btn btn-admin-panel'
                type='button'
                onClick={() => {
                  setIsBurgerClicked(false);
                }}
              >
                <FaRegStar className='signin-icon' /> Favorites
              </button>
            </NavLink>
          </div>

          <button
            className='btn btn-logout'
            type='button'
            onClick={() => {
              localStorage.removeItem('token');
              setIsBurgerClicked(false);
              navigate('/');
              window.location.reload();
            }}
          >
            <FaPowerOff className='logout-icon' /> Log out
          </button>
        </div>
      ) : (
        <div className='buttons'>
          <button
            className='btn btn-login'
            type='button'
            onClick={() => {
              handlePopUpLogIn();
              setIsBurgerClicked(false);
            }}
          >
            <FaUser className='login-icon' /> Log in
          </button>
          <NavLink to='/registration'>
            <button
              className='btn btn-signin'
              type='button'
              onClick={() => {
                setIsBurgerClicked(false);
              }}
            >
              <FaUserPlus className='signin-icon' /> Sign in
            </button>
          </NavLink>

          <NavLink to='#'>
            <button
              className='btn btn-why-signin'
              type='button'
              onClick={() => {
                handleRegisterPopUp();
                setIsBurgerClicked(false);
              }}
            >
              <FaQuestion className='why-signin-icon' />
              <p>Why sign in ?</p>
            </button>
          </NavLink>
        </div>
      )}

      {!size && <Toggle />}
    </div>
  );
}

export default MenuBurger;

MenuBurger.propTypes = {
  isBurgerClicked: PropTypes.bool,
  handlePopUpLogIn: PropTypes.func.isRequired,
  setIsBurgerClicked: PropTypes.func.isRequired,
  handleRegisterPopUp: PropTypes.func.isRequired,
};
