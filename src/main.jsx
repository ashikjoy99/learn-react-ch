import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Users } from './components/Users.jsx';
import ReactDOM from "react-dom/client";
import { Home } from './components/Home.jsx';
import { App } from './App.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <App/>
  </BrowserRouter>,
);