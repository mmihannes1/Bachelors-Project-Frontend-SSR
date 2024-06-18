'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PaginationProps {
  person: Number;
  prevPage: String;
  currPage: String;
  nextPage: String;
  lastPage: String;
}

export default function Pagination({
  person,
  prevPage,
  currPage,
  nextPage,
  lastPage,
}: PaginationProps) {
  const router = useRouter();

  const sendFirst = () => {
    if (currPage === '1') return;
    router.push('/person/' + person + 'page1');
  };

  const sendNext = () => {
    if (currPage === lastPage) return;
    router.push('/person/' + person + 'page' + nextPage);
  };

  const sendPrev = () => {
    if (currPage === '1') return;
    router.push('/person/' + person + 'page' + prevPage);
  };

  const sendLast = () => {
    if (currPage === lastPage) return;
    router.push('/person/' + person + 'page' + lastPage);
  };

  return (
    <div>
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
    </div>
  );
}
