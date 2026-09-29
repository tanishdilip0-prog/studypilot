import { UserPreferences, UserProfile } from '../types';
import { defaultPreferences, mockUser } from '../data/mockData';

export const UserService = {
  async getProfile(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return { ...mockUser };
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return { ...mockUser, ...updates };
  },

  async getPreferences(): Promise<UserPreferences> {
    await new Promise((resolve) => setTimeout(resolve, 80));
    return { ...defaultPreferences };
  },

  async updatePreferences(updates: Partial<UserPreferences>): Promise<UserPreferences> {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return { ...defaultPreferences, ...updates };
  },
};
