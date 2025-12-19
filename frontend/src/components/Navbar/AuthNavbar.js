import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common';
import NavbarItem from '@theme/NavbarItem';
import clsx from 'clsx';

function AuthNavbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const mobileSidebar = useNavbarMobileSidebar();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
    // Refresh the page to update navbar state
    window.location.reload();
  };

  const items = [
    {
      type: 'dropdown',
      label: isAuthenticated ? 'Account' : 'Sign In',
      position: 'right',
      items: isAuthenticated
        ? [
            {
              label: 'Profile',
              to: '/profile',
            },
            {
              label: 'Sign Out',
              onClick: handleSignOut,
            }
          ]
        : [
            {
              label: 'Sign In',
              to: '/signin',
            },
            {
              label: 'Sign Up',
              to: '/signup',
            }
          ]
    }
  ];

  return (
    <>
      {items.map((item, index) => (
        <NavbarItem
          key={index}
          {...item}
          className={item.className}
          mobileSidebar={mobileSidebar}
        />
      ))}
    </>
  );
}

export default AuthNavbar;