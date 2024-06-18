'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';


const PageSize = ({ currPage }: { currPage: number }) => {
  const router = useRouter();
  const [pageSize, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    router.push('/?page=' + currPage + '&pageSize=' + selectedValue);
    router.refresh();
  };

  return (
    <>
      <select
        className='select select-bordered w-full max-w-xs'
        onChange={handleSelectChange}
      >
        <option disabled selected>
          Antal per sida
        </option>
        <option value='25'>25</option>
        <option value='50'>50</option>
        <option value='75'>75</option>
        <option value='100'>100</option>
      </select>
    </>
  );
};

export default PageSize;
