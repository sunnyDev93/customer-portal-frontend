interface AuthConfig {
  domain: string;
  clientId: string;
  audience: string;
}

const auth0_config: AuthConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'YOUR_AUTH0_CLIENT_ID',
  audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'YOUR_AUTH0_AUDIENCE',
};

export default auth0_config;
