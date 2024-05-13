import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [],
    steps: [],
    categories: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.post('/recipes', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      navigate('/') 
    } catch (error) {
      setError('Error al crear la receta')
    }
  }

  return (
    <div>
      <h1>Crear Nueva Receta</h1>
      <button onClick={() => navigate('/')}>Regresar al Inicio</button>
      
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
        <button type="submit">Crear Receta</button>
      </form>
    </div>
  )
}

export default CreateRecipe
