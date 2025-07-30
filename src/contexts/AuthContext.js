import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  onAuthStateChanged,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../config/firebase';

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
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow sending OTP
          console.log('reCAPTCHA verified');
        }
      });
    }
  };

  const signInWithOtp = async (phone) => {
    try {
      setupRecaptcha(phone);
      
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      
      setConfirmationResult(confirmationResult);
      return { error: null };
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { error };
    }
  };

  const verifyOtp = async (otp) => {
    try {
      if (!confirmationResult) {
        throw new Error('No confirmation result available');
      }
      
      const result = await confirmationResult.confirm(otp);
      setConfirmationResult(null);
      
      return { data: result, error: null };
    } catch (error) {
      console.error('Error verifying OTP:', error);
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