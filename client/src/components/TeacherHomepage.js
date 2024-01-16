import React, { useState, useEffect } from 'react';
import './TeacherHomepage.css';

function TeacherHomePage() {
const [requests, setRequests] = useState([]);
const [selectedRequest, setSelectedRequest] = useState(null);

// useEffect(() => {
//     fetchRequestData();
// }, []);

// const fetchRequestData = async () => {
//     try {
//     const response = await fetch('http://localhost:5001/teacherRequests/');
//     const data = await response.json();
//     setRequests(data);
//     } catch (error) {
//       console.error('Error fetching request data:', error.message); // Afiseaza mesajul de eroare
//     }
// };

// const handleDetailsClick = (requestId) => {
//     const selected = requests.find((request) => request.id === requestId);
//     setSelectedRequest(selected);
// };

// const handleAccept = async () => {
//     try {
//     const response = await fetch(`http://localhost:5001/acceptRequest/${selectedRequest.id}`, {
//         method: 'POST',
//     });
//     if (response.ok) {
//         console.log('Cererea a fost acceptată cu succes!');
//     } else {
//         console.error('Acceptarea cererii a eșuat.');
//     }
//     } catch (error) {
//     console.error('Error accepting request:', error.message);
//     }
// };

// const handleReject = async () => {
//     try {
//     const response = await fetch(`http://localhost:5001/rejectRequest/${selectedRequest.id}`, {
//         method: 'POST',
//     });
//     if (response.ok) {
//         console.log('Cererea a fost respinsă cu succes!');
//     } else {
//         console.error('Respingerea cererii a eșuat.');
//     }
//     } catch (error) {
//     console.error('Error rejecting request:', error.message);
//     }
// };

return (
    <div>
    <h1>Bun venit, Profesore!</h1>
    {/* <div>
        {selectedRequest ? (
        <div>
            <h2>Detalii Cerere:</h2>
            <p>Titlu: {selectedRequest.title}</p>
            <p>Detalii: {selectedRequest.details}</p>
            <button onClick={handleAccept}>Acceptă</button>
            <button onClick={handleReject}>Respinge</button>
        </div>
        ) : (
        <div>
            <h2>Cererile primite:</h2>
            <ul>
            {requests.map((request) => (
                <li key={request.id}>
                <span>{request.title}</span>
                <button onClick={() => handleDetailsClick(request.id)}>Detalii</button>
                </li>
            ))}
            </ul>
        </div>
        )}
    </div> */}
    </div>
);
}

export default TeacherHomePage;
