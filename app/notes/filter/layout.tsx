import React from 'react';
import css from './layout.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({children, sidebar}: Props) { 
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.notesWrapper}>{children}</main>
    </div>
  );
}
