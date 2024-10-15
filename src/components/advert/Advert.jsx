import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function Advert({ id }) {
  const [pub, setPub] = useState([]);

  const urlImg = `${import.meta.env.VITE_URL_SPHERUS_API}${pub.url_image}`;

  useEffect(() => {
    const getPub = (idAdvert) => {
      axios
        .get(
          `${import.meta.env.VITE_URL_SPHERUS_API}/publicities/${idAdvert}`
        )
        .then((res) => {
          setPub(res.data);
        });
    };
    getPub(id);
  }, [id]);

  return (
    <div className='pub'>
      <div className='pub_box'>
        <a className='pub_box_link' href={pub.url_link}>
          <img className='pub_box_link_img' src={urlImg} alt={pub.name} />
        </a>

        <div className='pub_box_text'>
          <p className='pub_box_text_name'>{pub.name}</p>
          <p className='pub_box_text_desc'>{pub.description}</p>
          <a href={pub.url_link}>
            <button type='button' className='cssbuttons-io-button'>
              {' '}
              Go to
              <div className='icon'>
                <svg
                  height='24'
                  width='24'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Go to button pub's external link</title>
                  <path d='M0 0h24v24H0z' fill='none' />
                  <path
                    d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'
                    fill='currentColor'
                  />
                </svg>
              </div>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Advert;

Advert.propTypes = {
  id: PropTypes.number.isRequired,
};
