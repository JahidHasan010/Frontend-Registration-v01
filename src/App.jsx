// frontend/src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Success from './pages/Success'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}
