'use client';
import React, { useState } from 'react';
import SearchBox from './searchbox';
import { createShift } from '../actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

const ModalAddShift: React.FC = () => {
  const router = useRouter();
  const [id, setSelectedPersonID] = useState<string>('');
  const [name, setSelectedPersonName] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const resetState = () => {
    setSelectedPersonID('');
    setSelectedPersonName('');
  };

  const handleSelectPerson = (value: string) => {
    if (value) {
      setSelectedPersonID(value);
    }
  };

  let person_id = parseInt(id, 10);
  const [state, formAction] = useFormState(
    async (prevState: void | null, formData: FormData) => {
      const result = await createShift(person_id, formData);
      if (result == '200') {
        setModalMessage('Ett nytt pass är skapat');
      } else {
        setModalMessage('Arbetspasset kunde ej skapas. Se över så att starttid är före sluttid och försökt igen.');
      }
    },
    null
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('person_id', person_id.toString());
    formAction(formData);
    const modal = document.getElementById('shift_modal') as HTMLDialogElement | null;
    if (modal) {
      modal.close();
      router.refresh();
    }
    router.refresh();
  };

  const handleModalClose = () => {
    setModalMessage(null);
    router.refresh();
  };

  return (
    <>
      <button
        className='btn'
        onClick={() => {
          const modal = document.getElementById('shift_modal') as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        Efterregistrera arbetspass
      </button>
      <br></br>
      <dialog id='shift_modal' className='modal'>
        <div className='modal-box'>
          <button className='btn btn-circle btn-sm absolute right-2 top-2' onClick={() => {
            const modal = document.getElementById('shift_modal') as HTMLDialogElement | null;
            if (modal) {
              modal.close();
            }
          }}>
            ✕
          </button>
          <div className='flex justify-start font-bold'>
            <h3>Efterregistrera arbetspass</h3>
          </div>
          <div className='grid grid-cols-3 gap-4 focus:outline-none'>
            <span className='p-4 text-base font-medium'>
              Välj personal:
            </span>
            <div className='p-4'>
              <SearchBox onSelect={handleSelectPerson} />
            </div>
          </div>

          <form onSubmit={handleSubmit} method='dialog' className='grid grid-cols-3 gap-4 focus:outline-none'>
            <span className='mr-2 p-4 text-base font-medium'>Starttid:</span>
            <label className='input input-bordered col-span-2 flex items-center'>
              <input 
              type='datetime-local' 
              className='grow' 
              name='start_time'
              required 
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Sluttid:</span>
            <label className='input input-bordered col-span-2 flex items-center'>
              <input
                type='datetime-local'
                className='grow'
                name='end_time'
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Kommentar:</span>
            <textarea
              className='textarea textarea-bordered col-span-2'
              placeholder='Fyll i här...'
              name='comment'
            ></textarea>
            
            <div className='modal-action col-span-3'>
              <button className='btn' type='submit'>
                Skapa
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {modalMessage && (
        <dialog id='alert_modal' className='modal' open>
          <div className='modal-box'>
            <div className='flex justify-start font-bold'>
              <h3>Meddelande</h3>
            </div>
            <div className='p-4'>
              <p>{modalMessage}</p>
            </div>
            <div className='modal-action'>
              <button className='btn' onClick={handleModalClose}>
                OK
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ModalAddShift;
