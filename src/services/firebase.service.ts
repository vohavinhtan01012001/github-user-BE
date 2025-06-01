import { db } from '../config/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField
} from 'firebase/firestore';

interface OTPData {
  code: string;
  expiryTime: number;
}

export const firebaseService = {
  async saveOTP(phoneNumber: string, code: string): Promise<void> {
    const otpRef = doc(db, 'otps', phoneNumber);
    const expiryTime = Date.now() + 5 * 60 * 1000; 

    await setDoc(otpRef, {
      code,
      expiryTime
    });
  },

  async verifyOTP(phoneNumber: string, code: string): Promise<boolean> {
    const otpRef = doc(db, 'otps', phoneNumber);
    const otpDoc = await getDoc(otpRef);

    if (!otpDoc.exists()) {
      return false;
    }

    const otpData = otpDoc.data() as OTPData;
    const isValid = otpData.code === code && otpData.expiryTime > Date.now();

    if (isValid) {
      await updateDoc(otpRef, {
        code: deleteField(),
        expiryTime: deleteField()
      });
    }

    return isValid;
  },

  async isAuthenticated(phoneNumber: string): Promise<boolean> {
    try {
      const userRef = doc(db, 'users', phoneNumber);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  },

  async getLikedProfiles(phoneNumber: string): Promise<string[]> {
    const userRef = doc(db, 'users', phoneNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return [];
    }

    return userDoc.data().likedProfiles || [];
  },

  async toggleLikedProfile(phoneNumber: string, githubUserId: string): Promise<boolean> {
    const userRef = doc(db, 'users', phoneNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        likedProfiles: [githubUserId]
      });
      return true;
    }

    const likedProfiles = userDoc.data().likedProfiles || [];
    const isLiked = likedProfiles.includes(githubUserId);

    if (isLiked) {
      await updateDoc(userRef, {
        likedProfiles: arrayRemove(githubUserId)
      });
      return false;
    } else {
      await updateDoc(userRef, {
        likedProfiles: arrayUnion(githubUserId)
      });
      return true;
    }
  }
}; 