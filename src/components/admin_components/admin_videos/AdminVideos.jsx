import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import DeleteVideo from './DeleteVideo';
import UpdateVideo from './UpdateVideo';
import UploadVideo from './UploadVideo';

function AdminVideos() {
  const [video, setVideo] = useState([]);

  const getVideo = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/videos`)
      .then((res) => {
        setVideo(res.data);
      })

      .catch(() => {
        console.error('video not found');
      });
  }, []);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  return (
    <div className='adminvideo_container'>
      <div>
        <UploadVideo getVideo={getVideo} />
        <DeleteVideo video={video} getVideo={getVideo} />
        <UpdateVideo video={video} getVideo={getVideo} />
      </div>
    </div>
  );
}

export default AdminVideos;
