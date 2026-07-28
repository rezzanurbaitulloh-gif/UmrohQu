/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        'primary-dark': '#059669',
        'primary-light': '#34D399',
        secondary: '#F1F5F9',
        muted: '#F8FAFC',
        'muted-foreground': '#64748B',
        accent: '#F0FDF4',
        'accent-foreground': '#1E293B',
        destructive: '#EF4444',
        border: '#E2E8F0',
        input: '#E2E8F0',
        ring: '#10B981',
        'chart-1': '#10B981',
        'chart-2': '#34D399',
        'chart-3': '#059669',
        'chart-4': '#6EE7B7',
        'chart-5': '#047857',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        default: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};