'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from "@/components/NoteDetails.client/NoteDetails.module.css"

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data:     note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading note...</p>}
      {error && <p>Failed to load note.</p>}
      {!note && <p>Failed to load note.</p>}
      {note && (
        <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
        </div>
      )}
    </Modal>
  );

}
