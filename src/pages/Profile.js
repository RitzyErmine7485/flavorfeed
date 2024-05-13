import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

const Profile = () => {
  const [userData, setUserData] = useState({})
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${id ? id : 'show-data'}`, { // Si hay un id, se obtiene el perfil del usuario correspondiente
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setUserData(response.data)
        if (!id) {
          setFormData({ name: response.data.name, email: response.data.email })
        }
      } catch (error) {
        setError('Error al cargar el perfil')
      }
    }

    fetchUserData()
  }, [id])
  
  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.put(`/users/${userData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const response = await api.get('/users/show-data', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setUserData(response.data)
      setError('')
    } catch (error) {
      setError('Error al actualizar el perfil')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${userData._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      localStorage.removeItem('token')
      navigate('/')
    } catch (error) {
      setError('Error al eliminar la cuenta')
    }
  }

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      await api.put(`/users/${userData._id}`, {
        password: formData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFormData({ ...formData, newPassword: '', confirmPassword: '' })
      setError('')
    } catch (error) {
      setError('Error al cambiar la contraseña')
    }
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Regresar al Inicio</button>
      <h1>{id ? `${userData.name}'s Profile` : 'Tu Perfil'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!id ? ( 
        <div>
          <h2>Tus Recetas</h2>
          <button onClick={() => navigate(`/user-recipes/${userData._id}`)}>Ver Recetas</button>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Guardar Cambios</button>
              
            </form>

            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handlePasswordChange}>
              <div>
                <label htmlFor="newPassword">Nueva Contraseña:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Cambiar Contraseña</button>
            </form>
            <button onClick={handleDelete}>Eliminar Cuenta</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Recetas de {userData.name}</h2>
          <Link to={`/users/${userData._id}/recipes`}><button>Ver Recetas</button></Link>
        </div>
      )}
    </div>
  )
}

export default Profile
