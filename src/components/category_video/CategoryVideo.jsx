import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';
import VideoCard from './VideoCard';

function CategoryVideo() {
  const { id } = useParams();

  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideo = (idVideo) => {
      axios
        .get(
          `${
            import.meta.env.VITE_URL_SPHERUS_API
          }/api/videos/categories/${idVideo}`
        )
        .then((res) => {
          setVideo(res.data);
        });
    };
    getVideo(id);
  }, [id]);

  return (
    <div className='category_video'>
      <div className='category_video_main'>
        <div className='category_video_main_headerCtn'>
          <NavLink to='/' className='category_video_main_headerCtn_prevBtn'>
            <FaAngleLeft className='arrow' />
          </NavLink>
          <div className='category_video_main_headerCtn_name'>
            {video.length > 1 &&
              video[0].cat.charAt(0).toUpperCase() + video[0].cat.slice(1)}
          </div>
        </div>
        <div className='category_video_main_containerbis'>
          {video.map((e) => (
            <div key={e.id}>
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
    </div>
  );
}

export default CategoryVideo;
