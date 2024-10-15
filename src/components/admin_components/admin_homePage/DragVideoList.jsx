import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

function DragVideoList({ id }) {
  const [videoName, setVideoName] = useState([]);
  const [show, setShow] = useState(false);

  const getVideoName = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/home/carousel/${id}`)
      .then((res) => {
        setVideoName(res.data);
        setShow(true);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    getVideoName();
  }, [getVideoName]);

  return (
    <div className='dragVideoList'>
      {videoName.length >= 1 && show === true && (
        <div className='dragVideoList_box'>
          {videoName.map((infos) => {
            return (
              <p key={infos.id} className='dragVideoList_box_text'>
                {infos.title}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DragVideoList;

DragVideoList.propTypes = {
  id: PropTypes.number.isRequired,
};
