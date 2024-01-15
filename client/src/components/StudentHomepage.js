import React, { useState, useEffect } from 'react';
import './StudentHomepage.css'
import { jwtDecode } from 'jwt-decode'

const StudentHomepage = () => {
  const [studentName, setStudentName] = useState('');
  const [hasCoordinator, setHasCoordinator] = useState(false);
  const [availableProfessors, setAvailableProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [thesisTitle, setThesisTitle] = useState('');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {   
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            //console.log(decodedToken.id)

            const id = decodedToken.id;
            const port = 'http://localhost:5001/students/' + id;

            const studentResponse = await fetch(port);
            const studentData = await studentResponse.json();
            setStudentName(studentData.data.name);
            setHasCoordinator(studentData.hasCoordinator);

            console.log(studentData.data.name)
            
            const professorsResponse = await fetch('http://localhost:5001/teachers/');
            const professorsData = await professorsResponse.json();
            setAvailableProfessors(professorsData);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  // const fetchStudentData = async () => {
  //   try {
  //       const token = localStorage.getItem('token');

  //       const response = await fetch('http://localhost:5001/students/userInfo', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setStudentName(data.data.name);
  //       } else {
  //         console.error('Failed to fetch user info');
  //       }

  //       const professorsResponse = await fetch('http://localhost:5001/teachers/');
  //       const professorsData = await professorsResponse.json();
  //       setAvailableProfessors(professorsData);
  //   }
  //   catch (error) {
  //       console.error('Error fetching student data:', error);
  //   }
  // }

  const handleRequestSubmission = async () => {
    try {
      // Emularea unui apel către server pentru a trimite cererea
      const response = await fetch('/api/submitequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professor: selectedProfessor,
          thesisTitle,
        }),
      });

      if (response.ok) {
        console.log('Cererea a fost trimisă cu succes!');
      } else {
        console.error('Trimiterea cererii a eșuat.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div>
      <h1>Bun venit, {studentName}!</h1>
      <div>
        <h2>Status: {hasCoordinator ? 'Are un profesor coordonator' : 'Nu are un profesor coordonator'}</h2>
        {!hasCoordinator && (
          <div>
            <label>Profesor disponibil:</label>
            <select onChange={(e) => setSelectedProfessor(e.target.value)}>
              <option value="" disabled selected>
                Alege profesorul
              </option>
              {availableProfessors.map((professor) => (
                <option key={professor.id} value={professor.name}>
                  {professor.name}
                </option>
              ))}
            </select>

            <label>Titlu teză de licență:</label>
            <input type="text" value={thesisTitle} onChange={(e) => setThesisTitle(e.target.value)} />
            
            <button onClick={handleRequestSubmission}>Trimite cererea</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHomepage;




