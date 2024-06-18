'use client';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <div className='navbar bg-blue-600 text-primary-content'>
        <div className='flex-none gap-2'>
          <div className='form-control'></div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r rounded-l" onClick={handleBack}>
            Tillbaka
          </button>
        </div>

        {/**<div className='flex-auto'></div>
        <div className='form-control'>
          <input
            type='date'
            placeholder='Starttid...'
            className='input input-bordered w-24 md:w-auto'
        />
        </div>
        <div className='form-control'>
          <input
            type='date'
            placeholder='Sluttid...'
            className='input input-bordered w-24 md:w-auto'
          />
        </div>
        <button className='btn' type='submit'>
          Filtrera
        </button>
      */}
      </div>
    </>
  );
};

export default Navbar;
