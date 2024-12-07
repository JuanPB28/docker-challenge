/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Azul principal
        secondary: '#ffed4a', // Amarillo
        accent: '#f9a8d4', // Rosa
        dark: '#2d3748', // Gris oscuro
      },
      fontFamily: {
        custom: ['"Roboto"', 'sans-serif'], // Fuente personalizada
      },
      spacing: {
        '128': '32rem', // Tamaño de espacio personalizado
      },
    },
  },
  plugins: [],
}
