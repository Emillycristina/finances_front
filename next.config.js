/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/Login', // Substitua 'sua-rota-personalizada' pelo caminho desejado
            permanent: true, // Define o redirecionamento como permanente (HTTP 301)
          },
        ];
      },
}

module.exports = nextConfig
