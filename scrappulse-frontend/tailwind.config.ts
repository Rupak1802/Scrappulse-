/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          green: "#2E7D32",
        },
        teal: {
          DEFAULT: "#00897B",
        },
        navy: {
          DEFAULT: "#1B2A4A",
        },
        amber: {
          DEFAULT: "#F9A825",
        },
        neutral: {
          50: '#F7F8F9',
          100: '#E1E3E6',
          900: '#0B0F14',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        full: '9999px',
      }
    },
  },
  plugins: [],
}
