'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Navbar = ({ currPage }: { currPage: number }) => {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const search = () => {
    router.push('/?search=' + searchString);
    router.refresh();
  };

  const filter = () => {
    let queryParams = '/?';
    if (searchString) {
      queryParams += 'search=' + searchString;
    }
    if (startDate) {
      queryParams += '&start_date=' + startDate;
    }
    if (endDate) {
      queryParams += '&end_date=' + endDate;
    }
    router.push(queryParams);
    router.refresh();
    router.refresh()
  }

  const reset = () => {
    setSearchString('');
    setStartDate('');
    setEndDate('');
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <div className='navbar bg-blue-600 text-primary-content'>
        <div className='flex-none'>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Sök personal...'
              className='flex-1 rounded-l border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
              value={searchString}
              onChange={handleSearchStringChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            type='submit'
            onClick={search}
          >
            Sök
          </button>
        </div>
        <div className='flex-auto'></div>
        <div className="space-x-4">
          <p>Starttid </p>
          <div className='form-control'>
            <input
              type='date'
              className='flex-1 rounded-l border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <p>Sluttid </p>
          <div className='form-control'>
            <input
              type='date'
              className='flex-1 rounded-l border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            type='submit'
            onClick={filter}
          >
            Filtrera
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type='submit'
            onClick={reset}
          >
            Återställ
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

