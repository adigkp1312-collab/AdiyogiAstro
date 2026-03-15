import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cosmic primary palette
        primary: '#8B5CF6',
        'primary-dark': '#6D28D9',
        'primary-light': '#A78BFA',
        accent: '#F59E0B',
        'accent-light': '#FBBF24',
        'accent-dark': '#D97706',

        // Status colors
        positive: '#10B981',
        'positive-light': '#064E3B',
        neutral: '#F59E0B',
        'neutral-light': '#78350F',
        negative: '#F43F5E',
        'negative-light': '#4C0519',

        // Cosmic backgrounds
        background: '#0B0A1A',
        surface: '#110F24',
        'surface-alt': '#1A1735',
        'surface-card': '#1E1B38',
        'surface-elevated': '#252248',

        // Text
        'text-primary': '#F1F0FF',
        'text-secondary': '#8B8AA0',
        'text-accent': '#C4B5FD',

        // Borders
        border: '#2D2A5E',
        'border-light': '#3D3A7E',

        // Dark mode (for special cards)
        dark: {
          bg: '#0B0A1A',
          surface: '#1E1B38',
          text: '#F1F0FF',
          'text-secondary': '#8B8AA0',
          accent: '#F59E0B',
          positive: '#10B981',
          neutral: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'Calibri', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
        'pill': '24px',
        'badge': '16px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(139, 92, 246, 0.08)',
        'elevated': '0 8px 32px rgba(139, 92, 246, 0.15)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.2)',
        'nav': '0 -4px 20px rgba(11, 10, 26, 0.8)',
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.1)',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0B0A1A 0%, #1A1735 50%, #0F0D2B 100%)',
        'card-gradient': 'linear-gradient(145deg, #1E1B38 0%, #252248 100%)',
        'purple-glow': 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
        'gold-glow': 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1), transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #1A1735 0%, #0B0A1A 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
