'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/context/UserDetailContext';

function SideBarFooter() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const isUserLoggedIn = userDetail && Object.keys(userDetail).length > 0;

  const options = [
    ...(isUserLoggedIn
      ? [
          {
            name: 'Settings',
            icon: Settings,
          },
        ]
      : []),
    {
      name: 'Help Center',
      icon: HelpCircle,
    },
    // Only include Pricing if user is logged in
    ...(isUserLoggedIn
      ? [
          {
            name: 'My Subscription',
            icon: Wallet,
            path: '/pricing',
          },
        ]
      : []),
    // Only include Sign Out if user is logged in
    ...(isUserLoggedIn
      ? [
          {
            name: 'Sign Out',
            icon: LogOut,
          },
        ]
      : []),
  ];

  const onOptionClick = (option) => {
    if (option.path) {
      router.push(option.path);
    } else if (option.name === 'Sign Out') {
      console.log(`${option.name}: Sign Out`);
      localStorage.removeItem('user');
      setUserDetail({});
      router.push('/');
      window.location.reload();
    } else {
      console.log(`${option.name} clicked (no path)`);
    }
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start my-3"
        >
          <option.icon className="mr-2 h-4 w-4" />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
