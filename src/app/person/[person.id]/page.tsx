import React from 'react';
import UpdatePerson from './update';
import AddShift from '@/app/shift/create_person_shift';
import { Shift } from '@/app/page';
import ShiftButton from '@/app/shift/button';
import Pagination from './pagination';
import Navbar from '@/app/navbar/personNavbar';
import DeletePersonModal from './delete';

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  job_role: string;
  birthdate: Date;
}

/**
 * Sends
 * @param id
 * @returns
 */
async function getPerson(id: number) {
  const res = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/person/' + id,
    {
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/**
 * Fetche the person from the backend using the person id.
 *
 * @param id
 * @param page
 * @param size
 * @returns
 */
async function getShiftsFromId(id: number, page: number, size: number) {
  const pageNumber = page || 1;
  const pageSize = size || 25;
  const headers = new Headers();
  headers.set('accept', 'application/json');
  headers.set('access_token', process.env.API_KEY || '');

  const res = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/person/' +
      id +
      '/shift?page=' +
      pageNumber +
      '&size=' +
      pageSize,
    {
      headers: headers,
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

/**
 * Page function that returns the person page.
 * Displays the person's name, job role, birth date, shifts and a button to register a new shift.
 * @param param0
 * @returns
 */
export default async function Page({
  params,
}: {
  params: { 'person.id': string };
}) {
  const pageNumberMatch =
    params['person.id'] && params['person.id'].match(/\d+page(\d+)/);
  const pageNum = pageNumberMatch ? parseInt(pageNumberMatch[1], 10) || 1 : 1;


  /**
   * Fetch the person and shifts from the backend.
   */
  const personId = params['person.id'];
  const personIdNumber = parseInt(personId, 10);
  const myPerson: Person = await getPerson(personIdNumber);
  const shifts: Shift = await getShiftsFromId(personIdNumber, pageNum, 25);

  /**
   * Extract the page number from the URL.
   */
  const url = shifts.links.self;
  const pageNumberRegex = /page=(\d+)/;
  const match = pageNumberRegex.exec(url);
  const pageNumber = match ? parseInt(match[1]) : null;
  const nextPage = pageNumber ? pageNumber + 1 : null;
  const prevPage = pageNumber ? pageNumber - 1 : null;

  return (
    <>
      <div>
        <div
          className='form-line'
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
          }}
        >
          <div>
            <h1><b>Namn:</b> {myPerson.first_name + ' ' + myPerson.last_name}</h1>
            <p><b>Arbetsroll:</b> {myPerson.job_role} </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: '10px' }}>
              <AddShift personId={personIdNumber} />
            </div>
            <UpdatePerson
              id={personIdNumber}
              first_name={myPerson.first_name}
              last_name={myPerson.last_name}
              job_role={myPerson.job_role}
              birthdate={myPerson.birthdate}
            />
             <div style={{ marginLeft: '10px' }}>
             <DeletePersonModal personId={myPerson.id}/>
             </div>
            
          </div>
        </div>
        <Navbar />
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Starttid</th>
              <th>Sluttid</th>
              <th>Kommentar</th>
            </tr>
          </thead>
          <tbody>
            {shifts.items.map(async (shift: Shift) => {
              const startDate: Date = new Date(shift.start_time);
              const endDate: Date = new Date(shift.end_time);
              const shifttString: string | null = shift.comment;
              const commentString: string = shifttString ?? ' ';

              return (
                <tr className='hover' key={shift.id}>
                  <td>{shift.first_name + ' ' + shift.last_name}</td>
                  <td>
                    {startDate.toLocaleDateString() +
                      ' ' +
                      startDate.toLocaleTimeString([], { timeStyle: 'short' })}
                  </td>
                  <td>
                    {endDate.toLocaleDateString() +
                      ' ' +
                      endDate.toLocaleTimeString([], { timeStyle: 'short' })}
                  </td>
                  <td>{commentString}</td>
                  <td>
                    <ShiftButton shift_props={shift} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <footer
        className='footer footer-center bg-base-300 p-4 text-base-content'
        style={{ position: 'fixed', bottom: 0 }}
      >
        <aside>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: '10px' }}>
            <Pagination
              person={personIdNumber}
              prevPage={String(prevPage)}
              currPage={String(pageNumber)}
              nextPage={String(nextPage)}
              lastPage={String(shifts.pages)}
            />
          </div>
          <div style={{ marginRight: '10px' }}>
            Antal träffar: {shifts.total}
          </div>
        </div>
        </aside>
      </footer>
    </>
  );
}
