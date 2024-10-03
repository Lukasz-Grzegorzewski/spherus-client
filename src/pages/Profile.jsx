import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { FaPen } from 'react-icons/fa';
import Avatar from '../components/profile/Avatar';
import DeleteUser from '../components/profile/DeleteUser';
import UpdateUserByUser from '../components/profile/UpdateUserByUser';

function Profile({ iduser }) {
  const [user, setUser] = useState(null);

  const [firstnameUpdate, setFirstnameUpdate] = useState(false);
  const [lastnameUpdate, setLastnameUpdate] = useState(false);
  const [nicknameUpdate, setNicknameUpdate] = useState(false);
  const [birthdayUpdate, setBirthdayUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);

  const getUser = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/users/${iduser}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  }, [iduser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className='profile-conatainer'>
      {user && (
        <div>
          <Avatar
            id={iduser}
            getUser={() => getUser()}
            photoSrc={
              user.url
                ? `${import.meta.env.VITE_URL_SPHERUS_API}/${user.url}`
                : 'https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg'
            }
          />
          <div className='user-details-container'>
            <div className='fields-container'>
              <div className='field-user'>
                <h2 htmlFor=''>Firstname</h2>
                <p>{user.firstname}</p>
                <button
                  className='btn-update-toggle'
                  type='button'
                  aria-label='Edit firstname'
                  onClick={() => {
                    setFirstnameUpdate(!firstnameUpdate);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                >
                  <FaPen className='pen' />
                </button>
              </div>
              {firstnameUpdate && (
                <UpdateUserByUser
                  type='text'
                  keyName='firstname'
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setFirstnameUpdate}
                />
              )}
            </div>

            <div className='fields-container'>
              <div className='field-user'>
                <h2 htmlFor=''>Lastname</h2>
                <p>{user.lastname}</p>
                <button
                  className='btn-update-toggle'
                  type='button'
                  aria-label='Edit lastname'
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(!lastnameUpdate);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                >
                  <FaPen className='pen' />
                </button>
              </div>
              {lastnameUpdate && (
                <UpdateUserByUser
                  type='text'
                  keyName='lastname'
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setLastnameUpdate}
                />
              )}
            </div>

            <div className='fields-container'>
              <div className='field-user'>
                <h2 htmlFor=''>Nickname</h2>
                <p>{user.nickname}</p>
                <button
                  className='btn-update-toggle'
                  type='button'
                  aria-label='Edit nickname'
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(!nicknameUpdate);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                >
                  <FaPen className='pen' />
                </button>
              </div>
              {nicknameUpdate && (
                <UpdateUserByUser
                  type='text'
                  keyName='nickname'
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setNicknameUpdate}
                />
              )}
            </div>

            <div className='fields-container'>
              <div className='field-user'>
                <h2 htmlFor=''>Birthday</h2>
                <p>{user.birthday}</p>
                <button
                  className='btn-update-toggle'
                  type='button'
                  aria-label='Edit birthday'
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(!birthdayUpdate);
                    setEmailUpdate(false);
                    setPasswordUpdate(false);
                  }}
                >
                  <FaPen className='pen' />
                </button>
              </div>
              {birthdayUpdate && (
                <UpdateUserByUser
                  type='date'
                  keyName='birthday'
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setBirthdayUpdate}
                />
              )}
            </div>

            <div className='fields-container'>
              <div className='field-user'>
                <h2 htmlFor=''>Email</h2>
                <p>{user.email}</p>
                <button
                  className='btn-update-toggle'
                  type='button'
                  aria-label='Edit email'
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(!emailUpdate);
                    setPasswordUpdate(false);
                  }}
                >
                  <FaPen className='pen' />
                </button>
              </div>
              {emailUpdate && (
                <UpdateUserByUser
                  type='email'
                  keyName='email'
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setEmailUpdate}
                />
              )}
            </div>

            <div className='fields-container'>
              <div className='field-user'>
                <h2 htmlFor=''>Password</h2>
                <p>******</p>
                <button
                  className='btn-update-toggle'
                  type='button'
                  aria-label='Edit password'
                  onClick={() => {
                    setFirstnameUpdate(false);
                    setLastnameUpdate(false);
                    setNicknameUpdate(false);
                    setBirthdayUpdate(false);
                    setEmailUpdate(false);
                    setPasswordUpdate(!passwordUpdate);
                  }}
                >
                  <FaPen className='pen' />
                </button>
              </div>
              {passwordUpdate && (
                <UpdateUserByUser
                  type='password'
                  keyName='password'
                  id={iduser}
                  getUser={() => getUser()}
                  closeUpdateInput={setPasswordUpdate}
                />
              )}
            </div>
          </div>
        </div>
      )}
      <DeleteUser id={iduser} />
    </div>
  );
}

export default Profile;

Profile.propTypes = {
  iduser: PropTypes.number.isRequired,
};
