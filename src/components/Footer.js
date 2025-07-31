import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Stack,
  Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { FOOTER_NAVIGATION } from '../constants/routes';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    navigate(href);
  };

  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DirectionsCarIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                CarBhejo
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Professional car transport services across India. Safe, reliable, and insured transportation from door to door.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2024 CarBhejo
              </Typography>
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Services
            </Typography>
            <Stack spacing={1}>
              {FOOTER_NAVIGATION.services.map((item) => (
                <Link
                  key={item.name}
                  component="button"
                  variant="body2"
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    color: '#fff',
                    opacity: 0.8,
                    textDecoration: 'none',
                    textAlign: 'left',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Support
            </Typography>
            <Stack spacing={1}>
              {FOOTER_NAVIGATION.support.map((item) => (
                <Link
                  key={item.name}
                  component="button"
                  variant="body2"
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    color: '#fff',
                    opacity: 0.8,
                    textDecoration: 'none',
                    textAlign: 'left',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {FOOTER_NAVIGATION.company.map((item) => (
                <Link
                  key={item.name}
                  component="button"
                  variant="body2"
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    color: '#fff',
                    opacity: 0.8,
                    textDecoration: 'none',
                    textAlign: 'left',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Partners */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Partners
            </Typography>
            <Stack spacing={1}>
              {FOOTER_NAVIGATION.partners.map((item) => (
                <Link
                  key={item.name}
                  component="button"
                  variant="body2"
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    color: '#fff',
                    opacity: 0.8,
                    textDecoration: 'none',
                    textAlign: 'left',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={1}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {FOOTER_NAVIGATION.legal.map((item) => (
                <Link
                  key={item.name}
                  component="button"
                  variant="body2"
                  onClick={() => handleNavigation(item.href)}
                  sx={{
                    color: '#fff',
                    opacity: 0.8,
                    textDecoration: 'none',
                    textAlign: 'left',
                    fontSize: '0.8rem',
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            All rights reserved. CarBhejo is a registered trademark.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              component="button"
              variant="body2"
              onClick={() => handleNavigation('/legal/privacy')}
              sx={{
                color: '#fff',
                opacity: 0.8,
                textDecoration: 'none',
                '&:hover': {
                  opacity: 1,
                  textDecoration: 'underline'
                }
              }}
            >
              Privacy Policy
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={() => handleNavigation('/legal/terms')}
              sx={{
                color: '#fff',
                opacity: 0.8,
                textDecoration: 'none',
                '&:hover': {
                  opacity: 1,
                  textDecoration: 'underline'
                }
              }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 