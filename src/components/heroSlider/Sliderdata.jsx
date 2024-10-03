import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { Link } from 'react-router-dom';

function Sliderdata({ id, title, date, url }) {
  const year = date?.substring(0, 7);

  const videoUrl = `${import.meta.env.VITE_URL_SPHERUS_API}/${url}`;

  const [cat, setCat] = useState([]);

  useEffect(() => {
    const getCat = (idInfos) => {
      axios
        .get(
          `${
            import.meta.env.VITE_URL_SPHERUS_API
          }/api/hero_slider/catname/${idInfos}`
        )
        .then((res) => {
          setCat(res.data);
        });
    };
    getCat(id);
  }, [id]);

  return (
    <div className='sliderdata'>
      <div className='sliderdata_video'>
        <HoverVideoPlayer
          videoClassName='sliderdata_video'
          className='sliderdata_video'
          videoSrc={videoUrl}
          muted
          playbackRangeStart={0}
          playbackRangeEnd={6}
        />
      </div>
      <div className='sliderdata_infos'>
        <div className='sliderdata_infos_box'>
          <p className='sliderdata_infos_box_title'>{title} </p>
          <p className='sliderdata_infos_box_name'>{year}</p>
          <p className='sliderdata_infos_box_cat'>
            Category :{' '}
            {cat.length >= 1 &&
              cat
                .map((infos) => `${infos.name}, `)
                .join('')
                .slice(0, -2)}{' '}
          </p>
        </div>
        <Link to={`/video/${id}`}>
          <button type='button' className='cssbuttons-io-button'>
            {' '}
            Watch
            <div className='icon'>
              <svg
                height='24'
                width='24'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Watch button</title>
                <path d='M0 0h24v24H0z' fill='none' />
                <path
                  d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sliderdata;

Sliderdata.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
