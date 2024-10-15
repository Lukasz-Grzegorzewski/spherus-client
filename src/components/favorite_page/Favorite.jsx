import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import VideoCard from '../category_video/VideoCard';

function Favorite() {
  const { id } = useContext(UserContext);

  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const getFavorite = (idContext) => {
      axios
        .get(
          `${import.meta.env.VITE_URL_SPHERUS_API}/favorites/${idContext}`
        )
        .then((res) => {
          const uniqueArr = res.data.reduce((acc, current) => {
            const x = acc.find((item) => item.id === current.id);
            if (!x) {
              return acc.concat([current]);
            }
            return acc;
          }, []);
          setFavorite(uniqueArr);
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            // Handle 404 error
          } else {
            console.error(error);
          }
        });
    };

    getFavorite(id);
  }, [id]);

  const navigate = useNavigate();

  return (
    <div>
      <div className='category_video_main_container'>
        <button
          type='button'
          className='prevBtn'
          aria-label='prevBtn'
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaAngleLeft className='arrow' />
        </button>

        {favorite.map((e) => (
          <div className='category_video_main_container_title' key={e.id}>
            {e.catName}
            <VideoCard
              id={e.id}
              url={e.url}
              title={e.title}
              description={e.description}
              display={e.display}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;
