// LogOut.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/user/userSlice';

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logOut())
    navigate('/signin');
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Logging Out...</h1>
        <p className="text-gray-600 mt-4">You are being logged out. Please wait...</p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          onClick={() => navigate('/signin')}
        >
          Return to Sign In
        </button>
      </div>
    </div>
  );
};

export default LogOut;