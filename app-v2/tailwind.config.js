/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // iOS grouped background
        ios: '#F2F2F7',
        // Synaptik palette (from the design brief)
        navy: '#1E2A5A',
        'navy-hover': '#0F1735',
        turquoise: '#2BB6A8',
        'turquoise-text': '#0E6158',
        'caution-fill': '#FDEBDA',
        'caution-text': '#8A4A0F',
        'danger-border': '#E5484D',
        'danger-fill': '#FCE4E4',
        'danger-text': '#B4262B',
        'ink': '#1C1C1E',
        'ink-2': '#2C2C30',
        'muted': '#5E5E66',
        'muted-2': '#6C6C72',
        'hairline': '#E5E5EA',
      },
      fontFamily: {
        sys: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '22px',
        'card-xl': '24px',
      },
    },
  },
  plugins: [],
};
