import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { FaPenFancy } from 'react-icons/fa';
import ChoiceHero from './ChoiceHero';

function ActuallyHeroSlider({ id, idVid, title, url, getHeroInfo }) {
  const videoUrl = `${import.meta.env.VITE_URL_SPHERUS_API}/${url}`;

  const [choice, setChoice] = useState(false);
  const [response, setResponse] = useState('');
  const [cat, setCat] = useState([]);

  const getCat = useCallback(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_URL_SPHERUS_API
        }/api/hero_slider/catname/${idVid}`
      )
      .then((res) => {
        setCat(res.data);
      });
  }, [idVid]);

  useEffect(() => {
    getCat();
  }, [getCat]);

  const deleteHero = () => {
    axios
      .delete(`${import.meta.env.VITE_URL_SPHERUS_API}/api/hero_slider/${id}`)
      .then((res) => {
        setResponse(res.data);
        getHeroInfo();
      });
  };

  const classButton = () => {
    if (choice === true) {
      return 'actuallyHeroSlider_btn_activ';
    }
    return 'actuallyHeroSlider_btn_inactiv';
  };

  return (
    <div className='actuallyHeroSlider'>
      <div className='actuallyHeroSlider_video'>
        <HoverVideoPlayer
          videoClassName='actuallyHeroSlider_video_player'
          videoSrc={videoUrl}
          muted
        />
      </div>
      <p className='actuallyHeroSlider_cat'>
        Category :{' '}
        {cat.length >= 1 &&
          cat
            .map((infos) => `${infos.name}, `)
            .join('')
            .slice(0, -2)}{' '}
      </p>
      <p className='actuallyHeroSlider_title'>Title : {title}</p>
      <div className='actuallyHeroSlider_btn'>
        <button
          className={classButton()}
          type='button'
          onClick={() => {
            setChoice(!choice);
          }}
        >
          Modify <FaPenFancy className='svg' />
        </button>
        <button
          className='deleteBtn hs_delete'
          type='button'
          onClick={() => {
            deleteHero();
          }}
        >
          Delete
        </button>
      </div>
      <div>
        {choice === true && (
          <ChoiceHero
            id={id}
            choice={choice}
            setChoice={setChoice}
            getHeroInfo={getHeroInfo}
            type={1}
          />
        )}
      </div>
      <p>{response}</p>
    </div>
  );
}

export default ActuallyHeroSlider;

ActuallyHeroSlider.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  idVid: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  getHeroInfo: PropTypes.func.isRequired,
};
