import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import PopupAddComponent from './PopupAddComponent';

function AdminHomeAddPub({ setAddPub, setAddSection, getHome }) {
  const [pub, setPub] = useState([]);
  const [idPub, setIdPub] = useState();
  const [check, setCheck] = useState(false);

  const getPub = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/publicities`)
      .then((res) => {
        setPub(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getPub();
  }, [getPub]);

  const handleChange = (e) => {
    setIdPub(e.target.value);
  };

  const addComp = () => {
    axios
      .post(`${import.meta.env.VITE_URL_SPHERUS_API}/api/home`, {
        position: 0,
        type: 2,
        idLink: `${idPub}`,
      })
      .then(() => {
        setCheck(true);
        getHome();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className='adminHomeAddSection'>
      {pub.length >= 1 && check === false && (
        <form className='adminHomeAddSection_form'>
          <label
            className='adminHomeAddSection_form_label'
            htmlFor='category-select'
          >
            Choose the advertising to link
            <br />
            <select
              className='adminHomeAddSection_form_label_select'
              id='publicity-select'
              onChange={handleChange}
            >
              <option value=''>---</option>
              {pub.map((infos) => {
                return (
                  <option key={infos.id} value={infos.id}>
                    {infos.name}
                  </option>
                );
              })}
            </select>
          </label>
          {idPub !== undefined && (
            <button
              className='submitBtn'
              type='button'
              onClick={() => {
                addComp();
              }}
            >
              <div className='svg-wrapper'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <title>Add pub</title>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    fill='currentColor'
                    d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'
                  />
                </svg>
              </div>
              <span>Apply</span>
            </button>
          )}
        </form>
      )}
      {check === true && (
        <PopupAddComponent
          setAddPub={setAddPub}
          setAddSection={setAddSection}
        />
      )}
    </div>
  );
}

export default AdminHomeAddPub;

AdminHomeAddPub.propTypes = {
  setAddPub: PropTypes.func.isRequired,
  setAddSection: PropTypes.func.isRequired,
  getHome: PropTypes.func.isRequired,
};
