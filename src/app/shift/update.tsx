'use client';

import { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { updateShift } from '../actions';
import { Shift } from '../page';

interface UpdateShiftModalProps {
  shift_props: Shift;
}


export interface UpdateShiftModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

const UpdateShift = forwardRef<UpdateShiftModalHandle, UpdateShiftModalProps>(
  (props, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [state, formAction] = useFormState(
      async (prevState: void | null, formData: FormData) => {
        const result = await updateShift(props.shift_props.id, formData);
        if (result == '200') {
          setModalMessage('Arbetspasset är uppdaterat');
        } else {
          setModalMessage(
            'Något gick fel. Se över så att starttid är före sluttid och försökt igen.'
          );
        }
      },
      null
    );
    const person_id: number = props.shift_props.person_id;
    const padZero = (num: number): string => num.toString().padStart(2, '0');

    const start_date : Date = new Date(props.shift_props.start_time);
    const end_date : Date = new Date(props.shift_props.end_time);

    const start_time_string : string = `${start_date.getFullYear()}-${padZero(start_date.getMonth() + 1)}-${padZero(start_date.getDate())}T${padZero(start_date.getHours())}:${padZero(start_date.getMinutes())}`;
    const end_time_string : string = `${end_date.getFullYear()}-${padZero(end_date.getMonth() + 1)}-${padZero(end_date.getDate())}T${padZero(end_date.getHours())}:${padZero(end_date.getMinutes())}`;


    useImperativeHandle(ref, () => ({
      openModal() {
        dialogRef.current?.showModal();
      },
      closeModal() {
        dialogRef.current?.close();
      },
    }));
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formData.append('person_id', person_id.toString());
      formAction(formData);
      const modal = document.getElementById(
        'shift_modal'
      ) as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
      dialogRef.current?.close();
      //router.refresh();
    };

    const handleModalClose = () => {
      setModalMessage(null);
      router.refresh();
    };

    return (
      <>
        <dialog id='shift_modal_update' className='modal' ref={dialogRef}>
          <div className='modal-box'>
            <form method='dialog'>
              <button
                className='btn btn-circle btn-sm absolute right-2 top-2'
                onClick={() => dialogRef.current?.close()}
              >
                ✕
              </button>
            </form>
            <div className='flex justify-start font-bold'>
              <h3>Uppdatera arbetspass</h3>
            </div>

            <form
              onSubmit={handleSubmit}
              method='dialog'
              className='mt-10 grid grid-cols-3 gap-4 focus:outline-none'
            >
              <span className='mr-2 p-4 text-base font-medium'>Starttid:</span>
              <label className='input input-bordered col-span-2 flex items-center p-4'>
                <input
              type='datetime-local'
              className='grow'
              name='start_time'
              defaultValue={start_time_string}
              required
              />
              </label>

              <span className='mr-2 p-4 text-base font-medium'>Sluttid:</span>
              <label className='input input-bordered col-span-2 flex items-center p-4'>
                <input
                  type='datetime-local'
                  className='grow'
                  name='end_time'
                  defaultValue={end_time_string}
                  required
                />
              </label>

              <span className='mr-2 p-4 text-base font-medium'>Kommentar:</span>
              <textarea
                className='textarea textarea-bordered col-span-2 p-4'
                placeholder='Fyll i här...'
                name='comment'
                defaultValue={props.shift_props.comment}
              ></textarea>

              <div className='modal-action col-span-2 col-start-2 mt-4'>
                <button className='btn' type='submit'>
                  Uppdatera
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
  }
);
UpdateShift.displayName = 'UpdateShift';
export default UpdateShift;
