'use client';

import React, { useState, useRef } from 'react';
import DeleteShiftModal, { DeleteShiftModalHandle } from './delete';
import UpdateShift, { UpdateShiftModalHandle } from './update';
import { Shift } from '../page';

const ShiftButton = ({ shift_props }: { shift_props: Shift }) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteModalRef = useRef<DeleteShiftModalHandle>(null);
  const updateModalRef = useRef<UpdateShiftModalHandle>(null);
  const idNumber: number = shift_props.id;
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleDeleteClick = () => {
    setIsOpen(false); // close the dropdown
    deleteModalRef.current?.openModal(); // open the modal
  };

  const handleUpdateClick = () => {
    setIsOpen(false); // close the dropdown
    updateModalRef.current?.openModal(); // open the modal
  };

  return (
    <div tabIndex={0} className='dropdown dropdown-left'>
      <button
        role='button'
        className='btn-square btn-ghost btn-xs m-1'
        onClick={toggleDropdown}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='inline-block h-5 w-5 stroke-current'
        >
          <g transform='rotate(90 12 12)'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
            ></path>
          </g>
        </svg>
      </button>
      <ul
        className={`menu dropdown-content absolute z-[2] w-52 rounded-box bg-base-100 p-2 shadow ${isOpen ? '' : 'hidden'}`}
      >
        <li>
          <button onClick={handleDeleteClick}>Ta bort arbetspass</button>
        </li>
        <li>
          <button onClick={handleUpdateClick}>Uppdatera arbetspass</button>
        </li>
      </ul>
      <DeleteShiftModal ref={deleteModalRef} shiftId={idNumber} />
      <UpdateShift ref={updateModalRef} shift_props={shift_props} />
    </div>
  );
};

export default ShiftButton;
