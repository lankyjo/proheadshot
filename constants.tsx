
import React from 'react';

export const COLORS = [
  '#0F0F0F', '#1A1A1A', '#333333', '#4D4D4D', 
  '#FFFDF5', '#F5F5DC', '#E8E8D0', '#D0D0B8',
  '#2C3E50', '#7F8C8D', '#BDC3C7', '#ECF0F1'
];

export const Icons = {
  Upload: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Refresh: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  Tie: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2L9 7l1.5 12L12 22l1.5-3L15 7l-3-5z" />
    </svg>
  ),
  NoTie: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L9 7l1.5 12L12 22l1.5-3L15 7l-3-5z" opacity="0.2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Maximize: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  View: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
};

export const GlassesIcons: Record<string, React.ReactNode> = {
  'None': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ),
  'Classic Wayfarer': (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-10 h-10">
      <path d="M10 18c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h8c1 0 1.5-.5 2-1.5l1.5-3.5h5l1.5 3.5c.5 1 1 1.5 2 1.5h8c2.2 0 4-1.8 4-4v-4c0-2.2-1.8-4-4-4H10zm0 3h8c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-8c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm20 0h8c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-8c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1z"/>
    </svg>
  ),
  'Round Minimalist': (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-10 h-10">
      <circle cx="14" cy="24" r="8" />
      <circle cx="34" cy="24" r="8" />
      <path d="M22 24c0-1.5 1-2.5 2-2.5s2 1 2 2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'Modern Rectangular': (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-10 h-10">
      <rect x="6" y="20" width="16" height="8" rx="1" />
      <rect x="26" y="20" width="16" height="8" rx="1" />
      <path d="M22 24h4" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'Chic Cat-eye': (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-10 h-10">
      <path d="M6 18c0 0 1 8 8 8s10-6 10-6m18-2c0 0-1 8-8 8s-10-6-10-6" />
      <path d="M20 20c1-2 3-2 4 0" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'Professional Aviator': (
    <svg viewBox="0 0 48 48" fill="currentColor" className="w-10 h-10">
      <path d="M6 20c0 0 2 12 10 12s8-12 8-12m18 0c0 0-2 12-10 12s-8-12-8-12" />
      <path d="M22 22h4m-4-3h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
};
