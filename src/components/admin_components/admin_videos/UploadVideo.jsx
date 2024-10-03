import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import PopupVideo from './PopupVideo';

function UploadVideo({ getVideo }) {
  const [file, setFile] = useState({});
  const [check, setCheck] = useState(false);

  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    display: '',
    date: new Date().toISOString().split('T')[0],
  });

  const clearInput = () => {
    setVideoDetails({
      title: '',
      description: '',
      display: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const uploadVideo = (data) => {
    axios
      .post(`${import.meta.env.VITE_URL_SPHERUS_API}/api/videos`, data)
      .then(() => {
        setCheck(true);
        clearInput();
        getVideo();
      })
      .catch(() => {
        console.error('video not uploaded');
      });
  };

  const [categoryLink, setCategoryLink] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', videoDetails.title);
    data.append('description', videoDetails.description);
    data.append('display', videoDetails.display);
    data.append('date', videoDetails.date);
    data.append('categoryId', categoryLink);
    data.append('file', file);
    uploadVideo(data);
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const choseCategory = () => {
      axios
        .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/categories`)
        .then((res) => {
          setCategory(res.data);
        })
        .catch(() => {
          console.error('category not found');
        });
    };
    choseCategory();
  }, []);

  useEffect(() => {
    const linkCategory = () => {
      axios
        .post(`${import.meta.env.VITE_URL_SPHERUS_API}/api/category/video`)
        .catch(() => {
          console.error('video not uploaded');
        });
    };
    linkCategory();
  }, []);

  return (
    <div>
      <div className='adminvideo_file_title'>Upload a video</div>
      {check === false ? (
        <form action='' onSubmit={handleUpload} className='upload_video'>
          <div className='adminvideo_file_container'>
            <input
              className='adminvideo_file_input'
              type='file'
              id='file'
              name='file'
              accept='.mp4'
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div className='adminvideo_fields_input'>
            <label htmlFor='title'>Video title</label>
            <input
              type='text'
              id='title'
              value={videoDetails.title}
              placeholder='Enter the video title'
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, title: e.target.value })
              }
            />

            <label htmlFor='description'>Video description</label>
            <input
              type='text'
              id='description'
              value={videoDetails.description}
              placeholder='Enter the video description'
              onChange={(e) =>
                setVideoDetails({
                  ...videoDetails,
                  description: e.target.value,
                })
              }
            />

            <label htmlFor='display'>Display video? </label>
            <select
              className='display'
              id='display'
              value={videoDetails.display}
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, display: e.target.value })
              }
            >
              <option value='0'>locked</option>
              <option value='1'>available</option>
            </select>

            <label htmlFor='date'>Date of upload</label>
            <input
              type='date'
              value={videoDetails.date}
              id='date'
              placeholder='date of upload'
              onChange={(e) =>
                setVideoDetails({ ...videoDetails, date: e.target.value })
              }
            />
            <label htmlFor='category'>Chose a category for the video</label>
            <select
              id='category'
              onChange={(e) => setCategoryLink(e.target.value)}
            >
              <option value=''>---</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              className='submitBtn update_video_form_btn'
              type='submit'
              value='Upload'
            >
              <div className='svg-wrapper'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <title>Submit button</title>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    fill='currentColor'
                    d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                  />
                </svg>
              </div>
              <span>Apply</span>
            </button>
          </div>
        </form>
      ) : (
        <div>
          <PopupVideo setCheck={setCheck} />
        </div>
      )}
    </div>
  );
}
UploadVideo.propTypes = {
  getVideo: PropTypes.func.isRequired,
};
export default UploadVideo;
