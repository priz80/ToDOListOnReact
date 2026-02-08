import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/scss/normalize.scss'
import './assets/scss/style.scss'
import { ToDoListPage } from './pages/ToDoListPage'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Header } from "./components/Header/Header"



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/todo' element={<ToDoListPage />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);