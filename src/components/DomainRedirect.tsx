import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMarketingDomain, isAppDomain, getMarketingUrl, getAppUrl, isLocalhost, isLovableDomain } from '@/lib/subdomain';

// Routes that belong to the marketing site (cliptoclick.com)
const MARKETING_ROUTES = ['/', '/checkout', '/thanks', '/terms', '/privacy', '/refund-policy'];

// Routes that belong to the app (cliptoclick.app)
const APP_ROUTES = ['/auth', '/onboarding', '/dashboard', '/analytics', '/offers', '/payouts', '/campaigns', '/trust', '/ops/queue', '/curso', '/admin', '/reset-password', '/access-denied'];

export const DomainRedirect = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip redirects on localhost and Lovable preview domains
    if (isLocalhost() || isLovableDomain()) {
      return;
    }

    const currentPath = location.pathname;
    const isOnMarketingDomain = isMarketingDomain();
    const isOnAppDomain = isAppDomain();

    // On marketing domain but trying to access app routes
    if (isOnMarketingDomain) {
      const isAppRoute = APP_ROUTES.some(route => 
        currentPath === route || currentPath.startsWith(`${route}/`)
      );
      
      if (isAppRoute) {
        window.location.href = getAppUrl(currentPath);
        return;
      }
    }

    // On app domain but trying to access marketing routes
    if (isOnAppDomain) {
      const isMarketingRoute = MARKETING_ROUTES.includes(currentPath);
      
      if (isMarketingRoute && currentPath === '/') {
        // On app domain, "/" should go to dashboard
        navigate('/dashboard');
        return;
      }
      
      if (isMarketingRoute) {
        window.location.href = getMarketingUrl(currentPath);
        return;
      }
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

export default DomainRedirect;
