'use client';

import { useEffect } from 'react';

export default function NotesError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error occured:', error);
  }, [error]);

  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
