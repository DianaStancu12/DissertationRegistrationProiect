import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignIn.css'
import UserTypeSelector from './UserTypeSelector';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//
import { Link as RouerLink} from 'react-router-dom';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const [selectedUserType, setSelectedUserType] = React.useState(null); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();
  
  let port = 'http://localhost:5001/auth/student/login';
  let path = '/student-homepage';

  //

  // const handleUserType = (userType) => {
  //   if(userType == 'student') {
  //     port = 'http://localhost:5001/auth/student/login';
  //     path = '/student-homepage';
  //   }  
  //   else {
  //     port = 'http://localhost:5001/auth/teacher/login';
  //     path = '/teacher-homepage';
  //   }
      
  // };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setUser({ ...user, [name]: value });
    setRole(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   // change port for diff users
    const response = await fetch('http://localhost:5001/auth/signin', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email, password, role }),
    });

   

    if (response.ok) {
       const data = await response.json();
       console.log(data);
       localStorage.setItem('token', data.data);
       //window.location.href = '/';
       console.log(data.token)

       //navigate(path)
       if(role === 'student')
        navigate('/student-homepage');
        else {
          navigate('/teacher-homepage');
        }
    } else {
       // Authentication failed
       console.error('Authentication failed');
    }
   };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
              />
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />
            </FormControl>
            {/* <UserTypeSelector>onUserTypeSelected={handleUserType}</UserTypeSelector> */}
            {/* <UserTypeSelector> onUserTypeChange={setSelectedUserType} </UserTypeSelector> */}
            {/* <UserTypeSelector></UserTypeSelector> */}
            <select name="role" value={role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}>Sign In</Button>
            <Grid container>
              <Grid item>
                <Link component={RouerLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}