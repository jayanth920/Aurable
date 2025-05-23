'use client';
import ChatView from '@/components/custom/ChatView';
import CodeViewWrapper from '@/components/custom/CodeView';
import React, { useContext, useEffect } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/ui/loader';


function Workspace() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

useEffect(() => {
  if (userDetail === null) return;
  if (!userDetail || Object.keys(userDetail).length === 0) {
    router.push('/');
  }
}, [userDetail, router]);

if (userDetail === null) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader variant="circular" />
    </div>
  );
}


  return (
    <div className="p-3 pr-10 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ChatView />
        <div className="col-span-2">
          <CodeViewWrapper />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
