import { executeDeploy } from '@/lib/deploy';
import React, { useState } from 'react';


export default function DeployButton({token, repoUrl} :{token: string, repoUrl: string}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    executeDeploy(
      token,
      repoUrl,
      {
        onStart: () => setIsLoading(true),
        onSuccess: () => alert("Sukces! Deploy ruszył."),
        onError: (err) => alert(`Wystąpił błąd: ${err}`),
        onFinal: () => setIsLoading(false)
      }
    );
  };

  return (
    <button onClick={handleClick} disabled={isLoading} className='cursor-pointer underline'>
      {isLoading ? "Running..." : "Run Deploy"}
    </button>
  );
}