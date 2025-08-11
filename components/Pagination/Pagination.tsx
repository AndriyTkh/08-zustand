'use client';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1); 
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      onPageChange={handlePageChange}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      pageClassName={styles.page}
      previousClassName={styles.prev}
      nextClassName={styles.next}
      breakClassName={styles.break}
    />
  );
}
