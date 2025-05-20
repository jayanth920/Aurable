'use client';
import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react';
import React, { useContext, useEffect, useState } from 'react';

function SandpackPreviewClient() {
  const { sandpack } = useSandpack();
  const { action } = useContext(ActionContext);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const client = sandpack?.clients?.[sandpack.activeFile];
      const status = client?.status;

      if (!client || status !== 'running' || hasOpened) return;

      client.getCodeSandboxURL().then((result) => {
        if (action?.actionType === 'deploy') {
          window.open(`https://${result.sandboxId}.csb.app/`, '_blank');
        } else if (action?.actionType === 'export') {
          window.open(result.editorUrl, '_blank');
        }

        setHasOpened(true); // prevent re-opening
      });

      clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [sandpack.clients, sandpack.activeFile, action, hasOpened]);

  return (
    <SandpackPreview
      showNavigator={true}
      style={{ height: '80vh' }}
    />
  );
}

export default SandpackPreviewClient;
