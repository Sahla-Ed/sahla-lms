'use client';

import { useState, useEffect } from 'react';

interface TenantLogo {
  logo: string;
  logoDark: string | null;
}

export function useTenantLogo() {
  const [tenantLogo, setTenantLogo] = useState<TenantLogo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenantLogo = async () => {
      try {
        // Get the current subdomain from the hostname
        const hostname = window.location.hostname;
        let subdomain = null;

        // Local development
        if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
          if (hostname.includes('.localhost')) {
            subdomain = hostname.split('.')[0];
          }
        } else {
          // Production subdomain extraction
          const parts = hostname.split('.');
          if (parts.length > 2) {
            subdomain = parts[0];
          }
        }

        if (!subdomain) {
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/tenant-settings?slug=${subdomain}`);

        if (response.ok) {
          const data = await response.json();
          setTenantLogo({
            logo: data.logo,
            logoDark: data.logoDark,
          });
        }
      } catch (error) {
        console.error('Failed to fetch tenant logo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantLogo();
  }, []);

  return { tenantLogo, loading };
}
