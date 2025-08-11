'use client';

import { useEffect } from 'react';

export default function NotesError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Error occured:', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong while loading notes.</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
