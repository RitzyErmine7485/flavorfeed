// src/components/Navbar.js
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ isAuthenticated, userName, logout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav>
      <div>
        <Link to="/">FlavorFeed</Link>
      </div>
      <div>
        {isAuthenticated ? (
          <span>Hola, {userName} | <button onClick={handleLogout}>Cerrar Sesión</button></span>
        ) : (
          <Link to="/login">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
