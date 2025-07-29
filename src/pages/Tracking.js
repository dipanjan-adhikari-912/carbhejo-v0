import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Chip
} from '@mui/material';
import { Search as SearchIcon, LocationOn, DirectionsCar, CheckCircle } from '@mui/icons-material';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock tracking data - in real app this would come from API
  const mockTrackingData = {
    trackingNumber: 'CB123456789',
    status: 'In Transit',
    pickup: {
      address: '123 Main Street, Mumbai, Maharashtra - 400001',
      date: '2024-01-15',
      time: '10:00 AM'
    },
    delivery: {
      address: '456 Central Avenue, Delhi, Delhi - 110001',
      date: '2024-01-18',
      time: '2:00 PM'
    },
    vehicle: {
      make: 'Maruti',
      model: 'Swift',
      year: '2020',
      registration: 'MH12AB1234'
    },
    driver: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      vehicle: 'Car Carrier - MH01CD5678'
    },
    timeline: [
      {
        step: 'Booking Confirmed',
        date: '2024-01-14',
        time: '3:30 PM',
        completed: true
      },
      {
        step: 'Driver Assigned',
        date: '2024-01-15',
        time: '8:00 AM',
        completed: true
      },
      {
        step: 'Pickup Completed',
        date: '2024-01-15',
        time: '10:00 AM',
        completed: true
      },
      {
        step: 'In Transit',
        date: '2024-01-16',
        time: '9:00 AM',
        completed: true
      },
      {
        step: 'Out for Delivery',
        date: '2024-01-18',
        time: '12:00 PM',
        completed: false
      },
      {
        step: 'Delivered',
        date: '2024-01-18',
        time: '2:00 PM',
        completed: false
      }
    ]
  };

  const handleSearch = () => {
    if (!trackingNumber.trim()) {
      alert('Please enter a tracking number');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (trackingNumber === 'CB123456789') {
        setTrackingData(mockTrackingData);
      } else {
        setTrackingData(null);
        alert('Tracking number not found. Please try with: CB123456789');
      }
      setLoading(false);
    }, 1000);
  };



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Track Your Order
      </Typography>
      
      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Enter Tracking Number
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            fullWidth
            label="Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g., CB123456789"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            startIcon={loading ? <SearchIcon /> : <SearchIcon />}
          >
            {loading ? 'Searching...' : 'Track'}
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Try with tracking number: <strong>CB123456789</strong>
        </Typography>
      </Paper>

      {/* Tracking Results */}
      {trackingData && (
        <Box>
          {/* Order Summary */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Order Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tracking Number:</strong> {trackingData.trackingNumber}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong> 
                    <Chip 
                      label={trackingData.status} 
                      color="primary" 
                      size="small" 
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                  <Typography variant="body2">
                    <strong>Vehicle:</strong> {trackingData.vehicle.year} {trackingData.vehicle.make} {trackingData.vehicle.model}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Registration:</strong> {trackingData.vehicle.registration}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Driver Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Name:</strong> {trackingData.driver.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {trackingData.driver.phone}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Vehicle:</strong> {trackingData.driver.vehicle}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Pickup and Delivery */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Pickup Location
                  </Typography>
                  <Typography variant="body2">
                    {trackingData.pickup.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {trackingData.pickup.date} at {trackingData.pickup.time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Delivery Location
                  </Typography>
                  <Typography variant="body2">
                    {trackingData.delivery.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {trackingData.delivery.date} at {trackingData.delivery.time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Timeline */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Timeline
              </Typography>
              <Stepper orientation="vertical">
                {trackingData.timeline.map((item, index) => (
                  <Step key={index} active={item.completed} completed={item.completed}>
                    <StepLabel
                      icon={item.completed ? <CheckCircle color="success" /> : index + 1}
                    >
                      <Box>
                        <Typography variant="body1">
                          {item.step}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item.date} at {item.time}
                        </Typography>
                      </Box>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default Tracking; 