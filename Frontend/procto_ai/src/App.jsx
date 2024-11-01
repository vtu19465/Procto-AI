import { useState } from 'react'
import LoginForm from './components/loginForm'
import Navbar from './components/navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <Navbar/>
         <LoginForm/>
      </div>
    </>
  )
}

export default App
