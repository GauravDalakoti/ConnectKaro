import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const [loading, setLoading] = useState(false);

  const isLiked = likes.includes(user?.id);
  const likesCount = likes.length;

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await api.post(`/posts/${post._id}/like`);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error liking post:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">

      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium">
            {post.author?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <Link
            to={`/profile/${post.author._id}`}
            className="font-medium text-gray-900 hover:text-blue-600"
          >
            {post.author.name}
          </Link>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${isLiked
            ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
            : 'text-gray-600 hover:bg-gray-100'
            } disabled:opacity-50`}
        >
          <svg
            className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"

              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="text-sm font-medium">
            {likesCount > 0 ? likesCount : 'Like'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;