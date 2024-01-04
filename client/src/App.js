import './App.css';
import React, { useState } from 'react';
import SignIn from './components/SignIn';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import StudentHomepage from './components/StudentHomepage'
import TeacherHomePage from './components/TeacherHomepage';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        <Route exact path="/" element={<SignIn />} />
        <Route path="/student-homepage" element={<StudentHomepage/>} />
        <Route path="/teacher-homepage" element={<TeacherHomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
