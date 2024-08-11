import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Container, Typography, Avatar, Box } from '@mui/material';
import AuthContext from '../context/AuthContext'; // Adjust the path as needed

const UserProfilePage = () => {
    const { user, /*setUser*/ updateUserProfile } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.image || '');
    const [loading, setLoading] = useState(false);
    const [/*error*/ setError] = useState('');
    const [imageSelected, setImageSelected] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [interventions, setInterventions] = useState([]);
    const [redflags, setRedflags] = useState([]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setImagePreview(user.image);
            setInterventions(user.interventions || []);
            setRedflags(user.redflags || []);
        }
    }, [user]);

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

    const countByStatus = (items, status) => items.filter(item => item.status === status).length;

    const redflagStatuses = {
        total: redflags.length,
        under_review: countByStatus(redflags, 'under_review'),
        resolved: countByStatus(redflags, 'resolved'),
        rejected: countByStatus(redflags, 'rejected'),
    };

    const interventionStatuses = {
        total: interventions.length,
        under_review: countByStatus(interventions, 'under_review'),
        resolved: countByStatus(interventions, 'resolved'),
        rejected: countByStatus(interventions, 'rejected'),
    };

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
                <Typography variant="h5">Your Redflags</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Box
                        sx={{ width: '23%', backgroundColor: 'purple', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Total</Typography>
                        <Typography>{redflagStatuses.total}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'yellow', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Under Review</Typography>
                        <Typography>{redflagStatuses.under_review}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'green', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Resolved</Typography>
                        <Typography>{redflagStatuses.resolved}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'red', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Rejected</Typography>
                        <Typography>{redflagStatuses.rejected}</Typography>
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
                        <Typography>{interventionStatuses.total}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'yellow', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Under Review</Typography>
                        <Typography>{interventionStatuses.under_review}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'green', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Resolved</Typography>
                        <Typography>{interventionStatuses.resolved}</Typography>
                    </Box>
                    <Box
                        sx={{ width: '23%', backgroundColor: 'red', p: 2, boxShadow: 1 }}
                    >
                        <Typography variant="h6">Rejected</Typography>
                        <Typography>{interventionStatuses.rejected}</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default UserProfilePage;