'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import css from './NoteList.module.css';
import { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onMutate: (id: string) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setDeletingId(null);
    },
    onError: () => {
      setDeletingId(null);
    },
  });

  if (notes.length === 0) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.linkButton} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.deleteButton}
              onClick={() => mutation.mutate(note.id)}
              disabled={deletingId === note.id || mutation.isPending}
            >
              {deletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
