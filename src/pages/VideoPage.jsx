import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Share from '../components/share/Share';
import CategorySugestions from '../components/video_page/CategorySugestions';
import Video from '../components/video_page/Video';

function VideoPage() {
  const [video, setVideo] = useState(null);
  const [arrCatId, setArrCatId] = useState([]);
  const [arrCatName, setArrCatName] = useState([]);

  const { id } = useParams();

  const getArrayOfCategoriesByVideoId = useCallback((res) => {
    const arrCatIdTemp = [];
    const arrCatNameTemp = [];
    res.forEach((item) => {
      arrCatIdTemp.push(Number.parseInt(item.idCat, 10));
      arrCatNameTemp.push(item.cat);
    });

    setArrCatId(arrCatIdTemp);
    setArrCatName(arrCatNameTemp);
  }, []);

  const getVideo = useCallback(
    (idArg) => {
      axios
        .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/videos/cat/${idArg}`)
        .then((res) => {
          setVideo(res.data[0]);
          return res.data;
        })
        .then((result) => {
          getArrayOfCategoriesByVideoId(result);
        })
        .catch((err) => console.error(err));
    },
    [getArrayOfCategoriesByVideoId]
  );

  useEffect(() => {
    getVideo(id);
    window.scrollTo(0, 0);
  }, [id, getVideo]);
  return (
    <div className='video-container'>
      {video && arrCatId && arrCatName && (
        <div>
          <Video
            title={video.title}
            description={video.description}
            arrCatName={arrCatName}
            date={video.date}
            display={video.display}
            videoUrl={video.url}
          />
          <Share title={video.title} />
          <div className='section-container'>
            <CategorySugestions arrCatId={arrCatId} vidName={video.title} />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPage;
