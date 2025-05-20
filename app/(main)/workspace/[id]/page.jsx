'use client';
import ChatView from '@/components/custom/ChatView';
import CodeView from '@/components/custom/CodeView';
import React, { useContext, useEffect } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';

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
  return <div>Loading...</div>;
}


  return (
    <div className="p-3 pr-10 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ChatView />
        <div className="col-span-2">
          <CodeView />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
