import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import { getOtherUsersThunk, getUserProfileThunk } from "./store/slice/user/user.thunk.js"
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {
  const dispatch = useDispatch()
  const { screenLoading } = useSelector(state => state.userReducer)

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk())
      await dispatch(getOtherUsersThunk())
    })()
  }, [])

  if (screenLoading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-900 text-white animate-fadeIn">
        <h1 className="text-4xl font-bold">GUPSHUP</h1>
        <p className="text-lg mt-2">Your personalized chat experience</p>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-center" />
      <Outlet />
    </>
  )
}
export default App
