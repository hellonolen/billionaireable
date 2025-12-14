/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'art-black': '#000000',
                'art-offwhite': '#E6E4DC', // Darker warm paper for contrast
                'art-orange': '#ff8c37',   // Vibrant Architectural Orange
                'art-green': '#34d399',    // Vivid Green
                'art-blue': '#3b82f6',     // International Blue
                'art-yellow': '#facc15',   // Safety Yellow
                'art-red': '#ef4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'hard': '8px 8px 0px 0px #000000',
                'hard-sm': '4px 4px 0px 0px #000000',
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
}
