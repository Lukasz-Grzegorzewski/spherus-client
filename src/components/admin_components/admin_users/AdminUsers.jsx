// import PropTypes from "prop-types";
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Profile from '../../../pages/Profile';
import ToggleIsAdmin from './ToggleIsAdmin';
import Users from './Users';

function AdminUsers() {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('all');
  const [userId, setUserId] = useState(null);

  const filteredUsers = users?.filter((item) => {
    if (selected === 'users')
      return (
        item.email.toLowerCase().includes(query.toLowerCase()) &&
        item.is_admin === 0
      );
    if (selected === 'admins')
      return (
        item.email.toLowerCase().includes(query.toLowerCase()) &&
        item.is_admin === 1
      );
    return item.email.toLowerCase().includes(query.toLowerCase());
  });

  const getUserById = (uId) => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/users/${uId}`)
      .then(async (res) => {
        await setUser(res.data);
      })
      .catch((err) => console.error(err));
  };

  const getUsers = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_URL_SPHERUS_API}/api/users`)
      .then((res) => {
        if (typeof selected === 'string') setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, [selected]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  function handleChange(e) {
    setSelected(e.target.value);
  }

  return (
    <div className='admin-users-container'>
      <div className='users-admins-choice-container'>
        <label className='label-users-admins'>
          <input
            className='input'
            type='radio'
            name='choice'
            value='users'
            onChange={(e) => handleChange(e)}
            checked={selected === 'users'}
          />
          Users
        </label>
        <label className='label-users-admins'>
          <input
            className='input'
            type='radio'
            name='choice'
            value='admins'
            onChange={(e) => handleChange(e)}
            checked={selected === 'admins'}
          />
          Admins
        </label>
        <label className='label-users-admins'>
          <input
            className='input'
            type='radio'
            name='choice'
            value='all'
            onChange={(e) => handleChange(e)}
            checked={selected === 'all'}
          />
          All
        </label>
        <div className='label-users-admins'>
          <a
            href={`${import.meta.env.VITE_URL_SPHERUS_API}/export`}
            target='_blank'
            rel='noreferrer'
          >
            Export CSV
          </a>
        </div>
      </div>
      <input
        className='input-search'
        value={query}
        type='search'
        placeholder='Search user by Email'
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className='users-table-container'>
        <div className='headers'>Emails</div>
        <div className='users-table'>
          {users &&
            filteredUsers.map((us) => {
              return (
                <Users
                  key={us.id}
                  selected={selected}
                  id={us.id}
                  email={us.email}
                  setUserId={setUserId}
                  getUserById={(uid) => getUserById(uid)}
                />
              );
            })}
        </div>
      </div>
      {user && userId && (
        <div className='user-block'>
          <ToggleIsAdmin id={Number(userId)} />
          <Profile iduser={Number(userId)} />
        </div>
      )}
    </div>
  );
}

export default AdminUsers;

// AdminUsers.propTypes = {
//   id: PropTypes.number.isRequired,
// };
