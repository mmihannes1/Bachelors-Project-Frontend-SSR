'use client';

import { updatePerson } from '../../actions';
import { useFormState } from 'react-dom';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Person } from './page';

const UpdatePerson = (myPerson: Person) => {
  const [state, formAction] = useFormState(
    (prevState: void | null, formData: FormData) =>
      updatePerson(myPerson.id, formData),
    null
  );

  const birth_date: Date | null = myPerson.birthdate;
  let birth_date_string = 'Födelsedatum saknas';
  if (birth_date != null) {
    birth_date_string = birth_date.toDateString();
  }

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
    }
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
        Uppdatera person
      </button>
      <br></br>
      <dialog id='person_modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
              ✕
            </button>
          </form>
          <h3 className='text-lg font-bold'>Uppdatera person</h3>

          <br></br>

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
                defaultValue={myPerson.first_name}
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Efternamn:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input
                type='text'
                name='last_name'
                className='grow'
                defaultValue={myPerson.last_name}
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Arbetsroll:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input
                type='text'
                name='job_role'
                className='grow'
                defaultValue={myPerson.job_role}
                required
              />
            </label>

            <span className='mr-2 p-4 text-base font-medium'>Födelsedag:</span>
            <label className='input input-bordered col-span-2 flex items-center p-4'>
              <input 
              type='date' 
              name='birthday'
              className='grow'
              defaultValue={birth_date_string} 
              required />
            </label>

            <div className='modal-action col-span-2 col-start-2 mt-4'>
            <button
              className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'
              type='submit'
            >
              Uppdatera
            </button>

            </div>
          </form>
        </div>
      </dialog>
    </>

  );
};

export default UpdatePerson;
