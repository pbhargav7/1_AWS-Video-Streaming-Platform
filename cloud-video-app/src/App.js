import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Auth } from "aws-amplify";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import AdminVideoUpload from "./components/Admin/Admin";
import PublicRoute from "./components/PublicRoute";
import Welcome from "./components/Welcome";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Catalog from "./components/Catalog/Catalog";
// import CookieHandler from "./components/CookieHandler";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        setUser(userInfo);
      } catch (error) {
        console.log(error);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      {/* <CookieHandler /> */}
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/signin"
          element={<PublicRoute user={user} component={SignIn} />}
        />
        <Route
          path="/signup"
          element={<PublicRoute user={user} component={SignUp} />}
        />
        <Route
          path="/upload"
          element={
            user ? <AdminVideoUpload user={user} /> : <Navigate to="/signin" />
          }
        />
        <Route path="/catalog" element={ user ? <Catalog user={user}/>:  <Navigate to="/signin"/>} />
        <Route path="/play/:guid" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
