import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import secureLocalStorage from 'react-secure-storage';
import PassUpdate from './PassUpdate';

const Profile = () => {
  const [userdata, setuserdata] = useState(null); // Initially null, not an empty array
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const EmailUser = secureLocalStorage.getItem('email');
  const RoleUser = secureLocalStorage.getItem('role');
  const UserName = secureLocalStorage.getItem('username');

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_API + '/auth.php', {
        params: {
          action: 'getuserbyemail',
          userID: EmailUser,
        },
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.data.Result) {
          setuserdata(res.data.Result);
        } else {
          setuserdata(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load user data');
        setuserdata(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [EmailUser]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className='mt-4'>
      <div className="flex">
        <div className="">
          <div className="inline-block p-2 bg-[#560606] rounded">
            <FaUser className='h-6 w-auto fill-white' />
          </div>
        </div>
        <div className="pl-4">
          <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Profile</h1>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl shadow-xl">
        <table className='w-full'>
          <tbody>
            <tr className='border-b border-gray-200 h-12 text-gray-500' key="username-row">
              <td className='font-semibold'>Username</td>
              <td className=''>{userdata?.username || 'N/A'}</td> 
            </tr>
            <tr className='border-b border-gray-200 h-12 text-gray-500' key="username-row">
              <td className='font-semibold'>Email</td>
              <td className=''>{userdata?.email || 'N/A'}</td> 
            </tr>
            <tr className='border-b border-gray-200 h-12 text-gray-500' key="username-row">
              <td className='font-semibold'>Faculty</td>
              <td className=''>{userdata?.Faculty || 'N/A'}</td> 
            </tr>
          </tbody>
        </table>
      </div>

      <PassUpdate />
    </div>
  );
};

export default Profile;
