import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import AvatarPicPrompt from './AvatarPicPrompt';

function Avatar({ id, photoSrc, getUser }) {
  const [cardToggle, setCardToggle] = useState(false);
  const [url, setUrl] = useState(photoSrc);

  function handleClick() {
    setCardToggle(true);
    getUser();
    const pointToScroll = document.querySelector('.img-profile');
    pointToScroll.scrollIntoView();
  }

  useEffect(() => {
    function handleSetUrl() {
      setUrl(photoSrc);
    }
    if ((photoSrc && cardToggle) || !cardToggle) handleSetUrl();
  }, [photoSrc, cardToggle]);

  return (
    <div className='img-profile-container'>
      {url && <img className='img-profile' src={url} alt='profile img' />}
      <button
        className='btn-choose-pic'
        type='button'
        onClick={() => handleClick()}
      >
        <FaPen className='pen' />
      </button>
      {cardToggle && (
        <AvatarPicPrompt
          id={id}
          avatarUrl={url}
          getUser={() => getUser()}
          setUrl={setUrl}
          setCardToggle={setCardToggle}
        />
      )}
    </div>
  );
}

export default Avatar;

Avatar.propTypes = {
  photoSrc: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  getUser: PropTypes.func.isRequired,
};
