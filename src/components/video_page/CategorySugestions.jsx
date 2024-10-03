import axios from 'axios';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';

const VideoCard = lazy(() => import('../category_video/VideoCard'));

function CategorySugestions({ arrCatId, vidName }) {
  const [video, setVideo] = useState([]);

  const getVideo = useCallback(
    async (ids) => {
      const results = [];

      await Promise.all(
        ids.map(async (catId) => {
          try {
            const response = await axios.get(
              `${
                import.meta.env.VITE_URL_SPHERUS_API
              }/api/videos/categories/${catId}`
            );
            results.push(...response.data);
          } catch (error) {
            console.error(error);
          }
        })
      );
      const uniqueArr = results.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        }
        return acc;
      }, []);

      const shuffledArray = uniqueArr.sort(() => 0.5 - Math.random());
      setVideo([...shuffledArray]);
      return shuffledArray;
    },
    []
  );

  useEffect(() => {
    getVideo(arrCatId);
  }, [arrCatId, getVideo]);

  return (
    <div className='category_sugestions'>
      <Suspense
        fallback={
          <div className='loader-container'>
            <div className='spinner' />
            <p>Loading</p>
          </div>
        }
      >
        <div className='category_sugestions_videos'>
          <p className='category_sugestions_heading'>
            {`You like "${vidName}" ? We suggest these other videos`}
          </p>
          <div className='category_sugestions_videos_container'>
            {video.length > 0 &&
              video.map((e) => (
                <VideoCard
                  key={e.id}
                  id={e.id}
                  url={e.url}
                  title={e.title}
                  description={e.description}
                  display={e.display}
                />
              ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default CategorySugestions;

CategorySugestions.propTypes = {
  vidName: PropTypes.string.isRequired,
  arrCatId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
