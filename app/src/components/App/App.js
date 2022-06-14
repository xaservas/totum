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
<<<<<<< HEAD
=======
import Search from "../Search/Search";
>>>>>>> 6403eb9963069e0f5b188b5e13db294328647ffa




function App() {
 

  return (
    <div className="App">
      
    <Header/>
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Login/>}> 
      
      </Route>
=======
      <Route path="/" element={<Login/>}></Route>

>>>>>>> 6403eb9963069e0f5b188b5e13db294328647ffa

      <Route path="/activity/:id" element={<Activity activities={activities}/>}></Route>
      <Route path="/profile" element={<Profile activities={activities}/>}></Route>
      <Route path="/activities" element={<ListActivities activities={activities}/>}></Route>
      <Route path="/activity/create" element={<CreateActivity/>}></Route>
<<<<<<< HEAD
      <Route path="/createProfil" element={<CreateProfile/>}></Route>
      <Route path="*" element={<Navigate to='/' />} />
=======
      <Route path="/profile/create" element={<CreateProfile/>}></Route>
      <Route path="/search" element={<Search/>}></Route>

>>>>>>> 6403eb9963069e0f5b188b5e13db294328647ffa

    </Routes>
        
      
    </div>
  );
}

export default App;
