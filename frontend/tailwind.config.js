/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic Theme Colors
                app: 'var(--bg-main)',
                surface: 'var(--bg-surface)',
                primary: 'var(--text-main)',
                secondary: 'var(--text-body)',
                muted: 'var(--text-muted)',
                border: 'var(--border-color)',

                // Neutral Cream (Legacy Mapped)
                cream: {
                    50: 'var(--bg-main)',
                    100: 'var(--bg-main)',
                    200: 'var(--border-color)',
                    300: '#D8D0C0',
                },
                ivory: 'var(--bg-main)',

                // Ink (Legacy Mapped)
                ink: {
                    900: 'var(--text-main)',
                    600: 'var(--text-body)',
                    400: 'var(--text-muted)',
                },

                // Accents
                sage: {
                    50: '#F4F7F4',
                    100: '#E3EBE3',
                    500: '#84A59D',
                    600: '#6B8E85',
                },
                softBlue: {
                    50: '#F0F4F8',
                    100: '#D9E2EC',
                    500: 'var(--accent-primary)',
                    600: '#667EEA',
                },
                warmOrange: {
                    50: '#FFF8F4',
                    100: '#FFE8D9',
                    500: '#F6AD55',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'float': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                'glow': '0 0 15px rgba(127, 156, 245, 0.3)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'water-ripple': 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                'subtle-zoom': 'zoom 10s ease-in-out infinite alternate',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                ripple: {
                    '0%': {
                        transform: 'scale(0.9)',
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'scale(2)',
                        opacity: '0',
                    },
                },
                zoom: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
