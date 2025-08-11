import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params; 

  const tag = slug[0] === 'All' ? undefined : slug[0];

  const initialData: FetchNotesResponse = await fetchNotes({
    page: 1,
    search: "",
    tag: tag,
    perPage: 12,
  });

  return <NotesClient initialData={initialData} searchTag={tag} />;
}
