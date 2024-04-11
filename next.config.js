const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

