import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; 
  const filterName = slug.join(" / ");
  const pageTitle = `Notes filtered by: ${filterName} – NoteHub`;
  const pageDescription = `Viewing notes filtered by: ${filterName}.`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://08-zustand-xi-dun.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview image",
        },
      ],
    },
  };
}


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
