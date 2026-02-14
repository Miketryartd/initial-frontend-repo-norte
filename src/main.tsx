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
import CreateQuiz from './pages/CreateQuiz.tsx'
import Quizzes from './pages/Quizzes.tsx'
import QuizFeed from './pages/QuizFeed.tsx'
import Bookmarks from './pages/User_Bookmarks.tsx'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
   <Routes>
    
   <Route path="/" element={<App/>}></Route>
   <Route path='/Signup' element={<Signup/>}></Route>
   <Route path='/Signin' element={<Signin/>}></Route>
   <Route path='/Home' element={<Home/>}></Route>
  


    <Route element={<ProtectedRoute/>}> 
    <Route path='/Create-Quiz' element={<CreateQuiz/>}></Route>
    <Route path='/Post/:id' element={<Post/>}></Route>
    <Route path='/AuthChecker' element={<AuthChecker/>}></Route>
    <Route path='/Dashboard' element={<Dashboard/>}></Route>
    <Route path='/Publish' element={<Publish/>}></Route>
    <Route path='/Feed' element={<Feed/>}></Route>
    <Route path='/Quiz-Feed' element={<QuizFeed/>}></Route>
    <Route path='/Quiz/:id' element={<Quizzes/>}></Route>
    <Route path='/Bookmarks' element={<Bookmarks/>}></Route>
    </Route>


   </Routes>
   </BrowserRouter>
  </StrictMode>,
)
