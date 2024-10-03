import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import { CiLock } from 'react-icons/ci';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

function VideoCard({ id, url, title, display }) {
  const videoUrl = `${import.meta.env.VITE_URL_SPHERUS_API}${url}`;
  const [favBtn, setFavBtn] = useState(false);
  const token = useContext(UserContext);

  const btn = useCallback((data) => {
    if (data.find((el) => el.id === id)) {
      setFavBtn(true);
    } else {
      setFavBtn(false);
    }
  }, [id]);

  useEffect(() => {
    const getFavorite = async (tokenContext) => {
      try {
        const favorites = await axios.get(
          `${import.meta.env.VITE_URL_SPHERUS_API}/api/favorites/${
            tokenContext.id
          }`
        );
        if (favorites.data.length > 0) btn(favorites.data);
      } catch (error) {
        if (error?.response?.status === 404) {
          // Do nothing
        } else {
          console.error(error);
        }
      }
    };
    getFavorite(token);
  }, [token, btn]);

  const setFavorite = () => {
    if (favBtn === false) {
      axios
        .post(`${import.meta.env.VITE_URL_SPHERUS_API}/api/favorites`, {
          userId: token.id,
          videoFavId: id,
        })
        .then(() => {
          setFavBtn(true);
        })
        .catch(() => {
          console.error('not added to favorites');
        });
    } else if (favBtn === true) {
      axios
        .delete(`${import.meta.env.VITE_URL_SPHERUS_API}/api/favorites/${id}`)
        .then(() => {
          setFavBtn(false);
        })
        .catch(() => {
          console.error('not deleted from favorites');
        });
    }
  };

  return (
    <div className='videoCard'>
      {token.userToken !== '' && (
        <div className='main'>
          <button
            type='button'
            className='videocard_fav_btn'
            onClick={setFavorite}
          >
            {favBtn ? (
              <FaStar className='videocard_fav_btn_on' />
            ) : (
              <FaRegStar className='videocard_fav_btn_off' />
            )}
          </button>
          <NavLink to={`/video/${id}`}>
            <div className='videocard'>
              <HoverVideoPlayer
                videoClassName='videocard_video'
                videoSrc={videoUrl}
                muted
                // preload="none"
                playbackRangeStart={0}
                playbackRangeEnd={6}
              />

              <div className='videocard_video_description'>
                <div>{title}</div>
                {/* <div>{description}</div> */}
              </div>
            </div>
          </NavLink>
        </div>
      )}
      {token.userToken === '' && display === 1 && (
        <div className='main'>
          <button
            type='button'
            className='videocard_fav_btn'
            onClick={setFavBtn}
          >
            {favBtn ? (
              <div className='videocard_fav_btn_on'>
                Vous devez être inscrit
              </div>
            ) : (
              <FaRegStar className='videocard_fav_btn_off' />
            )}
          </button>
          <NavLink to={`/video/${id}`}>
            <div className='videocard'>
              <HoverVideoPlayer
                videoClassName='videocard_video'
                className='videocard_video'
                videoSrc={videoUrl}
                muted
                playbackRangeStart={0}
                playbackRangeEnd={6}
              />

              <div className='videocard_video_description'>
                <div>{title}</div>
              </div>
            </div>
          </NavLink>
        </div>
      )}
      {token.userToken === '' && display !== 1 && (
        <div>
          <NavLink to={`/video/${id}`}>
            <div className='videocard_veil'>
              <HoverVideoPlayer
                videoClassName='videocard_veil_video'
                className='videocard_veil_video'
                videoSrc={videoUrl}
                muted
                playbackRangeStart={0}
                playbackRangeEnd={6}
              />
              <CiLock className='videocard_veil_lock' />

              <div className='videocard_veil_video_description'>
                <div>{title}</div>
              </div>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  );
}

VideoCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  display: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default VideoCard;
