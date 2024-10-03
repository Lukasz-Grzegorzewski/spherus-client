import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

function AddHero({ getHeroInfo, add, setAdd }) {
  const [cat, setCat] = useState([]);
  const [valueCat, setValueCat] = useState('');
  const [videos, setVideos] = useState([]);
  const [valueVideo, setValueVideo] = useState('');

  const getCat = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/categories`)
      .then((res) => {
        setCat(res.data);
      });
  }, []);

  useEffect(() => {
    getCat();
  }, [getCat]);

  const getVideos = useCallback(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_URL_SPHERUS_API
        }/api/videos/categories/${valueCat}`
      )
      .then((res) => {
        setVideos(res.data);
      });
  }, [valueCat]);

  useEffect(() => {
    if (valueCat !== '') getVideos();
  }, [valueCat, getVideos]);

  const updateHero = () => {
    axios
      .post(`${import.meta.env.VITE_URL_SPHERUS_API}/api/hero_slider`, {
        fkVideo: `${valueVideo}`,
      })
      .then((res) => {
        console.warn(res.data);
        getHeroInfo();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setValueCat(e.target.value);
  };

  const handleChange2 = (e) => {
    setValueVideo(e.target.value);
  };

  return (
    <div className='addhero'>
      <h1 className='addhero_title'>Add new video</h1>
      <form className='addhero_cat'>
        <label className='addhero_cat_name' htmlFor='category-select'>
          Category name{' '}
          {cat.length > 1 && (
            <select
              className='addhero_cat_name_select'
              id='category-select'
              onChange={handleChange}
            >
              <option value=''>---</option>
              {cat.map((infos) => {
                return (
                  <option key={infos.id} value={infos.id}>
                    {infos.name}
                  </option>
                );
              })}
            </select>
          )}
        </label>
      </form>
      {videos.length > 1 && (
        <form className='addhero_video'>
          <label className='addhero_video_name' htmlFor='video-select'>
            Video name{' '}
            <select
              className='addhero_video_name_select'
              id='video-select'
              onChange={handleChange2}
            >
              <option value=''>---</option>
              {videos.map((infos) => {
                return (
                  <option key={infos.id} value={infos.id}>
                    {infos.title}
                  </option>
                );
              })}
            </select>
          </label>
        </form>
      )}
      {valueVideo !== '' && (
        <button
          className='addhero_button'
          type='button'
          onClick={() => {
            updateHero();
            setAdd(!add);
          }}
        >
          <div className='svg-wrapper-1'>
            <div className='svg-wrapper'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <title>updateHero button</title>
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  fill='currentColor'
                  d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                />
              </svg>
            </div>
          </div>
          <span>Apply</span>
        </button>
      )}
      <div className='adminad_separate' />
    </div>
  );
}

export default AddHero;

AddHero.propTypes = {
  getHeroInfo: PropTypes.func.isRequired,
  setAdd: PropTypes.func.isRequired,
  add: PropTypes.bool.isRequired,
};
