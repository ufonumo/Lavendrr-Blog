import React from 'react'
import { useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import HomePage from './components/HomePage'
import NavHome from './components/NavHome'
import { selectSignedIn } from './features/userSlice'

const App = () => {

  const isSignedIn =  useSelector(selectSignedIn)

  return (
    <div>
      <NavHome/>
      <HomePage/> 
      { isSignedIn && <Blogs/>}
    </div>
  )
}

export default App
