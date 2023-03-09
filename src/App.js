// ***** import from packages *****
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

//*****  import from files *****
import Router from './router/Router'

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>

  )
}

export default App
