import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import "../Spinner.css"

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { updateTokenVerified } = useAuth();

    useEffect(() => {
        fetch('https://ireporter-server.onrender.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
        })
        .catch(err => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    const handleToggleTokenVerified = (userId, currentStatus) => {
        updateTokenVerified(userId, !currentStatus)
            .then(() => {
                setUsers(users.map(user => user.id === userId ? { ...user, token_verified: !currentStatus } : user));
            })
            .catch(err => {
                setError(err.message);
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin User Management</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Token Verified</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users
                        .filter(user => user.role !== 'admin')
                        .map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.token_verified ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={user.token_verified ? 'error' : 'success'}
                                        onClick={() => handleToggleTokenVerified(user.id, user.token_verified)}
                                    >
                                        {user.token_verified ? 'Deactivate' : 'Activate'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminUserManagement;