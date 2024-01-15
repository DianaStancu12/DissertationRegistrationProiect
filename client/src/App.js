import './App.css';
import React, { useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import StudentHomepage from './components/StudentHomepage'
import TeacherHomePage from './components/TeacherHomepage';
// import useCheckToken from './useCheckToken';
// import { useSelector } from 'react-redux';
// const {loggedIn, checkTokenLoading} = useSelector((state) => state.global);

function App() {

  // const [loading, setLoading] = useState(true);
  // const [loggedIn, setLoggedIn] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //useCheckToken(setLoading, setLoggedIn);

  return (
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         isAuthenticated ? (
    //           <Navigate to="/homepage" />
    //         ) : (
    //           <SignIn setIsAuthenticated={setIsAuthenticated} />
    //         )
    //       }
    //     />
    //     <Route path="/homepage" element={<Homepage />} />
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
      <Route path="/signup" element={<SignUp/>} />
        <Route exact path="/" element={<SignIn />} />
        <Route path="/student-homepage" element={<StudentHomepage/>} />
        <Route path="/teacher-homepage" element={<TeacherHomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
