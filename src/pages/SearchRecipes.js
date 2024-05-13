import React, { useState } from 'react'
import api from '../services/api'

const SearchRecipes = () => {
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
      <h1>Buscar Recetas</h1>
      <input
        type="text"
        placeholder="Buscar recetas..."
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {searchResults.map(recipe => (
          <div key={recipe._id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchRecipes