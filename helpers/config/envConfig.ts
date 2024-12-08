export const getBaseUrl = (): any => {
    const environment = process.env.NODE_ENV;

    switch (environment) {
        case 'development':
            return 'http://localhost:6060/api/v1'; 
        case 'production':
            return 'https://home-crafter-backend.vercel.app/api/v1';
        default:
            return 'https://home-crafter-backend.vercel.app/api/v1'; 
    }
};