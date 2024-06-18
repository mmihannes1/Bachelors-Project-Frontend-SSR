'use client'
import React, { useState } from 'react';
import { getSearchName } from '../actions';
// Define the types for the person as they are expected from your backend


// Define the shape of each search option in the dropdown
export interface PersonSearch {
  value: string;
  name: string;
}

// Define the props for the SearchBox component
interface SearchBoxProps {
  onSelect: (value: string, name: string) => void;
}


const SearchBox: React.FC<SearchBoxProps> = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<PersonSearch[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelected = (value: string, name: string) => {
    onSelect(value, name);
    setShowOptions(false);
    setInputValue(name); 
  };

  const search = async () => {
    const personImportantData : PersonSearch[] = await getSearchName(inputValue);
    setOptions(personImportantData);
    setShowOptions(true); 
  };

  return (
    <div className='grid grid-cols-3 focus:outline-none'>
      <div className='col-span-2 flex items-center' style={{ marginLeft: '-14px' }}>
      <input
        type='text'
        placeholder='Sök personal'
        className='flex-1 rounded-l border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r" onClick={search}>
        Sök
      </button>
    </div>
      {showOptions && (
        <ul className='absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-auto bg-stone-200 shadow-md'>
          {options.map((option) => (
            <li
              key={option.value}
              className='cursor-pointer p-2 hover:bg-stone-400'
              onMouseDown={() => handleSelected(option.value, option.name)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;