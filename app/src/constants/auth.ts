export enum AuthType {
  MagicLink = 'MagicLink',
  FusionAuth = 'fusion',
  Auth0 = 'Auth0',
}
export const FUSION_AUTH_REDIRECT_URL = `${window.location.origin}/redirect`;

export const Token = {
  AccessToken: 'aptiveUserToken',
  RefreshToken: 'aptiveUserRefreshToken',
};
