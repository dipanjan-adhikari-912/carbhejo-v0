import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUserProfile, getUserByPhone } from '../services/userService';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const setupRecaptcha = (phoneNumber) => {
    try {
      // Clear any existing reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      // Clear the container
      const container = document.getElementById('recaptcha-container');
      if (container) {
        container.innerHTML = '';
      }
      
      // Create new reCAPTCHA verifier
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          window.recaptchaVerifier = null;
        }
      });
      
      console.log('reCAPTCHA setup completed');
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      // Reset on error
      window.recaptchaVerifier = null;
      throw error;
    }
  };

  const signInWithOtp = async (phone) => {
    try {
      setupRecaptcha(phone);
      
      const appVerifier = window.recaptchaVerifier;
      console.log('Sending OTP to:', phone);
      
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      
      setConfirmationResult(confirmationResult);
      console.log('OTP sent successfully');
      return { error: null };
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Clear reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (clearError) {
          console.log('Error clearing reCAPTCHA:', clearError);
        }
        window.recaptchaVerifier = null;
      }
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send OTP. Please try again.';
      
      if (error.message && error.message.includes('reCAPTCHA has already been rendered')) {
        errorMessage = 'Please refresh the page and try again.';
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format. Please use international format (e.g., +919876543210)';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
      } else if (error.code === 'auth/quota-exceeded') {
        errorMessage = 'SMS quota exceeded. Please try again later.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Phone authentication is not enabled. Please contact support.';
      } else if (error.code === 'auth/billing-not-enabled') {
        errorMessage = 'Billing not enabled. Please enable billing in Firebase Console or use test phone numbers.';
      }
      
      return { error: { ...error, message: errorMessage } };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      if (!confirmationResult) {
        throw new Error('No confirmation result available');
      }
      
      console.log('Verifying OTP...');
      const result = await confirmationResult.confirm(otp);
      console.log('OTP verified successfully:', result);
      setConfirmationResult(null);
      
      // Check if user already exists in our database
      console.log('Checking if user exists in database...');
      const existingUser = await getUserByPhone(result.user.phoneNumber);
      
      if (!existingUser.success) {
        console.log('Creating new user profile...');
        // Create new user profile if user doesn't exist
        const createResult = await createUserProfile(result.user);
        if (!createResult.success) {
          console.error('Failed to create user profile:', createResult.error);
        } else {
          console.log('User profile created successfully');
        }
      } else {
        console.log('User already exists in database');
      }
      
      return { data: result, error: null };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setConfirmationResult(null); // Clear on error
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  };

  const value = {
    user,
    loading,
    signInWithOtp,
    verifyOtp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 