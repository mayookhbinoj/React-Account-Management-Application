import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../Validation/validation'; 
import { toast } from 'react-hot-toast'; 
import { auth, login } from '../firebase';

const LoginForm = () => {
  const [formData, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data using zod schema
    const result = loginSchema.safeParse(formData);

    if (result.success) {
      console.log("result",result)
      const loginResult = await login(formData);
      if (loginResult) {
        navigate('/Home');
      } 
    } else {
      const validationErrors = result.error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message; 
        return acc;
      }, {});
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 8,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)} 
            helperText={errors.email} 
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)} 
            helperText={errors.password} 
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Login
          </Button>
        </form>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link href="/Register" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
