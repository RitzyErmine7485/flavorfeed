import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    categories: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${id}`)
        const { title, description, ingredients, steps, categories } = response.data
        setFormData({ title, description, ingredients: ingredients.join('\n'), steps: steps.join('\n'), categories })
      } catch (error) {
        setError('Error al cargar la receta')
      }
    }

    fetchRecipe()
  }, [id])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.put(`/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      navigate('/')
    } catch (error) {
      setError('Error al editar la receta')
    }
  }

  return (
    <div>
      <h1>Editar Receta</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredientes:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="steps">Pasos:</label>
          <textarea
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categories">Categorías:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
          />
          <p>Escribe las categorías separadas por comas (ejemplo: Desayuno, Vegetariano, Postre)</p>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  )
}

export default EditRecipe
