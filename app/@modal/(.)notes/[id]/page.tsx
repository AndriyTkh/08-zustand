import { fetchNoteById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreview from './NotePreview.client';

interface NotePreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: NotePreviewPageProps) {
  const queryClient = new QueryClient();
  const id = (await params).id;
  await params;

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}
