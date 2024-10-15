import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

function ChoiceHero({ id, getHeroInfo, choice, setChoice, type }) {
  const [cat, setCat] = useState([]);
  const [videos, setVideos] = useState([]);
  const [valueCat, setValueCat] = useState('');
  const [valueVideo, setValueVideo] = useState('');
  const [response, setResponse] = useState('');

  const getCat = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/categories`)
      .then((res) => {
        setCat(res.data);
      });
  }, []);

  const getVideos = useCallback(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_URL_SPHERUS_API
        }/videos/categories/${valueCat}`
      )
      .then((res) => {
        setVideos(res.data);
      });
  }, [valueCat]);

  const updateHero = () => {
    if (type === 1) {
      axios
        .put(`${import.meta.env.VITE_URL_SPHERUS_API}/hero_slider/${id}`, {
          fkVideo: `${valueVideo}`,
        })
        .then((res) => {
          getHeroInfo();
          setResponse(res.data);
          setChoice(!choice);
        });
    } else {
      axios
        .put(`${import.meta.env.VITE_URL_SPHERUS_API}/fixtures/${id}`, {
          fkFixVideoId: `${valueVideo}`,
        })
        .then((res) => {
          getHeroInfo();
          setResponse(res.data);
          setChoice(!choice);
        });
    }
  };

  const handleChange = (e) => {
    setValueCat(e.target.value);
  };
  const handleChange2 = (e) => {
    setValueVideo(e.target.value);
  };

  useEffect(() => {
    getCat();
  }, [getCat]);

  useEffect(() => {
    if (valueCat !== '') getVideos();
  }, [valueCat, getVideos]);

  return (
    <div className='choicehero'>
      <form className='choicehero_cat'>
        <label className='choicehero_cat_name' htmlFor='category-select'>
          Category name{' '}
          {cat.length > 1 && (
            <select
              className='choicehero_cat_name_select'
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
        <form className='choicehero_video'>
          <label className='choicehero_video_name' htmlFor='video-select'>
            Video name{' '}
            <select
              className='choicehero_video_name_select'
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
          className='submitBtn choicehero_btn'
          type='button'
          onClick={() => {
            updateHero();
          }}
        >
          <div className='svg-wrapper'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <title>UpdateHero Button</title>
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                fill='currentColor'
                d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
              />
            </svg>
          </div>
          <span>Apply</span>
        </button>
      )}
      <p>{response}</p>
    </div>
  );
}

export default ChoiceHero;

ChoiceHero.propTypes = {
  id: PropTypes.number.isRequired,
  getHeroInfo: PropTypes.func.isRequired,
  setChoice: PropTypes.func.isRequired,
  choice: PropTypes.bool.isRequired,
  type: PropTypes.number.isRequired,
};
