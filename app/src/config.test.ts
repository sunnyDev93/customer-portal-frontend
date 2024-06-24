import {getConfig} from './config';

describe('getConfig', () => {
    it('returns the expected configuration with audience', () => {
        const configJson = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: 'YOUR_AUTH0_AUDIENCE'
        };

        const expectedConfig = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: 'YOUR_AUTH0_AUDIENCE'
        };

        jest.mock('./auth_config', () => configJson);

        const config = getConfig();
        expect(config).toEqual(expectedConfig);
    });

    it('returns the expected configuration without audience (default value)', () => {
        const configJson = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: "YOUR_AUTH0_AUDIENCE"
        };

        const expectedConfig = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: "YOUR_AUTH0_AUDIENCE"
        };

        jest.mock('./auth_config', () => configJson);

        const config = getConfig();
        expect(config).toEqual(expectedConfig);
    });

    it('returns the expected configuration without audience (null value)', () => {
        const configJson = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: null
        };

        const expectedConfig = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: "YOUR_AUTH0_AUDIENCE"
        };

        jest.mock('./auth_config', () => configJson);

        const config = getConfig();
        expect(config).toEqual(expectedConfig);
    });

    it('handles audience as "YOUR_API_IDENTIFIER"', () => {
        const configJson = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: 'YOUR_AUTH0_AUDIENCE'
        };

        const expectedConfig = {
            domain: 'YOUR_AUTH0_DOMAIN',
            clientId: 'YOUR_AUTH0_CLIENT_ID',
            audience: 'YOUR_AUTH0_AUDIENCE'
        };

        jest.mock('./auth_config', () => configJson);

        const config = getConfig();
        expect(config).toEqual(expectedConfig);
    });
});
