import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './Auth/Login.jsx'
import Registration from './Auth/Registration'
import Home from './Collection/Home.jsx'
import Navbar from './Navbar'
import Create from './Collection/Create'
import View from './Collection/View'
import Update from './Collection/Update.jsx'
import AddFriend from './Collection/AddFriend.jsx'


export default function App() {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Router>
          <Routes>
            <Route path='/' element={ <> <Navbar/> <Home/></>}/>
            <Route path='/home' element={ <> <Navbar/> <Home/></>}/>
            <Route path="/login" element={<><Navbar></Navbar><Login></Login></>}/>
            <Route path='/chat' />
            <Route path="/reg" element={<><Navbar></Navbar><Registration/></>}/>
            <Route path='/create' element={<><Navbar></Navbar><Create></Create></>}></Route>
            <Route path='/view' element={<><Navbar></Navbar><View></View></>}/>
            <Route path='/update' element={<><Navbar></Navbar><Update></Update></>}></Route>
            <Route path='/add' element={<><Navbar></Navbar><AddFriend></AddFriend></>}></Route>
          </Routes>
      </Router>
    </div>
  )
}
