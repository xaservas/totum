import React from "react";

import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Activity from "../Activity/Activity";
import ListActivities from "../ListActivities/ListActivities";
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from "../Login/Login";


import activities from "../../data/activities"
import CreateActivity from "../CreateActivity/CreateActivity";
import CreateProfile from "../CreateProfil/CreateProfile";
import Search from "../Search/Search";
import Footer from "../Footer/Footer";




function App() {
 

  return (
    <div className="App">
      
    <Header/>
    <Routes>
      <Route path="/" element={<Login/>}> 
      
      </Route>

      <Route path="/activity/:id" element={<Activity activities={activities}/>}></Route>
      <Route path="/profile" element={<Profile activities={activities}/>}></Route>
      <Route path="/activities" element={<ListActivities activities={activities}/>}></Route>
      <Route path="/activity/create" element={<CreateActivity/>}></Route>
      <Route path="/createProfil" element={<CreateProfile/>}></Route>
      <Route path="*" element={<Navigate to='/' />} />
      <Route path="/profile/create" element={<CreateProfile/>}></Route>
      <Route path="/search" element={<Search/>}></Route>


    </Routes>
    <Footer/>
      
    </div>
  );
}

export default App;
