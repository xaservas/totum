/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Axios from '../../utils/axiosPool';

// base page
import './app.scss';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  const [addActivity, setAddActivity] = useState(false);
  const [profile, setProfile] = useState(false);
  const [parameters, setParameters] = useState(false);
  const [user, setUser] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activity, setActivity] = useState(false);
  const [help, setHelp] = useState(false);
  const [legalMention, setLegalmention] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [resetSearch, setResetSearch] = useState(false);
  const [activityContent, setActivityContent] = useState({});
  const [mainListActivities, setMainListActivities] = useState(false);
  const [listMparameters, setListParameters] = useState(false);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState('');
  const timeNow = dayjs(Date.now()).toISOString();
  const [usersPictures, setUsersPictures] = useState([]);
  const [updateActivity, setUpdateActivity] = useState(false);
  const [activityContentUpdate, setActivityContentUpdate] = useState(0);
  const [mainCoordinate, setMainCoordinate] = useState([]);

  const randomPictures = () => {
    Axios({
      method: 'get',
      url: 'https://randomuser.me/api/?results=100',
    })
      .then((response) => {
        setUsersPictures(response.data.results);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    randomPictures();
  }, []);

  const checkUser = () => {
    if (localStorage.getItem('id')) {
      setUser(true);
      setIsLogged(true);
    }
  };

  const closeAllModal = () => {
    setAddActivity(false);
    setProfile(false);
    setParameters(false);
    setCreateProfile(false);
    setUser(true);
    setShowMenu(false);
    setActivity(false);
    setHelp(false);
    setLegalmention(false);
    setActivityContentUpdate(0);
  };

  const storeUserId = (id) => {
    setUserId(id);
  };

  const storeToken = (tokenUser) => {
    setToken(tokenUser);
  };

  const handleListMainActivities = () => {
    setMainListActivities(!mainListActivities);
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCreateActivity = () => {
    closeAllModal();
    setAddActivity(!addActivity);
  };

  const handleProfile = () => {
    closeAllModal();
    setProfile(!profile);
  };

  const handleParameters = () => {
    closeAllModal();
    setParameters(!parameters);
  };

  const handleHelp = () => {
    closeAllModal();
    setHelp(!help);
  };

  const handleLegalmention = () => {
    closeAllModal();
    setLegalmention(!legalMention);
  };

  const handleLogin = () => {
    closeAllModal();
    setUser(false);
  };

  const handleCreateProfile = () => {
    closeAllModal();
    setCreateProfile(!createProfile);
  };

  const handleIsLogged = () => {
    setIsLogged(!isLogged);
  };

  const handleActivitiesList = (data) => {
    setSearchResult(data);
  };

  const resetActivitiesList = () => {
    setResetSearch(!resetSearch);
  };

  const handleActivity = (data) => {
    setActivityContent(data);
    setActivity(!activity);
  };

  const closeActivity = () => {
    setActivity(!activity);
  };

  const synchroRemoveListMap = () => {
    setListParameters(!listMparameters);
  };

  const handleUpdateActivity = (id) => {
    setUpdateActivity(!updateActivity);
    setActivityContentUpdate(id);
    setAddActivity(!addActivity);
  };

  const handleLogout = async () => {
    closeAllModal();
    try {
      await Axios.get('/user/logout', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    localStorage.clear();
    setUser(false);
    setIsLogged(false);
  };

  useEffect(() => {
    checkUser();
  }, [user]);

  useEffect(() => {
    checkUser();
  }, []);

  const props = {
    addActivity,
    profile,
    parameters,
    user,
    createProfile,
    isLogged,
    showMenu,
    activity,
    searchResult,
    help,
    legalMention,
    resetSearch,
    activityContent,
    timeNow,
    mainListActivities,
    userId,
    token,
    usersPictures,
    listMparameters,
    updateActivity,
    activityContentUpdate,
    mainCoordinate,
  };

  const funct = {
    handleCreateActivity,
    handleProfile,
    handleParameters,
    handleLogin,
    handleLogout,
    checkUser,
    handleCreateProfile,
    closeAllModal,
    handleIsLogged,
    handleMenu,
    handleActivitiesList,
    resetActivitiesList,
    handleActivity,
    handleHelp,
    handleLegalmention,
    handleListMainActivities,
    storeUserId,
    storeToken,
    closeActivity,
    synchroRemoveListMap,
    handleUpdateActivity,
    setMainCoordinate,
  };

  return (
    <div className='App'>
      <Header props={props} funct={funct} />
      <Routes>
        <Route path='/' element={<Main props={props} funct={funct} />} />
      </Routes>

      <Footer funct={funct} props={props} />
    </div>
  );
}

export default App;
