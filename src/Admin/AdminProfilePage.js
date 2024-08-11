import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Avatar, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Adjust the import based on your file structure

const AdminProfilePage = () => {
    const { user, updateUserProfile } = useAuth();
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
                    setImageSelected(false); // Hide the button
                })
                .catch(err => {
                    setError(`Error: ${err.message}`);
                })
                .finally(() => {
                    setUploading(false);
                });
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
            .then(() => {
                setError('');
            })
            .catch(err => {
                setError(`Error: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Profile</Typography>
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
                            backgroundColor: '#8E24AA',
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
                    sx={{ 
                        mt: 2, 
                        backgroundColor: '#9c27b0', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#8E24AA',
                        }
                    }}
                    onClick={() => handleFieldUpdate('name')}
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

            {error && (
                <Typography color="error" variant="body2">{error}</Typography>
            )}
        </Container>
    );
};

export default AdminProfilePage;