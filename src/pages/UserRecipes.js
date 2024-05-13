import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

const UserRecipes = () => {
  const [userRecipes, setUserRecipes] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await api.get(`/recipes/user/${id}`)
        setUserRecipes(response.data.recipes)
      } catch (error) {
        console.error('Error al cargar las recetas del usuario:', error)
      }
    }

    fetchUserRecipes()
  }, [id])

  const handleDeleteRecipe = async (id) => {
    try {
      await api.delete(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUserRecipes(userRecipes.filter(recipe => recipe._id !== id))
    } catch (error) {
      console.error('Error al eliminar la receta')
    }
  }

  return (
    <div>
      <h1>Recetas de Usuario</h1>
      <div>
        <button onClick={() => navigate('/')}>Regresar al Inicio</button>
        {!userRecipes ? (
          <p>No hay recetas para mostrar</p>
        ) : (
          userRecipes.map(recipe => (
            <div key={recipe._id}>
              <h2>{recipe.title}</h2>
              <p>Categorías: {recipe.categories.join(', ')}</p>
              <div>
                <Link to={`/edit-recipe/${recipe._id}`}><button>Editar</button></Link>
                <button onClick={() => handleDeleteRecipe(recipe._id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserRecipes
