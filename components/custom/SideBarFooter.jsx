'use client';
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '@/context/UserDetailContext';

function SideBarFooter() {
  const router = useRouter();
  const {userDetail, setUserDetail} = useContext(UserDetailContext)
  const options = [
    {
      name: 'Settings',
      icon: Settings,
    },
    {
      name: 'Help Center',
      icon: HelpCircle,
    },
    {
      name: 'My Subscription',
      icon: Wallet,
      path: '/pricing',
    },
    {
      name: 'Sign Out',
      icon: LogOut,
    },
  ];
  const onOptionClock = (option) => {
    if (option.path) {
      router.push(option.path);
    }else if(option.name === 'Sign Out'){
      console.log(`${option.name}: Sign Out`);
      localStorage.removeItem('user');
      router.push('/');
      setUserDetail({})
      window.location.reload();
    } else {
      console.log(`${option.name} clicked (no path)`);
    }
  };
  

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClock(option)}
          key={index}
          variant="ghost"
          className="w-full flex justify-start my-3"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
