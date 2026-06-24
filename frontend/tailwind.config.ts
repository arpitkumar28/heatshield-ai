import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#00D4FF',
        background: '#020617',
        'background-dark': '#071A3D',
        'background-light': '#0A2540',
        surface: '#0B1220',
        card: '#121A2B',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        text: '#FFFFFF',
        'text-muted': '#94A3B8',
        border: '#1E293B',
        // Legacy ISRO colors for compatibility
        isro: {
          orange: '#FF6B35',
          blue: '#0066CC',
          dark: '#0A0E27',
          light: '#E8F4F8',
          accent: '#00D4FF'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'isro-gradient': 'linear-gradient(135deg, #050816 0%, #0B1220 50%, #050816 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(255,107,53,0.15) 0%, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255,107,53,0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255,107,53,0.8), 0 0 30px rgba(0,212,255,0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-orange': '0 0 10px rgba(255,107,53,0.5), 0 0 20px rgba(255,107,53,0.3)',
        'neon-blue': '0 0 10px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
export default config
