import auth_config from './auth_config';

describe('Auth0 Configuration', () => {
    it('has the expected properties and values', () => {
        const expectedConfig = {
            domain: process.env.REACT_APP_AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN',
            clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'YOUR_AUTH0_CLIENT_ID',
            audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'YOUR_AUTH0_AUDIENCE'
        };

        expect(auth_config).toEqual(expectedConfig);
    });

    it('has a non-empty domain', () => {
        expect(auth_config.domain).toBeTruthy();
    });

    it('has a non-empty clientId', () => {
        expect(auth_config.clientId).toBeTruthy();
    });

    it('has a non-empty audience', () => {
        expect(auth_config.audience).toBeTruthy();
    });

    it('uses default values if environment variables are not provided', () => {
        const configWithoutEnv = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: 'YOUR_AUTH0_AUDIENCE'
        };

        // Temporarily clear environment variables to simulate missing values
        const originalEnv = process.env;
        process.env = {};

        try {
            const config = require('./auth_config').default;
            expect(config).toEqual(configWithoutEnv);
        } finally { // Restore the original environment variables
            process.env = originalEnv;
        }
    });

});
