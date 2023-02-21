import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/client/Layout';
import Home from './pages/client/Home'
import About from './pages/client/About'
import Contact from './pages/client/Contact'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
