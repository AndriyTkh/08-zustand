'use client';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  // Закриття при натисканні Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
}
