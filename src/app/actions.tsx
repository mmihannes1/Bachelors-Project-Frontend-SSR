'use server';
import { PersonSearch } from "./shift/searchbox";
/**
 * Sends a POST request to the backend to POST a new person
 * @param id
 * @param formData
 */
export async function createPerson(prevState: any, formData: FormData) {
  const response = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/person',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  return JSON.parse(response.status.toString());
}

/**
 * Sends DELETE request to the backend to DELETE a shift.
 * @param prevstate
 * @param formData
 */
export async function deleteShift(shift_id: Number) {
  const response = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/shift/' + shift_id,
    {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    }
  );
  
}


export async function deletePerson(person_id: Number) {
  const response = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/person/' + person_id,
    {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
      },
      cache: 'no-cache',
    }
  );
  return JSON.parse(response.status.toString());
}

/**
 * Sends CREATE request to the backend to CREATE a shift.
 * @param prevState
 * @param formData
 */
export async function createShift(id: any, formData: FormData) {
/**
 * Sends a POST request to the backend to POST a new shift.
   */
  formData.set('person_id', '' + id);
  const response = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/shift',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  return JSON.parse(response.status.toString());
}

/**
 * Sends PUT request to the backend to modify a person.
 * @param id
 * @param formData
 */
export async function updatePerson(id: Number, formData: FormData) {
  const response = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/person/' + id,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  return JSON.parse(response.status.toString());
}

export async function updateShift(id: Number, formData: FormData) {
  const response = await fetch(
    'https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/shift/' + id,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        access_token: `${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );
  return JSON.parse(response.status.toString());
}

interface Person {
  id: number;
  first_name: string;
  last_name: string;
}

export async function getSearchName(inputValue:string) {
  const response = await fetch('https://kandidat-vt24-backend-4cfb4d7feed9.herokuapp.com/person?search_string=' + inputValue + '&page=1&size=100', {
    headers: {
      accept: 'application/json',
      access_token: `${process.env.API_KEY}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.items)) {
    throw new Error('Error: Not array');
  }

  const personImportantData: PersonSearch[] = data.items.map((person: Person) => ({
    value: person.id.toString(),
    name: `${person.first_name} ${person.last_name}`,
  }));

  return personImportantData;

}