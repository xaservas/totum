import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Activity from "../Activity/Activity";
import ListActivities from "../ListActivities/ListActivities";
import { Route, Routes } from 'react-router-dom';
import Login from "../Login/Login";


function App() {
  return (
    <div className="App">
      
    <Header/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/activity" element={<Activity/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/activities" element={<ListActivities/>}></Route>
    </Routes>
        
      
    </div>
  );
}

export default App;
