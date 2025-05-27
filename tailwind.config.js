/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'josefin': ['Josefin Sans', 'sans-serif'],
                'orbitron': ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
} 