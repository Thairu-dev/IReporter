import React from 'react'
import { Link } from 'react-router-dom'
// import NavBar from './NavBar'

export default function Home() {
  return (
    <div>
      {/* <NavBar /> */}
      <h1>Welcome Home</h1>
      <p>This is the home page</p>
      <Link to={"/signup"} >Signup</Link>
      {/* <Link to="/login">login</Link> */}
    </div>
  )
}
