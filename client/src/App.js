import React from 'react'
import MySidebar from './Components/MySidebar'
import Navbar from './Components/Navbar'
import AllPosts from './Components/AllPosts'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MakePost from './Components/MakePost'
import ShowBlog from './Components/ShowBlog'
import UpdateBlog from './Components/UpdateBlog'
import UsersPost from './Components/UsersPost'
import Login from './Components/Login'
import Signup from './Components/SignUp'
const App = () => {
  return (
    <div>
        <Navbar/>
        <MySidebar/>
        <div className="content">
          <Routes >
            <Route path='/' element={<Signup/>}/>
            <Route path='/posts' element={<AllPosts/>}></Route>
            <Route path='/post' element={<MakePost/>}></Route>
            <Route path='/post/:id' element={<ShowBlog/>}></Route>
            <Route path='/update/:id' element={<UpdateBlog/>}></Route>
            <Route path='/mypost' element={<UsersPost/>}></Route>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </div>
    </div>
  )
}

export default App
