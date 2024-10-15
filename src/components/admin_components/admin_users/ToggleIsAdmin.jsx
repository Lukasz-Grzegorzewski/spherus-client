import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

function ToggleIsAdmin({ id }) {
  const [isChecked, setIsChecked] = useState(false);

  const getUserById = useCallback(
    (uid) => {
      axios
        .get(`${import.meta.env.VITE_URL_SPHERUS_API}/users/${uid}`)
        .then((res) => {
          setIsChecked(res.data.is_admin !== 0);
        })
        .catch((err) => console.error(err));
    },
    []
  );

  function handleToggle() {
    axios
      .patch(`${import.meta.env.VITE_URL_SPHERUS_API}/users/${id}`, {
        isAdmin: isChecked ? 0 : 1,
      })
      .then(() => {
        getUserById(id);
        console.warn('user updated');
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getUserById(id);
  }, [id, getUserById]);

  return (
    <div className='toggle-is-admin-container'>
      <input
        className='toggle'
        id='checkadmin'
        type='checkbox'
        onChange={() => handleToggle()}
        checked={isChecked}
      />
      <label htmlFor='checkadmin' className='label-input-isAdmin'>
        Admins
      </label>
    </div>
  );
}

export default ToggleIsAdmin;

ToggleIsAdmin.propTypes = {
  id: PropTypes.number.isRequired,
};
