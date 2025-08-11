import React, { useState, useRef, useEffect } from 'react';
import css from './TagsMenu.module.css'; // use your given CSS
import Link from 'next/link';

const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Notes
      </button>

      {isOpen && (
        <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem} onClick={() => setIsOpen(false)}>
            <Link
              href={
                tag === 'All'
                  ? '/notes/filter/All'
                  : `/notes/filter/${encodeURIComponent(tag)}`
              }
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
