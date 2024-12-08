/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','localhost','img.icons8.com','truelysell.dreamstechnologies.com','images.unsplash.com'], // Add your Cloudinary domain here
      },
      experimental: {
        missingSuspenseWithCSRBailout: false,
      },
};

export default nextConfig;
