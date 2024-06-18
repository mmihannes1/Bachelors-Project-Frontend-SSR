'use client';

import { useRouter } from 'next/navigation';


interface PaginationProps {
  prevPage: string | null;
  currPage: string;
  nextPage: string | null;
  lastPage: string;
  search: string;
  pageSizes: string;
}

const Pagination = ({
  prevPage,
  currPage,
  nextPage,
  lastPage,
  search,
  pageSizes,
}: PaginationProps) => {
  const router = useRouter();

  const sendFirst = () => {
    if (currPage === '1') return;
    router.push('/?page=1&pageSize=' + pageSizes + '&search=' + search);
  };

  const sendNext = () => {
    if (currPage === lastPage) return;
    router.push('/?page=' + nextPage + '&pageSize=' + pageSizes + '&search=' + search);
  };

  const sendPrev = () => {
    if (prevPage === '0') return;
    router.push('/?page=' + prevPage + '&pageSize=' + pageSizes + '&search=' + search);
  };

  const sendLast = () => {
    if (currPage === lastPage) return;
    router.push('/?page=' + lastPage + '&pageSize=' + pageSizes + '&search=' + search);
    router.refresh();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div className='join' style={{ marginRight: '10px' }}>
        <button className='btn join-item' onClick={sendFirst}>
          1
        </button>
        <button className='btn join-item' onClick={sendPrev}>
          Föregående
        </button>
        <button className='btn btn-disabled join-item'>{currPage}</button>
        <button className='btn join-item' onClick={sendNext}>
          Nästa
        </button>
        <button className='btn join-item' onClick={sendLast}>
          {lastPage}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
