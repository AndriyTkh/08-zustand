import { Note } from './note';

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};
