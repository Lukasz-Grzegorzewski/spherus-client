import axios from 'axios';
import PropTypes from 'prop-types';
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import AvatarUrlContext from '../../../contexts/AvatarUrlContext';
import UserContext from '../../../contexts/UserContext';
import MenuBurger from '../menus/MenuBurger';
import MenuSearch from '../menus/MenuSearch';
import Toggle from '../menus/Toggle';

function navbarDesktop({ handlePopUpLogIn, handleRegisterPopUp }) {
  const [isLoopClicked, setIsLoopClicked] = useState(false);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const [user, setUser] = useState(null);
  const inputImgAvatar = useRef();

  const { id } = useContext(UserContext);
  const { avatarUrlContext } = useContext(AvatarUrlContext);

  const getUser = useCallback((idUserContext) => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/users/${idUserContext}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getUser(id);
  }, [id, getUser]);

  useEffect(() => {
    if(avatarUrlContext) getUser(id);
  }, [avatarUrlContext, id, getUser]);

  return (
    <div className='navbar-desktop'>
      {isLoopClicked ? (
        <MenuSearch setIsLoopClicked={() => setIsLoopClicked()} />
      ) : (
        <button
          className='btn-svg'
          type='button'
          aria-label='Search'
          onClick={() => setIsLoopClicked(true)}
        >
          <svg
            className='loop'
            xmlns='http://www.w3.org/2000/svg'
            width='50px'
            height='50px'
            fill='currentColor'
            viewBox='0 0 16 20'
          >
            <title>Loop icon button</title>
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        </button>
      )}
      <div className='toggle-input'>
        <Toggle />
      </div>
      <button
        className='btn-img-avatar'
        type='button'
        onClick={() => setIsBurgerClicked(!isBurgerClicked)}
      >
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
      </button>
      {isBurgerClicked && (
        <MenuBurger
          isBurgerClicked={isBurgerClicked}
          setIsBurgerClicked={() => setIsBurgerClicked()}
          handlePopUpLogIn={() => handlePopUpLogIn()}
          handleRegisterPopUp={() => handleRegisterPopUp()}
        />
      )}
    </div>
  );
}

export default navbarDesktop;

navbarDesktop.propTypes = {
  handlePopUpLogIn: PropTypes.func.isRequired,
  handleRegisterPopUp: PropTypes.func.isRequired,
};
