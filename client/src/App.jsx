import { Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./pages/auth/login"
import Signup from "./pages/auth/signup"
import Home from "./pages/home/home"

function App() {
  return (
    <>
      <Routes>
        <Route path=" /" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </>
  )
}

export default App