'use client';

import { createPerson } from '../actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import { useRef, useState } from 'react';

/**
 * Returns a modal with input fields to create a new person.
 * @returns {JSX.Element}
 */
const AddPerson = () => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [state, formAction] = useFormState(
    async (prevState: void | null, formData: FormData) => {
      const result = await createPerson(prevState, formData);
      if (result == '200') {
        setModalMessage(formData.get('first_name') + ' är nu registrerad');
      } else {
        setModalMessage(
          'Något gick snett. Se över stavningen och försök igen.'
        );
      }
    },
    null
  );
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
    const modal = document.getElementById(
      'person_modal'
    ) as HTMLDialogElement | null;
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
          const modal = document.getElementById(
            'person_modal'
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        Registrera ny person
      </button>
      <br></br>
      <dialog id='person_modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-circle btn-sm absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <div className='flex justify-start font-bold'>
            <h3>Registrera ny person</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            method='dialog'
            className='mt-10 grid grid-cols-3 gap-4 focus:outline-none'
          >
            <span className='mr-2 p-4 text-base font-medium'>Förnamn:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input
                type='text'
                name='first_name'
                className='grow'
                placeholder='Förnamn'
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Efternamn:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input
                type='text'
                name='last_name'
                className='grow'
                placeholder='Efternamn'
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Arbetsroll:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input
                type='text'
                name='job_role'
                className='grow'
                placeholder='Arbetsroll'
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Födelsedag:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input type='date' name='birthday' className='grow' required />
            </label>

            <div className='modal-action col-span-2 col-start-2 mt-4'>
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

export default AddPerson;
