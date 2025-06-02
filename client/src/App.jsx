import "./App.css";
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getOtherUsersThunk, getUserProfileThunk } from "./store/slice/user/user.thunk.js";

function App() {
  const dispatch = useDispatch();
  const { screenLoading } = useSelector(state => state.userReducer);
  const [authChecked, setAuthChecked] = useState(false); // ⏳ wait for auth before routing

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
      await dispatch(getOtherUsersThunk());
      setAuthChecked(true);
    })();
  }, []);

  if (screenLoading || !authChecked) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white animate-fadeIn">
        <h1 className="text-4xl font-bold">GUPSHUP</h1>
        <p className="text-lg mt-2">Your personalized chat experience</p>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </div>
  );
}

export default App;
