import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Create a new user profile in Firestore
export const createUserProfile = async (user, additionalData = {}) => {
  try {
    console.log('Creating user profile for:', user.uid, user.phoneNumber);
    const userRef = doc(db, 'users', user.uid);
    
    const userData = {
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isProfileComplete: false,
      // Profile fields
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      gender: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      // Additional fields for future scalability
      bookings: [],
      bookingHistory: [],
      paymentMethods: [],
      preferences: {
        notifications: true,
        emailUpdates: false,
        smsUpdates: true
      },
      // Stats
      totalBookings: 0,
      totalSpent: 0,
      memberSince: serverTimestamp(),
      ...additionalData
    };

    console.log('User data to save:', userData);
    await setDoc(userRef, userData);
    console.log('User profile created successfully');
    return { success: true, data: userData };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error };
  }
};

// Get user profile by UID
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { success: false, error };
  }
};

// Update user profile
export const updateUserProfile = async (uid, updateData) => {
  try {
    const userRef = doc(db, 'users', uid);
    
    const updatePayload = {
      ...updateData,
      updatedAt: serverTimestamp()
    };

    // If profile fields are being updated, mark profile as complete
    if (updateData.firstName || updateData.lastName || updateData.dateOfBirth) {
      updatePayload.isProfileComplete = true;
    }

    await updateDoc(userRef, updatePayload);
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }
};

// Check if user exists by phone number
export const getUserByPhone = async (phoneNumber) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { success: true, data: { id: userDoc.id, ...userDoc.data() } };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user by phone:', error);
    return { success: false, error };
  }
};

// Add booking to user's booking history
export const addBookingToUser = async (uid, bookingData) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const updatedBookings = [...userData.bookings, bookingData];
      
      await updateDoc(userRef, {
        bookings: updatedBookings,
        totalBookings: userData.totalBookings + 1,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error adding booking to user:', error);
    return { success: false, error };
  }
};

// Get user's booking history
export const getUserBookings = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data();
      return { success: true, data: userData.bookings || [] };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user bookings:', error);
    return { success: false, error };
  }
}; 