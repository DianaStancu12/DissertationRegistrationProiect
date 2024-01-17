import React, { useState, useEffect } from 'react';
import './StudentHomepage.css'
import { jwtDecode } from 'jwt-decode'

const StudentHomepage = () => {
  const [studentName, setStudentName] = useState('');
  const [hasCoordinator, setHasCoordinator] = useState(false);
  const [availableProfessors, setAvailableProfessors] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [thesisTitle, setThesisTitle] = useState('');
  const [thesisDetails, setThesisDetails] = useState('')
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [showRequests, setShowRequests] = useState(false);

  useEffect(() => {
    fetchStudentData();
    fetchRequests();
  }, []);

  const fetchStudentData = async () => {
    try {   
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);

            const id = decodedToken.id;
            const port = 'http://localhost:5001/students/' + id;

            const studentResponse = await fetch(port);
            const studentData = await studentResponse.json();
            setStudentName(studentData.data.name);
            setHasCoordinator(studentData.data.teacherId);

            console.log('id prof' + studentData.data.teacherId)
            
            const professorsResponse = await fetch('http://localhost:5001/teachers/');
            const professorsData = await professorsResponse.json();
            setAvailableProfessors(professorsData);
            console.log(professorsData)
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchRequests = async () => {

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);

      const studId = decodedToken.id;
      const port = 'http://localhost:5001/requests/studentRequests/' + studId;

      const requestResponse = await fetch(port);
      const requestData = await requestResponse.json();
      console.log(requestData)
      setRequests(requestData.data);

      setLoadingRequests(false);
    }
    catch(error) {
      console.error('Error fetching requests:' , error)
    }

    
  }

  const handleRequestSubmission = async () => {
    try {

      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);

      const studId = decodedToken.id;

      // lets get teacher id
      const response = await fetch('http://localhost:5001/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: studId,
          teacherId: selectedProfessor,
          thesisTitle,
          statusRequest: 'Pending'
        }),
      });

      if (response.ok) {
        console.log('Cererea a fost trimisă cu succes!');

      await fetchRequests();
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
        <button onClick={() => setShowRequests(!showRequests)}>Cererile mele</button>
        <div className='student-info'>
            {!hasCoordinator && (
              <div>
                <label>Profesor disponibil:</label>
                <select onChange={(e) => setSelectedProfessor(e.target.value)}>
                  <option value="" disabled selected>
                    Alege profesorul
                  </option>
                  {availableProfessors.map((professor) => (
                    <option key={professor.id} value={professor.id}>
                      {professor.name}
                    </option>
                  ))}
                </select>

                <label>Titlu teză de disertatie:</label>
                <input type="text" value={thesisTitle} onChange={(e) => setThesisTitle(e.target.value)} />
                <label>Detalii despre lucrare</label>
                <input type="text" value={thesisDetails} onChange={(e) => setThesisDetails(e.target.value)} />
                <button onClick={handleRequestSubmission} disabled={hasCoordinator}>Trimite cererea</button>
              </div>
            )}

              {showRequests && (
                <div className='student-requests'>
                  <h3>Cererile mele</h3>
                  {loadingRequests ? (
                    <p>Încărcare cereri...</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Profesor</th>
                          <th>Titlu</th>
                          <th>Status</th>
                          <th>Motiv respingere</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((request) => (
                          <tr key={request.id}>
                            <td>{getProfessorName(request.teacherId)}</td>
                            <td>{request.thesisTitle}</td>
                            <td>{request.statusRequest}</td>
                            <td>{request.reasonReject || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

        </div>
      </div>
    </div>
  );

  function getProfessorName(professorId) {
    const professor = availableProfessors.find((prof) => prof.id === professorId);
    console.log(professor)
    return professor ? professor.name : 'N/A';
  }

};

export default StudentHomepage;




