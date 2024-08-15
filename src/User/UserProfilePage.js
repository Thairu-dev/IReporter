import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Container, Typography, Avatar, Box } from '@mui/material';
import AuthContext from '../context/AuthContext';

const UserProfilePage = () => {
    const { user, /*setUser*/ updateUserProfile} = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.image || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageSelected, setImageSelected] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [statuses, setStatuses] = useState({
        redflags: { total: 0, under_review: 0, resolved: 0, rejected: 0 },
        interventions: { total: 0, under_review: 0, resolved: 0, rejected: 0 },
    });
    const [requestingAdmin, setRequestingAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setImagePreview(user.image);
            
            const updateStatusCounts = (items) => ({
                total: items.length,
                under_review: items.filter(item => item.status === 'under_review').length,
                resolved: items.filter(item => item.status === 'resolved').length,
                rejected: items.filter(item => item.status === 'rejected').length,
            });

            setStatuses({
                redflags: updateStatusCounts(user.redflags || []),
                interventions: updateStatusCounts(user.intervention || []),
            });
        }
    }, [user]);
    console.log(user)

    const handleRequestAdmin = () => {
        setRequestingAdmin(true);
    
        fetch('https://ireporter-server.onrender.com/request-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => { throw new Error(error.message); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message || 'Admin request sent successfully');
        })
        .catch(error => {
            if (error.message === 'You are already an admin') {
                alert('You are already an admin.');
            } else if (error.message === 'You have already requested admin access') {
                alert('You have already requested admin access.');
            } else {
                alert(`Error: ${error.message}`);
            }
        })
        .finally(() => {
            setRequestingAdmin(false);
        });
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
        setImageSelected(true);
    };

    const handleImageUpload = () => {
        if (image) {
            setUploading(true);
            updateUserProfile({ image })
                .then(() => {
                    setImageSelected(false);
                })
                .catch(err => setError(`Error: ${err.message}`))
                .finally(() => setUploading(false));
        }
    };

    const handleFieldUpdate = (field) => {
        setLoading(true);
        const profileData = {};

        if (field === 'name') profileData.name = name;
        if (field === 'email') profileData.email = email;
        if (field === 'old_password') profileData.old_password = oldPassword;
        if (field === 'new_password') profileData.new_password = newPassword;

        updateUserProfile(profileData)
            .then(() => setError(''))
            .catch(err => setError(`Error: ${err.message}`))
            .finally(() => setLoading(false));
    };
    if(error){
        alert(error)
    }
    return (
        <Container>
            <Typography variant="h4" gutterBottom>User Profile</Typography>
            
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <Avatar
                    alt="Profile Picture"
                    src={imagePreview}
                    sx={{ width: 100, height: 100 }}
                />
                <Button
                    variant="contained"
                    component="label"
                    sx={{ 
                        mt: 2, 
                        backgroundColor: '#9c27b0', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#8E24AA', // Light purple color
                        }
                    }}
                >
                    Upload New Image
                    <input
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                {imageSelected && !uploading && (
                    <Button
                        variant="contained"
                        sx={{ 
                            mt: 2, 
                            backgroundColor: '#9c27b0', 
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#8E24AA',
                            }
                        }}
                        onClick={handleImageUpload}
                    >
                        {uploading ? 'Uploading...' : 'Submit'}
                    </Button>
                )}
            </Box>
            
            <Box mb={4}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={() => handleFieldUpdate('name')}
                    sx={{ 
                        mt: 2, 
                        backgroundColor: '#9c27b0', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#8E24AA',
                        }
                    }}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Name'}
                </Button>
            </Box>
            
            <Box mb={4}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    sx={{ 
                        mt: 2, 
                        backgroundColor: '#9c27b0', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#8E24AA', 
                        }
                    }}
                    onClick={() => handleFieldUpdate('email')}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Email'}
                </Button>
            </Box>
            
            <Box mb={4}>
                <TextField
                    label="Old Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    sx={{ 
                        mt: 2, 
                        backgroundColor: '#9c27b0', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#8E24AA',
                        }
                    }}
                    onClick={() => handleFieldUpdate('new_password')}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </Button>
            </Box>
            <Box mb={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRequestAdmin}
                    disabled={requestingAdmin || user.role === 'admin'}
                >
                    {requestingAdmin ? 'Requesting...' : 'Request Admin Access'}
                </Button>
            </Box>
            
            <Box mb={4}>
                <Typography variant="h5">Your Redflags</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Box
                        sx={{ width: '23%', backgroundColor: 'purple', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Total</Typography>
                        <Typography>{statuses.redflags.total}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'yellow', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Under Review</Typography>
                        <Typography>{statuses.redflags.under_review}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'green', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Resolved</Typography>
                        <Typography>{statuses.redflags.resolved}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'red', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Rejected</Typography>
                        <Typography>{statuses.redflags.rejected}</Typography>
                    </Box>
                </Box>
            </Box>
            
            <Box mb={4}>
                <Typography variant="h5">Your Interventions</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Box
                        sx={{ width: '23%', backgroundColor: 'purple', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Total</Typography>
                        <Typography>{statuses.interventions.total}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'yellow', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Under Review</Typography>
                        <Typography>{statuses.interventions.under_review}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'green', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Resolved</Typography>
                        <Typography>{statuses.interventions.resolved}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'red', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Rejected</Typography>
                        <Typography>{statuses.interventions.rejected}</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default UserProfilePage;