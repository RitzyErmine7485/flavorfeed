import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './styles/Index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';
import UserRecipes from './pages/UserRecipes';

const App = () => {
    return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/user-recipes/:id" element={<UserRecipes />} />
      </Routes>
    );
};

export default App;
