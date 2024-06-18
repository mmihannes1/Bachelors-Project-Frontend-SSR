import React, { cache } from 'react';
import AddPerson from './person/create';
import Link from 'next/link';
import Navbar from './navbar/navbar';
import Pagination from './pagination/pagination';
import ShiftButton from './shift/button';
import ModalAddShift from './shift/create';
import PageSize from './pagesize/pagesize';


/**
 *  Main shift interface used to manipulate different shifts
 */
export interface Shift {
  items: any;
  index: [];
  id: number;
  start_time: Date;
  end_time: Date;
  person_id: number;
  comment: string;
  first_name: string;
  last_name: string;
  pages: number;
  links: any;
  total: number;
}


/**
 * Gets shifts from one page with a maximum of size 100.
 * Can also input search string to find specific people. 
 * Will return a json body containing shifts. 
 * @param page 
 * @param size 
 * @param search 
 * @param start
 * @param end
 * @returns res.json()
 */
async function getShifts(page: Number, size: Number, search: String, start: Date, end: Date) {
  const pageNumber = page || 1;
  const pageSize = size || 25;
  const searchString = search || ' ';
  const startDate = start || '2000-01-01T00%3A00%3A00.000Z';
  const endDate = end || '2100-01-01T00%3A00%3A00.000Z';


  const res = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/shift?' +
      'search_string=' + searchString +
      '&start_date=' + startDate +
      '&end_date=' + endDate + 
      '&page=' + pageNumber +
      '&size=' + pageSize,
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
 * Main page function
 * 
 */
export default async function Page(page: any) {
  /**
   * Decides the page size and takes in the search string
   */
  const currentPage = parseInt(page.searchParams.page) || 1;
  const pageSize = parseInt(page.searchParams.pageSize) || 25;
  const searchString = page.searchParams.search || '%20';
  const startDate = page.searchParams.start_date || '2000-01-01T00%3A00%3A00.000Z';
  const endDate = page.searchParams.end_date || '2100-01-01T00%3A00%3A00.000Z';

  /**
   * Gets the shifts from the current page
   */
  const shifts = await getShifts(currentPage, pageSize, searchString, startDate, endDate);
  const url = shifts.links.self;
  const pageNumberRegex = /page=(\d+)/;
  const match = pageNumberRegex.exec(url);
  const pageNumber = match ? parseInt(match[1]) : null;
  const nextPage = pageNumber ? pageNumber + 1 : null;
  const prevPage = pageNumber ? pageNumber - 1 : null;
  /**
   * The returned HTML body.
   */
  return (
    <>
      <title>Kandidatprojekt grupp 06</title>
      <meta
        name="description"
        content="Display all shifts from the API and contains some buttons for user interactions.">
      </meta>
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
          <h1><b>Rapporterad tid</b></h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div style={{ marginRight: '10px' }}>
            <AddPerson />
          </div>
          <ModalAddShift />
        </div>
      </div>
      <Navbar currPage={currentPage} />
      <br></br>
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

            return (
              <tr className='hover' key={shift.id}>
                <td>
                  <Link href={`/person/${shift.person_id}`}>
                    {shift.first_name + ' ' + shift.last_name}
                  </Link>
                </td>
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
                <td>{shift.comment}</td>
                <td>
                  <ShiftButton shift_props={shift} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <footer
        className='footer footer-center bg-base-300 p-3 text-base-content'
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
                prevPage={String(prevPage)}
                currPage={String(currentPage)}
                nextPage={String(nextPage)}
                lastPage={String(shifts.pages)}
                search={String(searchString)}
                pageSizes={String(pageSize)}
              />
            </div>
            <div style={{ marginRight: '10px' }}>
              <PageSize currPage={currentPage} />
            </div>
            Antal träffar: {shifts.total}
          </div>
        </aside>
      </footer>
    </>
  );
}
