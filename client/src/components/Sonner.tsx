import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong!"); 
    } else {
      toast.success("Everything looks good!"); 
    }
  }, [isError]);

  return (
    <div>
      <button onClick={() => setIsError(true)}>Trigger Error</button>
      <button onClick={() => setIsError(false)}>Clear Error</button>
    </div>
  );
}

