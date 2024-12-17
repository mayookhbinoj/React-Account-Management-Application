import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Modal, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { updationSchema } from '../Validation/validation';

const Homes = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [errors, setErrors] = useState({}); 

  const navigate = useNavigate();

  // Fetch user data
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
          setUpdatedData({
            name: docSnap.data().name,
            email: docSnap.data().email,
            no: docSnap.data().no,
          });
        }
      }
    });
  };

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the field value
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the specific field
    try {
      updationSchema.shape[name].parse(value);
      setErrors((prevState) => ({ ...prevState, [name]: null })); 
    } catch (error) {
      setErrors((prevState) => ({ ...prevState, [name]: error.message })); 
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    const result = updationSchema.safeParse(updatedData);
     // Handle validation errors
    if (!result.success) {
      const newErrors = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      const docRef = doc(db, 'Users', auth.currentUser.uid);
      await updateDoc(docRef, updatedData);
      toast.success('Profile updated successfully!');
      handleClose();
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update user data. Please try again.');
    }
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ marginTop: '250px' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is the homepage where you can see content and interact with the app.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleOpen} style={{ marginLeft: '10px' }}>
          View Profile
        </Button>
      </Container>

      {/* Modal */}
      <Modal open={open} aria-labelledby="user-modal-title" aria-describedby="user-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography id="user-modal-title" variant="h6" component="h2">
            User Details
          </Typography>
          {user ? (
            <Box mt={2}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={updatedData.name || ''}
                onChange={handleChange}
                error={!!errors.name} 
                helperText={errors.name} 
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={updatedData.email || ''}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Phone Number"
                name="no"
                value={updatedData.no || ''}
                onChange={handleChange}
                error={!!errors.no}
                helperText={errors.no}
              />
            </Box>
          ) : (
            <Typography variant="body1" mt={2}>
              Loading user details...
            </Typography>
          )}
          <Button onClick={handleClose} variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Close
          </Button>
          {Object.keys(updatedData).length > 0 && (
            <Button onClick={handleUpdate} variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
              Update Profile
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Homes;
