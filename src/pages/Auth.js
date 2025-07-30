import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signInWithOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const steps = ['Enter Phone Number', 'Verify OTP'];

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setError('Please enter a valid phone number');
      return;
    }

    // Format phone number to include country code if not present
    let formattedPhone = phone;
    if (!phone.startsWith('+')) {
      formattedPhone = `+91${phone}`; // Default to India (+91)
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await signInWithOtp(formattedPhone);
      
      if (error) {
        setError(error.message || 'Failed to send OTP. Please try again.');
      } else {
        setSuccess('OTP sent successfully! Check your phone for the code.');
        setStep(1);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await verifyOtp(otp);
      
      if (error) {
        setError(error.message || 'Invalid OTP. Please try again.');
      } else {
        setSuccess('Authentication successful! Redirecting...');
        setTimeout(() => {
          navigate('/booking');
        }, 1500);
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(0);
    setOtp('');
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to CarBhejo
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          Sign in or create an account to continue
        </Typography>

        <Stepper activeStep={step} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

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

        {step === 0 ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Enter Your Phone Number
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              We'll send you a one-time password (OTP) to verify your number
            </Typography>
            
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              type="tel"
              sx={{ mb: 3 }}
              helperText="Enter with or without country code (e.g., +919876543210 or 9876543210)"
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSendOtp}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Enter OTP
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Enter the 6-digit code sent to {phone}
            </Typography>
            
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              type="text"
              inputProps={{ maxLength: 6 }}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleVerifyOtp}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ flex: 1 }}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={handleSendOtp}
                disabled={loading}
                size="small"
              >
                Resend OTP
              </Button>
            </Box>
          </Box>
        )}

        {/* reCAPTCHA container for Firebase */}
        <div id="recaptcha-container"></div>
      </Paper>
    </Container>
  );
};

export default Auth; 