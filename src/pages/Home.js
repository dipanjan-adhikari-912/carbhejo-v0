import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Door-to-Door Service',
      description: 'We pick up your car from your doorstep and deliver it to any location across India.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fully Insured',
      description: 'Your vehicle is fully insured during transit with comprehensive coverage.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fast Delivery',
      description: 'Express delivery options available with real-time tracking.'
    },
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Professional Transport',
      description: 'Experienced drivers and specialized car carriers for safe transportation.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            CarBhejo
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Professional Car Transport Service Across India
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
            Safe, reliable, and insured car transportation from door to door
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/auth')}
            sx={{ 
              backgroundColor: 'white', 
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100'
              }
            }}
          >
            Book Your Transport Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Why Choose CarBhejo?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Transport Your Car?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Get instant quotes and book your car transport service in minutes
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/auth')}
            sx={{ mr: 2 }}
          >
            Book Transport
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            onClick={() => navigate('/tracking')}
          >
            Track Order
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 