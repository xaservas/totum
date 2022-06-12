import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Activity from "../Activity/Activity";
import { Route, Routes } from 'react-router-dom';
import Login from "../Login/Login";


function App() {
  return (
    <div className="App">
      
    <Header/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/activity" element={<Activity/>}></Route>
      <Route path="/profil" element={<Profile/>}></Route>
    </Routes>
        
      
    </div>
  );
}

export default App;
