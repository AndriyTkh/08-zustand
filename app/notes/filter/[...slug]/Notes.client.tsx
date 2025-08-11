'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import debounce from 'lodash.debounce';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

import { fetchNotes } from '@/lib/api';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';

import css from './Notes.client.module.css';
import Link from 'next/link';

interface NotesClientProps {
  initialData: FetchNotesResponse;
  searchTag?: string;
}

export default function NotesClient({ initialData, searchTag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedUpdate = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 300),
    []
  );

  useEffect(() => {
    debouncedUpdate(searchText);
    return () => debouncedUpdate.cancel();
  }, [searchText, debouncedUpdate]);

  useEffect(() => {
    setPage(1);
  }, [searchText, searchTag]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', { search: debouncedSearch, page, searchTag }],
    queryFn: () => fetchNotes({ search: debouncedSearch, tag: searchTag, page, perPage: 12 }),
    initialData: page === 1 && debouncedSearch === '' ? initialData : undefined,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => setSearchText(value);
  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <Link href="/notes/action/create" className={css.button}>
          + Create note
        </Link>
        <SearchBox onSearchChange={handleSearchChange} />
        {data?.totalPages != undefined && data.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={handlePageChange} />
        )}
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
}
