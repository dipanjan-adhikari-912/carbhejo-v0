import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const steps = ['Pickup Details', 'Delivery Details', 'Vehicle Information', 'Review & Book'];

const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    pickup: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      coordinates: [20.5937, 78.9629] // Default to India center
    },
    delivery: {
      address: '',
      city: '',
      state: '',
      pincode: '',
      coordinates: [20.5937, 78.9629]
    },
    vehicle: {
      make: '',
      model: '',
      year: '',
      type: '',
      registration: ''
    }
  });



  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (section, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const calculatePrice = () => {
    // Simple distance-based calculation (in real app, this would use actual distance API)
    const basePrice = 5000; // Base price in INR
    const pricePerKm = 15; // Price per km
    const estimatedDistance = 500; // This would be calculated from actual coordinates
    
    return basePrice + (estimatedDistance * pricePerKm);
  };

  const handleBooking = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Booking successful! You will receive a confirmation email shortly.');
    }, 2000);
  };

  const renderPickupDetails = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pickup Location
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Pickup Address"
            value={bookingData.pickup.address}
            onChange={(e) => handleInputChange('pickup', 'address', e.target.value)}
            placeholder="Enter your pickup address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={bookingData.pickup.city}
            onChange={(e) => handleInputChange('pickup', 'city', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            value={bookingData.pickup.state}
            onChange={(e) => handleInputChange('pickup', 'state', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pincode"
            value={bookingData.pickup.pincode}
            onChange={(e) => handleInputChange('pickup', 'pincode', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Pickup Location Map
          </Typography>
          <Box sx={{ height: 300, width: '100%', border: '1px solid #ccc' }}>
            <MapContainer
              center={bookingData.pickup.coordinates}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={bookingData.pickup.coordinates}>
                <Popup>Pickup Location</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDeliveryDetails = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Delivery Location
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Delivery Address"
            value={bookingData.delivery.address}
            onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
            placeholder="Enter delivery address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={bookingData.delivery.city}
            onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            value={bookingData.delivery.state}
            onChange={(e) => handleInputChange('delivery', 'state', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pincode"
            value={bookingData.delivery.pincode}
            onChange={(e) => handleInputChange('delivery', 'pincode', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Delivery Location Map
          </Typography>
          <Box sx={{ height: 300, width: '100%', border: '1px solid #ccc' }}>
            <MapContainer
              center={bookingData.delivery.coordinates}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={bookingData.delivery.coordinates}>
                <Popup>Delivery Location</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderVehicleDetails = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Vehicle Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Make"
            value={bookingData.vehicle.make}
            onChange={(e) => handleInputChange('vehicle', 'make', e.target.value)}
            placeholder="e.g., Maruti, Hyundai, Honda"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vehicle Model"
            value={bookingData.vehicle.model}
            onChange={(e) => handleInputChange('vehicle', 'model', e.target.value)}
            placeholder="e.g., Swift, i20, City"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Year of Manufacture"
            value={bookingData.vehicle.year}
            onChange={(e) => handleInputChange('vehicle', 'year', e.target.value)}
            placeholder="e.g., 2020"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              value={bookingData.vehicle.type}
              label="Vehicle Type"
              onChange={(e) => handleInputChange('vehicle', 'type', e.target.value)}
            >
              <MenuItem value="hatchback">Hatchback</MenuItem>
              <MenuItem value="sedan">Sedan</MenuItem>
              <MenuItem value="suv">SUV</MenuItem>
              <MenuItem value="muv">MUV</MenuItem>
              <MenuItem value="luxury">Luxury</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Registration Number"
            value={bookingData.vehicle.registration}
            onChange={(e) => handleInputChange('vehicle', 'registration', e.target.value)}
            placeholder="e.g., MH12AB1234"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderReview = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Review Your Booking
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pickup Details
              </Typography>
              <Typography variant="body2">
                {bookingData.pickup.address}, {bookingData.pickup.city}, {bookingData.pickup.state} - {bookingData.pickup.pincode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Details
              </Typography>
              <Typography variant="body2">
                {bookingData.delivery.address}, {bookingData.delivery.city}, {bookingData.delivery.state} - {bookingData.delivery.pincode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vehicle Details
              </Typography>
              <Typography variant="body2">
                {bookingData.vehicle.year} {bookingData.vehicle.make} {bookingData.vehicle.model} ({bookingData.vehicle.type})
              </Typography>
              <Typography variant="body2">
                Registration: {bookingData.vehicle.registration}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Alert severity="info">
            <Typography variant="h6">
              Estimated Price: ₹{calculatePrice().toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Final price will be confirmed after route optimization and vehicle inspection.
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderPickupDetails();
      case 1:
        return renderDeliveryDetails();
      case 2:
        return renderVehicleDetails();
      case 3:
        return renderReview();
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Book Your Car Transport
      </Typography>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleBooking}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Booking; 