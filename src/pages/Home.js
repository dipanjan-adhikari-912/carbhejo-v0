import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import LanguageIcon from '@mui/icons-material/Language';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocationSearch from '../components/LocationSearch';
import { MAIN_NAVIGATION } from '../constants/routes';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleBookTransport = () => {
    if (fromLocation && toLocation) {
      // Navigate to auth page with location data for OTP verification
      navigate('/auth', { 
        state: { 
          fromLocation, 
          toLocation 
        } 
      });
    } else {
      // Show error or alert
      alert('Please select both pickup and destination locations');
    }
  };

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 50, color: '#000' }} />,
      title: 'Door-to-Door Service',
      description: 'We pick up your car from your doorstep and deliver it safely to any location across India.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50, color: '#000' }} />,
      title: 'Fully Insured',
      description: 'Your vehicle is fully insured during transit with comprehensive coverage and peace of mind.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 50, color: '#000' }} />,
      title: 'Fast Delivery',
      description: 'Express delivery options available with real-time tracking and status updates.'
    },
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 50, color: '#000' }} />,
      title: 'Professional Transport',
      description: 'Experienced drivers and specialized car carriers for safe and secure transportation.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Cars Transported' },
    { number: '500+', label: 'Cities Covered' },
    { number: '99.8%', label: 'Success Rate' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      location: 'Mumbai to Delhi',
      rating: 5,
      comment: 'Excellent service! My car was delivered safely and on time. Highly recommended!'
    },
    {
      name: 'Priya Patel',
      location: 'Bangalore to Chennai',
      rating: 5,
      comment: 'Professional team and great communication throughout the process.'
    },
    {
      name: 'Amit Kumar',
      location: 'Pune to Hyderabad',
      rating: 5,
      comment: 'Best car transport service I\'ve used. Very reliable and affordable.'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden', fontFamily: 'Montserrat' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
              CarBhejo
            </Typography>
            <Box sx={{ display: 'flex', ml: 4, gap: 3 }}>
              {MAIN_NAVIGATION.map((item) => (
                <Typography 
                  key={item.name}
                  sx={{ 
                    color: item.href === '/' ? '#fff' : '#666', 
                    fontWeight: 500, 
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#fff'
                    }
                  }}
                  onClick={() => navigate(item.href)}
                >
                  {item.name}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ color: '#fff' }}>
              <LanguageIcon />
            </IconButton>
            <Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>EN</Typography>
            <IconButton sx={{ color: '#fff' }}>
              <HelpOutlineIcon />
            </IconButton>
            <Typography sx={{ color: '#fff', fontWeight: 500, cursor: 'pointer' }}>Log in</Typography>
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#fff', 
                color: '#000',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Bar */}
      <Box sx={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 3, py: 1 }}>
            <Typography sx={{ color: '#000', fontWeight: 600, py: 2, borderBottom: '2px solid #000' }}>
              Request a ride
            </Typography>
            <Typography sx={{ color: '#666', fontWeight: 500, py: 2, cursor: 'pointer' }}>
              Reserve a ride
            </Typography>
            <Typography sx={{ color: '#666', fontWeight: 500, py: 2, cursor: 'pointer' }}>
              See prices
            </Typography>
            <Typography sx={{ color: '#666', fontWeight: 500, py: 2, cursor: 'pointer' }}>
              Explore ride options
            </Typography>
            <Typography sx={{ color: '#666', fontWeight: 500, py: 2, cursor: 'pointer' }}>
              Airport rides
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={8} alignItems="center">
          {/* Left Section - Form */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#000',
                mb: 3
              }}
            >
              Request a car transport for now or later
            </Typography>

            {/* Promotion */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 4,
              p: 2,
              backgroundColor: '#f0f8f0',
              borderRadius: 1
            }}>
              <Box sx={{ 
                width: 20, 
                height: 20, 
                backgroundColor: '#4caf50', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>↑</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.9rem', color: '#2e7d32' }}>
                Up to 50% off your first 5 CarBhejo transports. T&Cs apply.*
              </Typography>
            </Box>

            {/* Location Search Fields */}
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LocationSearch
                    label=""
                    placeholder="Enter location"
                    value={fromLocation}
                    onChange={setFromLocation}
                    onLocationSelect={setFromLocation}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f8f9fa',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#000',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#000',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocationSearch
                    label=""
                    placeholder="Enter destination"
                    value={toLocation}
                    onChange={setToLocation}
                    onLocationSelect={setToLocation}
                    sx={{ 
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f8f9fa',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#000',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#000',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                onClick={handleBookTransport}
                sx={{ 
                  backgroundColor: '#000',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#333'
                  }
                }}
              >
                See prices
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: '#000',
                  color: '#000',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                Schedule for later
              </Button>
            </Stack>
          </Grid>

          {/* Right Section - Illustration */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: 500
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 400,
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <DirectionsCarIcon sx={{ fontSize: 120, color: '#fff' }} />
                {/* Decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    width: 60,
                    height: 60,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 40,
                    right: 30,
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: '50%'
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ py: 6, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h3" 
                    component="div"
                    sx={{ 
                      fontWeight: 700,
                      color: '#000',
                      mb: 1
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: '#000'
            }}
          >
            Why Choose CarBhejo?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            We provide the most reliable and professional car transport services across India
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 600, color: '#000' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: '#000',
              mb: 6
            }}
          >
            What Our Customers Say
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      fontStyle: 'italic',
                      lineHeight: 1.6
                    }}
                  >
                    "{testimonial.comment}"
                  </Typography>
                  <Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ fontWeight: 600, color: '#000' }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      {testimonial.location}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home; 