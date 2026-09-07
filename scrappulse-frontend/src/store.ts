import { create } from 'zustand';

type UserRole = 'collector' | 'recycler' | 'maker' | null;

interface AppState {
  // Auth State
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;

  // App Shell State
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Notification State
  notifications: number;
  incrementNotifications: () => void;
  clearNotifications: () => void;

  // Active Pulses State
  activePulsesCount: number;
  setActivePulsesCount: (count: number) => void;
  isPulsePanelOpen: boolean;
  togglePulsePanel: () => void;

  // Offline Sync State
  offlinePendingCount: number;
  setOfflinePendingCount: (count: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  login: (role) => set({ isAuthenticated: true, userRole: role }),
  logout: () => set({ isAuthenticated: false, userRole: null }),

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  notifications: 3,
  incrementNotifications: () => set((state) => ({ notifications: state.notifications + 1 })),
  clearNotifications: () => set({ notifications: 0 }),

  activePulsesCount: 2,
  setActivePulsesCount: (count) => set({ activePulsesCount: count }),
  isPulsePanelOpen: false,
  togglePulsePanel: () => set((state) => ({ isPulsePanelOpen: !state.isPulsePanelOpen })),

  offlinePendingCount: 0,
  setOfflinePendingCount: (count) => set({ offlinePendingCount: count }),
}));
