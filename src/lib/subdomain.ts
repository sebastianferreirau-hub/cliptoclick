// Domain detection utilities
const MARKETING_DOMAIN = 'cliptoclick.com';
const APP_DOMAIN = 'cliptoclick.app';

export const isMarketingDomain = (): boolean => {
  const hostname = window.location.hostname;
  return hostname === MARKETING_DOMAIN || 
         hostname === `www.${MARKETING_DOMAIN}` ||
         hostname.endsWith(`.${MARKETING_DOMAIN}`);
};

export const isAppDomain = (): boolean => {
  const hostname = window.location.hostname;
  return hostname === APP_DOMAIN || 
         hostname === `www.${APP_DOMAIN}` ||
         hostname.endsWith(`.${APP_DOMAIN}`);
};

export const isLocalhost = (): boolean => {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname.includes('localhost');
};

export const isLovableDomain = (): boolean => {
  const hostname = window.location.hostname;
  return hostname.includes('lovable.app') || hostname.includes('lovableproject.com');
};

export const getMarketingUrl = (path: string = '/'): string => {
  if (isLocalhost() || isLovableDomain()) {
    return path; // Keep on same domain for dev/preview
  }
  return `https://${MARKETING_DOMAIN}${path}`;
};

export const getAppUrl = (path: string = '/'): string => {
  if (isLocalhost() || isLovableDomain()) {
    return path; // Keep on same domain for dev/preview
  }
  return `https://${APP_DOMAIN}${path}`;
};

export const isAdminSubdomain = (): boolean => {
  const hostname = window.location.hostname;
  const adminSubdomain = import.meta.env.VITE_ADMIN_SUBDOMAIN || 'admin';
  return hostname.startsWith(`${adminSubdomain}.`);
};

export const getAdminUrl = (): string => {
  const adminSubdomain = import.meta.env.VITE_ADMIN_SUBDOMAIN || 'admin';
  const hostname = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';
  const protocol = window.location.protocol;
  
  if (hostname.startsWith(`${adminSubdomain}.`)) {
    return window.location.origin;
  }
  
  if (hostname === 'localhost' || hostname.startsWith('localhost')) {
    return `${protocol}//${adminSubdomain}.localhost${port}`;
  }
  
  const baseDomain = hostname.replace(/^[^.]+\./, '');
  return `${protocol}//${adminSubdomain}.${baseDomain}${port}`;
};
