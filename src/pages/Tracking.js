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
      address: '456 Park Avenue, Delhi, Delhi - 110001',
      estimatedDate: '2024-01-18',
      estimatedTime: '2:00 PM'
    },
    vehicle: {
      make: 'Maruti',
      model: 'Swift',
      year: '2020',
      registration: 'MH12AB1234'
    },
    currentLocation: 'Agra, Uttar Pradesh',
    driver: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      vehicleNumber: 'UP80AB1234'
    },
    timeline: [
      {
        step: 'Booking Confirmed',
        date: '2024-01-14',
        time: '3:30 PM',
        completed: true,
        description: 'Your booking has been confirmed and assigned to a driver'
      },
      {
        step: 'Driver Assigned',
        date: '2024-01-15',
        time: '8:00 AM',
        completed: true,
        description: 'Driver Rajesh Kumar has been assigned to your transport'
      },
      {
        step: 'Pickup Completed',
        date: '2024-01-15',
        time: '10:30 AM',
        completed: true,
        description: 'Vehicle has been picked up from the pickup location'
      },
      {
        step: 'In Transit',
        date: '2024-01-16',
        time: '2:00 PM',
        completed: true,
        description: 'Vehicle is currently in transit to delivery location'
      },
      {
        step: 'Out for Delivery',
        date: '2024-01-18',
        time: '10:00 AM',
        completed: false,
        description: 'Vehicle will be delivered to the specified address'
      },
      {
        step: 'Delivered',
        date: '2024-01-18',
        time: '2:00 PM',
        completed: false,
        description: 'Vehicle has been successfully delivered'
      }
    ]
  };

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      alert('Please enter a tracking number');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setLoading(false);
    }, 1000);
  };



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Track Your Car Transport
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
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleTrack}
            disabled={loading}
            startIcon={<SearchIcon />}
            sx={{ minWidth: 120 }}
          >
            {loading ? 'Tracking...' : 'Track'}
          </Button>
        </Box>
      </Paper>

      {/* Tracking Results */}
      {trackingData && (
        <Box>
          {/* Status Overview */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Tracking Number: {trackingData.trackingNumber}
                  </Typography>
                  <Chip 
                    label={trackingData.status} 
                    color="primary" 
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Current Location: {trackingData.currentLocation}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Vehicle Details
                  </Typography>
                  <Typography variant="body2">
                    {trackingData.vehicle.year} {trackingData.vehicle.make} {trackingData.vehicle.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registration: {trackingData.vehicle.registration}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Driver Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Driver Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Driver Name</Typography>
                  <Typography variant="body2">{trackingData.driver.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Contact Number</Typography>
                  <Typography variant="body2">{trackingData.driver.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="subtitle2">Vehicle Number</Typography>
                  <Typography variant="body2">{trackingData.driver.vehicleNumber}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Pickup and Delivery Details */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Pickup Details
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {trackingData.pickup.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Date: {trackingData.pickup.date} at {trackingData.pickup.time}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <DirectionsCar sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Delivery Details
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {trackingData.delivery.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estimated: {trackingData.delivery.estimatedDate} at {trackingData.delivery.estimatedTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Timeline */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Transport Timeline
              </Typography>
              <Stepper orientation="vertical">
                {trackingData.timeline.map((item, index) => (
                  <Step key={index} active={item.completed} completed={item.completed}>
                    <StepLabel
                      StepIconComponent={item.completed ? CheckCircle : undefined}
                      StepIconProps={{
                        sx: {
                          color: item.completed ? 'success.main' : 'grey.400'
                        }
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          {item.step}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.date} at {item.time}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {item.description}
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

      {/* Help Section */}
      {!trackingData && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="body2" paragraph>
              • Enter your tracking number to check the status of your car transport
            </Typography>
            <Typography variant="body2" paragraph>
              • Tracking numbers are provided in your booking confirmation email
            </Typography>
            <Typography variant="body2" paragraph>
              • For any issues, contact our customer support at support@carbhejo.com
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Tracking; 