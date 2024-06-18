'use client'
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { deletePerson } from '@/app/actions';
import { useRouter } from 'next/navigation';


interface DeletePersonModalProps {
  personId: number;
}
export interface DeleteShiftModalHandle {
  openModal: () => void;
}


const DeletePersonModal: React.FC<DeletePersonModalProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>;
  const router = useRouter();
  return (
    <>
    <button
    className='btn'
    onClick={() => {
      const modal = document.getElementById('delete_person_modal') as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
    }}
  >
    Ta bort person
  </button>
    <dialog id='delete_person_modal' className='modal'>
      <div className='modal-box'>
        <h3 className='text-lg font-bold'>Är du säker?</h3>
        <div className='modal-action'>
          <button className='btn' onClick={() => {
            const modal = document.getElementById('delete_person_modal') as HTMLDialogElement | null;
            if (modal) {
              modal.close();
            }
          }}>
            Avbryt
          </button>
          <button
            className='btn bg-error'
            onClick={() => {
              deletePerson(props.personId);
              const modal = document.getElementById('delete_person_modal') as HTMLDialogElement | null;
              if (modal) {
              modal.close();
              }
              router.push("/");
            }}
          >
            Ta bort
          </button>
        </div>
      </div>
    </dialog>
    </>
  );
};
export default DeletePersonModal;