
import React, { useState } from 'react';
import './SignUp.css';
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
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

const SignUp = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username:'',
        name:'',
        email: '',
        password: '',
        role: 'student' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, name, email, password, role } = user;
    if (!username || !name || !email || !password || !role) {
        alert("Te rog să completezi toate câmpurile!");
        return;
    }


    try {
        const response = await fetch('http://localhost:5001/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Eroare la înregistrare');
            
        }

        alert('Contul a fost creat cu succes!');
        
        navigate('/');


        const data = await response.json();
        console.log('Utilizator înregistrat cu succes:', data);

        

    } catch (error) {
        console.error('Eroare la trimiterea datelor:', error);
        alert('Eroare la înregistrare. Te rog să încerci din nou.');
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
        <Typography component="h1" variant="h5" align='center'>
            Sign up
        </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}></Box>
        <form onSubmit={handleSubmit} className="signup-form">
        <input
                type="username"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                required
            />
        <input
                type="name"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
            />

            <select name="role" value={user.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
        </Container>
    </ThemeProvider>
    );
};

export default SignUp;
