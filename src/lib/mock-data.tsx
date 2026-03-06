import React from 'react';
import type { Astrologer } from '@/types';

export const mockAstrologers: Astrologer[] = [
  {
    id: 1,
    name: 'Bhavisha Barot',
    photo_url: null,
    specializations: ['Vedic'],
    experience_years: 3,
    languages: ['Hindi', 'Gujarati'],
    total_orders: 574,
    total_chats: 1200,
    rating: 4.8,
    price_per_min: 10,
    price_per_chat: null,
    discount_percent: 0,
    is_ai: false,
    is_verified: true,
    is_available: true,
    bio: 'Experienced Vedic astrologer specializing in relationship and career guidance.',
    created_at: '',
  },
  {
    id: 2,
    name: 'AI Riya',
    photo_url: null,
    specializations: ['Vedic', 'AI Astrology'],
    experience_years: null,
    languages: ['Hindi', 'English'],
    total_orders: 0,
    total_chats: 25600,
    rating: 4.9,
    price_per_min: null,
    price_per_chat: 50,
    discount_percent: 100,
    is_ai: true,
    is_verified: true,
    is_available: true,
    bio: 'AI-powered astrologer providing instant, personalized Vedic astrology insights 24/7.',
    created_at: '',
  },
  {
    id: 3,
    name: 'Ashok Shukla',
    photo_url: null,
    specializations: ['Vedic', 'Prashna'],
    experience_years: 28,
    languages: ['Hindi'],
    total_orders: 463,
    total_chats: 890,
    rating: 4.7,
    price_per_min: 31,
    price_per_chat: null,
    discount_percent: 59,
    is_ai: false,
    is_verified: true,
    is_available: true,
    bio: 'Senior Vedic and Prashna astrologer with 28 years of experience.',
    created_at: '',
  },
  {
    id: 4,
    name: 'Divyakant Akruvala',
    photo_url: null,
    specializations: ['Vedic'],
    experience_years: 20,
    languages: ['Hindi', 'English'],
    total_orders: 309,
    total_chats: 650,
    rating: 4.6,
    price_per_min: 36,
    price_per_chat: null,
    discount_percent: 10,
    is_ai: false,
    is_verified: true,
    is_available: false,
    bio: 'Dedicated Vedic astrologer with 20 years of experience.',
    created_at: '',
  },
  {
    id: 5,
    name: 'AI Kiran',
    photo_url: null,
    specializations: ['Vedic', 'Numerology', 'AI Astrology'],
    experience_years: null,
    languages: ['Hindi', 'English', 'Tamil'],
    total_orders: 0,
    total_chats: 18200,
    rating: 4.8,
    price_per_min: null,
    price_per_chat: 50,
    discount_percent: 100,
    is_ai: true,
    is_verified: true,
    is_available: true,
    bio: 'Analytical AI astrologer combining Vedic wisdom with numerology.',
    created_at: '',
  },
];

interface ExploreFeature {
  title: string;
  subtitle: string;
  badge: string;
  href: string;
  gradient: string;
  iconBg: string;
  icon: React.ReactNode;
  comingSoon: boolean;
  textClass?: string;
  subtitleClass?: string;
  iconBorderClass?: string;
}

export const exploreFeatures: ExploreFeature[] = [
  {
    title: 'CHAT',
    subtitle: 'Chat and Get Answers',
    badge: 'FREE AI CHAT',
    href: '/chat',
    gradient: 'from-primary to-indigo-600',
    iconBg: 'bg-white/30',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      </svg>
    ),
    comingSoon: false,
  },
  {
    title: 'PANCHANG',
    subtitle: "Today's Good Time",
    badge: 'KRISHNA PRATIPADA',
    href: '/panchang',
    gradient: 'from-[#800020] to-[#a0153e]',
    iconBg: 'bg-[#c2185b]/50',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 3h-1V2h-2v1H7V2H5v1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
        <circle cx="9" cy="13" r="1.5" />
        <circle cx="15" cy="13" r="1.5" />
        <circle cx="12" cy="17" r="1.5" />
      </svg>
    ),
    comingSoon: false,
  },
  {
    title: 'COMPATIBILITY',
    subtitle: 'Check Your Match',
    badge: 'GUN MILAN',
    href: '/compatibility',
    gradient: 'from-pink-600 to-rose-500',
    iconBg: 'bg-pink-400/50',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    comingSoon: false,
  },
  {
    title: 'KUNDLI',
    subtitle: 'Birth Chart Insights',
    badge: 'BIRTH CHART',
    href: '/kundli',
    gradient: 'from-red-600 to-red-500',
    iconBg: 'bg-red-400/50',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    comingSoon: false,
  },
  {
    title: 'CALCULATORS',
    subtitle: 'Vedic Calculators',
    badge: 'NEW',
    href: '/calculators',
    gradient: 'from-orange-500 to-orange-600',
    iconBg: 'bg-orange-400/50',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        <path d="M12 7l1.2 3.8L17 12l-3.8 1.2L12 17l-1.2-3.8L7 12l3.8-1.2z" />
      </svg>
    ),
    comingSoon: false,
  },
  {
    title: 'MUHURAT',
    subtitle: 'Auspicious Times',
    badge: 'SHUBH MUHURAT',
    href: '/muhurat',
    gradient: 'from-yellow-500 to-yellow-400',
    iconBg: 'bg-yellow-300/50',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
    comingSoon: false,
  },
  {
    title: 'CALENDAR',
    subtitle: 'Festivals & Panchang',
    badge: 'HINDU CALENDAR',
    href: '/calendar',
    gradient: 'from-amber-500 to-yellow-500',
    iconBg: 'bg-amber-400/50',
    icon: (
      <svg className="w-7 h-7 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
        <circle cx="9" cy="14" r="1.2" />
        <circle cx="15" cy="14" r="1.2" />
        <circle cx="12" cy="14" r="1.2" />
        <circle cx="9" cy="17.5" r="1.2" />
        <circle cx="12" cy="17.5" r="1.2" />
      </svg>
    ),
    comingSoon: false,
  },
];
