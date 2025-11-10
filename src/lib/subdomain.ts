export const isAdminSubdomain = (): boolean => {
  const hostname = window.location.hostname;
  const adminSubdomain = import.meta.env.VITE_ADMIN_SUBDOMAIN || 'admin';
  
  // Check if current hostname starts with admin subdomain
  // Works for: admin.domain.com, admin.localhost, etc.
  return hostname.startsWith(`${adminSubdomain}.`);
};

export const getAdminUrl = (): string => {
  const adminSubdomain = import.meta.env.VITE_ADMIN_SUBDOMAIN || 'admin';
  const hostname = window.location.hostname;
  const port = window.location.port ? `:${window.location.port}` : '';
  const protocol = window.location.protocol;
  
  // If already on admin subdomain, return current URL
  if (hostname.startsWith(`${adminSubdomain}.`)) {
    return window.location.origin;
  }
  
  // For localhost, add subdomain before localhost
  if (hostname === 'localhost' || hostname.startsWith('localhost')) {
    return `${protocol}//${adminSubdomain}.localhost${port}`;
  }
  
  // For production domains, add subdomain
  const baseDomain = hostname.replace(/^[^.]+\./, ''); // Remove any existing subdomain
  return `${protocol}//${adminSubdomain}.${baseDomain}${port}`;
};
