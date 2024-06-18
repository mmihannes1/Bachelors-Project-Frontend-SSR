// DeleteShiftModal.tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { deleteShift } from '../actions';
import { useRouter } from 'next/navigation';

interface DeleteShiftModalProps {
  shiftId: number;
}
export interface DeleteShiftModalHandle {
  openModal: () => void;
}
const DeleteShiftModal = forwardRef<DeleteShiftModalHandle,DeleteShiftModalProps>((props, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    openModal() {
      dialogRef.current?.showModal();
    },
  }));

  return (
    <dialog id='delete_shift_modal' className='modal' ref={dialogRef}>
      <div className='modal-box'>
        <h3 className='text-lg font-bold'>Är du säker?</h3>
        <div className='modal-action'>
          <button className='btn' onClick={() => dialogRef.current?.close()}>
            Avbryt
          </button>
          <button
            className='btn bg-error'
            onClick={() => {
              deleteShift(props.shiftId);
              dialogRef.current?.close();
              router.refresh();
            }}
          >
            Ta bort
          </button>
        </div>
      </div>
    </dialog>
  );
});
DeleteShiftModal.displayName = 'DeleteShiftModal';
export default DeleteShiftModal;
