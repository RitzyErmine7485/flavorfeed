import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const RecipeDetails = () => {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [authorName, setAuthorName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`)
        const recipeData = response.data
        setRecipe(response.data)
        const author = await api.get(`/users/${recipeData.author}`)
        setAuthorName(author.data.name)
      } catch (error) {
        setError('Error al cargar la receta')
      }
    }

    fetchRecipe()
  }, [id])

  return (
    <div>
      <h1>Detalles de la Receta</h1>
      <button onClick={() => navigate('/')}>Regresar al Inicio</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recipe ? (
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>
          <h3>Ingredientes</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Pasos</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
          <h3>Categorías</h3>
          <ul>
            {recipe.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <p>Autor: {authorName}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default RecipeDetails