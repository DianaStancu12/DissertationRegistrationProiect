import React, { useState } from 'react';
import { Button } from '@mui/material';

const UserTypeSelector = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleButtonClick = (userType) => {
    setSelectedUserType(userType);
    //onUserTypeSelected(userType);
  };


  return (
    <div>
      <Button
        onClick={() => handleButtonClick('teacher')}
        style={{ backgroundColor: selectedUserType === 'teacher' ? 'purple' : 'white' }}>
        Teacher
      </Button>
      <Button
        onClick={() => handleButtonClick('student')}
        style={{ backgroundColor: selectedUserType === 'student' ? 'purple' : 'white' }}>
        Student
      </Button>
    </div>
  );
};

export default UserTypeSelector;
