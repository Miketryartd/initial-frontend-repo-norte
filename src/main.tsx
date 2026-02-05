import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Routes } from "react-router-dom"
import { BrowserRouter, Route } from "react-router"
import Home from "./pages/Home.tsx";
import Signup from "./pages/Signup.tsx";
import Signin from './pages/Signin.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Publish from './pages/Publish.tsx'
import Feed from "./pages/Feed.tsx";
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import AuthChecker from './pages/AuthChecker.tsx'
import Post from './pages/Post.tsx'






createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
    
   <Route path="/" element={<App/>}></Route>
   <Route path='/Signup' element={<Signup/>}></Route>
   <Route path='/Signin' element={<Signin/>}></Route>
   <Route path='/Home' element={<Home/>}></Route>
  


    <Route element={<ProtectedRoute/>}> 
    <Route path='/Post/:id' element={<Post/>}></Route>
    <Route path='/AuthChecker' element={<AuthChecker/>}></Route>
    <Route path='/Dashboard' element={<Dashboard/>}></Route>
    <Route path='/Publish' element={<Publish/>}></Route>
    <Route path='/Feed' element={<Feed/>}></Route>
    </Route>


   </Routes>
   </BrowserRouter>
  </StrictMode>,
)
