import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Activity from "../Activity/Activity";
import ListActivities from "../ListActivities/ListActivities";
import { Route, Routes } from 'react-router-dom';
import Login from "../Login/Login";
import activities from "../../data/activities"
import CreateActivity from "../CreateActivity/CreateActivity";


function App() {
  return (
    <div className="App">
      
    <Header/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/activity/:id" element={<Activity activities={activities}/>}></Route>
      <Route path="/profile" element={<Profile activities={activities}/>}></Route>
      <Route path="/activities" element={<ListActivities activities={activities}/>}></Route>
      <Route path="/activity/create" element={<CreateActivity/>}></Route>
    </Routes>
        
      
    </div>
  );
}

export default App;
