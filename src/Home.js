import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>Welcome Home</h1>
      <p>This is the home page</p>
      <Link to="/login">login</Link>
    </div>
  )
}
