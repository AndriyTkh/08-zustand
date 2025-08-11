import Link from 'next/link';
import css from './SidebarNotes.module.css';
const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function Sidebar() {
  return (<ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${encodeURIComponent(tag)}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>)
}
