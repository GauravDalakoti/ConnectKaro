import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import api from '../services/api';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');

  const isOwnProfile = currentUser?.id === userId;

  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
      setBio(response.data.bio || '');
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/user/${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
    setLoading(false);
  };

  const handleBioUpdate = async () => {
    try {
      await api.put(`/users/${userId}`, { bio });
      setUser({ ...user, bio });
      setEditing(false);
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">User not found</h2>
          <p className="text-gray-600 mt-2">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start space-x-4">
      
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            
         
            <div className="mt-4">
              {editing ? (
                <div className="space-y-2">
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    maxLength="500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleBioUpdate}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setBio(user.bio || '');
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-2">
                    {user.bio || 'No bio available.'}
                  </p>
                  {isOwnProfile && (
                    <button
                      onClick={() => setEditing(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {user.bio ? 'Edit Bio' : 'Add Bio'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
   
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex space-x-8">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{posts.length}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">
                {new Date(user.createdAt).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <div className="text-sm text-gray-600">Joined</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isOwnProfile ? 'Your Posts' : `${user.name}'s Posts`}
        </h2>
        
        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {isOwnProfile ? "You haven't posted anything yet." : "No posts yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;