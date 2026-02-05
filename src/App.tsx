import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' // Use useNavigate instead
import './App.css'

function App() {

  const navigate = useNavigate();

  useEffect(() => {
   
    navigate('/Home');
  }, [navigate]); 

  return (
    <>
      <h1>Loader....</h1>
    </>
  )
}

export default App