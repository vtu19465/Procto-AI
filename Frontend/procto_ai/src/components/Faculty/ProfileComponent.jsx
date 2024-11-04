import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultProfilePic from '../../assets/default-pfp.jpg';

function ProfileComponent() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = JSON.parse(localStorage.getItem('creds'));

        const response = await axios.post('http://localhost:3000/api/users', {
          username: username.username,
        });
        
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-5">{error}</div>;

  return (
    <div className="container mx-auto p-5 max-w-lg">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <div className="flex flex-col items-center">
          <img 
            src={DefaultProfilePic} 
            alt="Profile" 
            className="rounded-full w-32 h-32 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1 text-gray-700">
            {profile.name}
          </h2>
          <p className="text-gray-500">{profile.email_id}</p>
          <p className="text-gray-500">Role: {profile.role}</p>
        </div>
        <div className="mt-5">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Profile Details</h3>
          <div className="border-t border-gray-300 pt-3">
            <p><strong>ID:</strong> {profile.id}</p>
            <p><strong>Email:</strong> {profile.email_id}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
