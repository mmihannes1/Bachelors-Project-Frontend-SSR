'use client';

import { createShift } from '../actions';
import { useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Returns a modal with input fields to create a new shift.
 * @returns {JSX.Element}
 */
const AddShift = ({ personId }: { personId: number }) => {
  const router = useRouter();
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [state, formAction] = useFormState(
    async (prevState: void | null, formData: FormData) => {
      const result = await createShift(personId, formData);
      if (result == '200') {
        setModalMessage('Ett nytt pass är skapat');
      } else {
        setModalMessage('Något gick fel. Se över så att starttid är före sluttid och försökt igen.');
      }
    },
    null
  );

  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
    const modal = document.getElementById(
      'shift_modal'
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
            'shift_modal'
          ) as HTMLDialogElement | null;
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
          <form method='dialog'>
            <button className='btn btn-circle btn-sm absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <div className='flex justify-start font-bold'>
            <h3>Efterregistrera arbetspass</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            method='dialog'
            className='mt-10 grid grid-cols-3 gap-4 focus:outline-none'
          >
            <span className='mr-2 p-4 text-base font-medium'>Starttid:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input type='datetime-local' className='grow' name='start_time' />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Sluttid:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input
                type='datetime-local'
                className='grow'
                name='end_time'
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Kommentar:</span>
            <textarea
              className='textarea textarea-bordered col-span-2 p-4'
              placeholder='Fyll i här...'
              name='comment'
            ></textarea>

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

export default AddShift;
