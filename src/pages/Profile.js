import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Alert,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  DirectionsCar as CarIcon,
  Payment as PaymentIcon,
  History as HistoryIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../services/userService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [editForm, setEditForm] = useState({});

  const loadUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getUserProfile(user.uid);
      
      if (result.success) {
        setProfile(result.data);
        setEditForm({
          firstName: result.data.firstName || '',
          lastName: result.data.lastName || '',
          dateOfBirth: result.data.dateOfBirth ? new Date(result.data.dateOfBirth.toDate()).toISOString().split('T')[0] : '',
          gender: result.data.gender || '',
          address: {
            street: result.data.address?.street || '',
            city: result.data.address?.city || '',
            state: result.data.address?.state || '',
            pincode: result.data.address?.pincode || '',
            country: result.data.address?.country || 'India'
          }
        });
      } else {
        setError('Failed to load profile');
      }
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [user.uid]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadUserProfile();
  }, [user, navigate, loadUserProfile]);

  const handleEdit = () => {
    setEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth.toDate()).toISOString().split('T')[0] : '',
      gender: profile.gender || '',
      address: {
        street: profile.address?.street || '',
        city: profile.address?.city || '',
        state: profile.address?.state || '',
        pincode: profile.address?.pincode || '',
        country: profile.address?.country || 'India'
      }
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const result = await updateUserProfile(user.uid, editForm);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setEditing(false);
        await loadUserProfile(); // Reload profile
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      setError('Failed to sign out');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Failed to load profile</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ width: 80, height: 80, mr: 3 }}>
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {profile.firstName && profile.lastName 
                      ? `${profile.firstName} ${profile.lastName}`
                      : 'Complete Your Profile'
                    }
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {profile.phoneNumber}
                  </Typography>
                  <Chip 
                    label={profile.isProfileComplete ? 'Profile Complete' : 'Profile Incomplete'} 
                    color={profile.isProfileComplete ? 'success' : 'warning'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  onClick={handleSignOut}
                  sx={{ mr: 1 }}
                >
                  Sign Out
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/booking')}
                >
                  Book a Car
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CarIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4">{profile.totalBookings || 0}</Typography>
                  <Typography variant="body2" color="textSecondary">Total Bookings</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PaymentIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h4">₹{profile.totalSpent || 0}</Typography>
                  <Typography variant="body2" color="textSecondary">Total Spent</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CalendarIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="h6">
                    {profile.memberSince ? new Date(profile.memberSince.toDate()).toLocaleDateString() : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">Member Since</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Profile" icon={<PersonIcon />} />
              <Tab label="Bookings" icon={<HistoryIcon />} />
              <Tab label="Settings" icon={<PaymentIcon />} />
            </Tabs>

            {activeTab === 0 && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6">Personal Information</Typography>
                  {!editing ? (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={loading}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={editing ? editForm.firstName : (profile.firstName || '')}
                      onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={editing ? editForm.lastName : (profile.lastName || '')}
                      onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                      disabled={!editing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      value={editing ? editForm.dateOfBirth : (profile.dateOfBirth ? new Date(profile.dateOfBirth.toDate()).toISOString().split('T')[0] : '')}
                      onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                      disabled={!editing}
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth disabled={!editing} sx={{ mb: 2 }}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={editing ? editForm.gender : (profile.gender || '')}
                        onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                        label="Gender"
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>Address Information</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Street Address"
                      value={editing ? editForm.address.street : (profile.address?.street || '')}
                      onChange={(e) => setEditForm({ 
                        ...editForm, 
                        address: { ...editForm.address, street: e.target.value }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="City"
                      value={editing ? editForm.address.city : (profile.address?.city || '')}
                      onChange={(e) => setEditForm({ 
                        ...editForm, 
                        address: { ...editForm.address, city: e.target.value }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="State"
                      value={editing ? editForm.address.state : (profile.address?.state || '')}
                      onChange={(e) => setEditForm({ 
                        ...editForm, 
                        address: { ...editForm.address, state: e.target.value }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      value={editing ? editForm.address.pincode : (profile.address?.pincode || '')}
                      onChange={(e) => setEditForm({ 
                        ...editForm, 
                        address: { ...editForm.address, pincode: e.target.value }
                      })}
                      disabled={!editing}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>Booking History</Typography>
                {profile.bookings && profile.bookings.length > 0 ? (
                  <List>
                    {profile.bookings.map((booking, index) => (
                      <ListItem key={index} divider>
                        <ListItemAvatar>
                          <Avatar>
                            <CarIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Booking #${booking.id || index + 1}`}
                          secondary={`${booking.carModel || 'Car'} - ${booking.date || 'Date not specified'}`}
                        />
                        <Chip 
                          label={booking.status || 'Completed'} 
                          color={booking.status === 'Active' ? 'success' : 'default'}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box textAlign="center" py={4}>
                    <CarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      No bookings yet
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Start your journey by booking your first car
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/booking')}
                    >
                      Book Your First Car
                    </Button>
                  </Box>
                )}
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>Account Settings</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Contact Information</Typography>
                        <Box display="flex" alignItems="center" mb={2}>
                          <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
                          <Typography>{profile.phoneNumber}</Typography>
                        </Box>
                        {profile.email && (
                          <Box display="flex" alignItems="center">
                            <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                            <Typography>{profile.email}</Typography>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Preferences</Typography>
                        <Box mb={2}>
                          <Typography variant="body2" color="textSecondary">
                            SMS Notifications: {profile.preferences?.smsUpdates ? 'Enabled' : 'Disabled'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Email Updates: {profile.preferences?.emailUpdates ? 'Enabled' : 'Disabled'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 