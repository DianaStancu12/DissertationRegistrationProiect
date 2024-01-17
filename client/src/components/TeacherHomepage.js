import React, { useState, useEffect } from 'react';
import './TeacherHomepage.css'
import { jwtDecode } from 'jwt-decode'


const TeacherHomepage = () => {

    const [teacherName, setTeacherName] = useState('');
    const [requests, setRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(true);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [refuseState, setRefuseState] = useState({ id: null, reasonReject: '' });
    const [buttonState, setButtonState] =useState('');
    const [requestId, setRequestId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [acceptedRequest, setAcceptedRequest] = useState([]);
    const [rejectedRequest, setRejectedRequest] = useState([])


    useEffect(() => {
        fetchTeacherData();
        fetchRequests();
        fetchAcceptedRequests();
        fetchRejectedRequests();
      }, []);


      const fetchTeacherData = async () => {
        try {   
                const token = localStorage.getItem('token');
                const decodedToken = jwtDecode(token);
    
                const id = decodedToken.id;
                const port = 'http://localhost:5001/teachers/' + id;
    
                const teacherResponse = await fetch(port);
                const teacherData = await teacherResponse.json();
                setTeacherName(teacherData.data.name);
                //console.log(teacherData.data.name);

                const students = await fetch('http://localhost:5001/students/');
                const studsData = await students.json();
                setAvailableStudents(studsData);
                console.log(studsData);

        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      };

      const fetchRequests = async () => {

        try {
          const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
    
          const teacherId = decodedToken.id;
          const port = 'http://localhost:5001/requests/teacherRequests/' + teacherId;
    
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

      const fetchAcceptedRequests = async () => {

        try {
          const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
    
          const teacherId = decodedToken.id;
          const port = 'http://localhost:5001/requests/acceptedRequests/' + teacherId;
    
          const requestResponse = await fetch(port);
          const requestData = await requestResponse.json();
          console.log(requestData)
          setAcceptedRequest(requestData.data);
    
          setLoadingRequests(false);
        }
        catch(error) {
          console.error('Error fetching requests:' , error)
        }
    
        
      }

      const fetchRejectedRequests = async () => {

        try {
          const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
    
          const teacherId = decodedToken.id;
          const port = 'http://localhost:5001/requests/rejectedRequests/' + teacherId;
    
          const requestResponse = await fetch(port);
          const requestData = await requestResponse.json();
          console.log(requestData)
          setRejectedRequest(requestData.data);
    
          setLoadingRequests(false);
        }
        catch(error) {
          console.error('Error fetching requests:' , error)
        }
    
        
      }


      const handleAccept = async (requestId) => { 
        setButtonState(true);
        console.log('Accepted request:', requestId);
        setRequestId(requestId);

        await new Promise(resolve => setTimeout(resolve, 0));

        handleRequestSubmission();
        console.log('Am acceptat')
    };

    const handleDeny = async (id) => {
        setRefuseState({ ...refuseState, id });
        console.log('Am refuzat')
        setButtonState(false);
        setRequestId(requestId);

        await new Promise(resolve => setTimeout(resolve, 0));
    };

    const handleReasonChange = async (e) => {
        setRefuseState({ ...refuseState, reasonReject: e.target.value });
        console.log('Am trm motivul')

        await new Promise(resolve => setTimeout(resolve, 0));

    };

    const submitRefusal = async (id) => {
        console.log('Refused request:', id, 'Reason:', refuseState.reasonReject);

        setRefuseState({ id: null, reasonReject: '' });

        await new Promise(resolve => setTimeout(resolve, 0));

        handleRequestSubmission();
    };

    const handleRequestSubmission = async () => {
        try {

            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const teacherId = decodedToken.id;
            console.log(teacherId);

            console.log('ID STUD:' + studentId);
            console.log('Button: '+  status(buttonState));
            console.log('Motiv: '+ refuseState.reasonReject);

          const response = await fetch('http://localhost:5001/requests/update/' + studentId  +'/'+ teacherId , {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            statusRequest: status(buttonState),
            reasonReject:  refuseState.reasonReject,
    
            }),
          });
    
          if (response.ok) {
            console.log('Raspunsul a fost trimis cu succes!');
            await fetchRequests();
            await fetchAcceptedRequests();
            await fetchRejectedRequests();
          } else {
            console.error('Trimiterea raspunsului a eșuat.');
          }
        } catch (error) {
          console.error('Error submitting response:', error);
        }

      };

    function getStudName(studentId) {
        const student = availableStudents.find((stud) => stud.id === studentId);
        console.log(student)
        return student ? student.name : 'N/A';
    }

    function status(status){
        if(status===true)
        return 'Approved' 
    else return 'Rejected';
    }

      
return (
    <div>
    
    <h1>Bun venit, {teacherName}!</h1>

    <h2>Cereri</h2>
    {loadingRequests ? (
                <p>Loading requests...</p>) : (
    <table className="requests-table">
            <thead>
              <tr>
                <th>Nume Student</th>
                <th>Titlul lucrarii</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
    <tbody>
    {requests.map(request => (
        <tr key={request.id}>
            <td>{getStudName(request.studentId)}</td>
            <td>{request.thesisTitle}</td>
            {refuseState.id === request.id && (
                        <div>
                            <input
                                type="text"
                                placeholder="Motivul refuzului"
                                value={refuseState.reasonReject}
                                onChange={handleReasonChange}
                            />
                            <button onClick={() => submitRefusal(request.id)}>Trimite Motiv</button>
                        </div>
                    )}
            <td>
    <button onClick={() => {setStudentId(request.studentId); handleAccept(request.id)}}>Acceptă</button>
    <button onClick={() => {setStudentId(request.studentId); handleDeny(request.id)}}>Refuză</button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>
)}

<h2>Lista studenti acceptati</h2> 
    {loadingRequests ? (
                <p>Loading requests...</p>) : (
    <table className="requests-table">
            <thead>
              <tr>
                <th>Nume Student</th>
                <th>Titlul lucrarii</th>
              </tr>
            </thead>
    <tbody>
    {acceptedRequest.map(request => (
        <tr key={request.id}>
            <td>{getStudName(request.studentId)}</td>
            <td>{request.thesisTitle}</td>


    </tr>
    ))}
    </tbody>
    </table>
)}
<h2>Lista studenti neacceptati</h2>
    {loadingRequests ? (
                <p>Loading requests...</p>) : (
    <table className="requests-table">
            <thead>
              <tr>
                <th>Nume Student</th>
                <th>Titlul lucrarii</th>
                <th>Motiv respingere</th>
              </tr>
            </thead>
    <tbody>
    {rejectedRequest.map(request => (
        <tr key={request.id}>
            <td>{getStudName(request.studentId)}</td>
            <td>{request.thesisTitle}</td>
            <td>{request.reasonReject}</td>

    </tr>
    ))}
    </tbody>
    </table>
)}
    
    
    </div>

);
};

export default TeacherHomepage;
