import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.get('/users/show-data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setIsAuthenticated(true)
        setUserName(response.data.name)
      } catch (error) {
        setIsAuthenticated(false)
        setUserName('')
      }
    }

    checkAuthentication()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUserName('')
    navigate('/')
  }

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('recipes/')
        const sortedRecipes = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)
        setRecipes(sortedRecipes)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    }

    fetchRecipes()
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState('')

  const handleSearch = async () => {
    try {
      const response = await api.get(`/recipes?search=${searchQuery}`)
      setSearchResults(response.data)
    } catch (error) {
      setError('Error al buscar recetas')
    }
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div>
      <nav>
        <div>
          <Link to="/">FlavorFeed</Link>
        </div>
        <div>
          {isAuthenticated ? (
            <span>
              Hola, <Link to="/profile">{userName}</Link> | <button onClick={handleLogout}>Cerrar Sesión</button> | <button onClick={() => navigate('/create-recipe')}>+</button>
            </span>
          ) : (
            <Link to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </nav>
      <h1>Bienvenido a FlavorFeed</h1>
      <h2>Recetas más recientes:</h2>
      <ul>
        {recipes.map(recipe => (
          <div>
            <h3><Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link></h3>
            <p>{recipe.description}</p>
          </ div>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {searchResults.map(recipe => (
          <div key={recipe._id}>
            <h2><Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link></h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
