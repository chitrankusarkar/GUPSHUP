import "./App.css"
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom';

function App() {
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