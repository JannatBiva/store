import type { Config } from 'tailwindcss'

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            borderRadius: { DEFAULT: 'var(--radius)' },
            colors: {
                brand: '#00F',
            },
        },
    },
    plugins: [],
} satisfies Config
