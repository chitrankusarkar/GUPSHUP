import "./App.css"
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getOtherUsersThunk, getUserProfileThunk } from "./store/slice/user/user.thunk.js";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk())
      await dispatch(getOtherUsersThunk())
    })()
  }, [])

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Outlet />
    </div>
  )
}

export default App;