'use client';

import { useMovieStore } from '@/stores/movies-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';

export default function Filter() {
  const { filters, setFilters } = useMovieStore();
  const filterList = ['movie', 'series'];
  const minYear = Number(filters.startDate);
  const maxYear = Number(new Date().getFullYear());

  const handleChange = (value: number[]) => {
    setFilters({ ...filters, startDate: String(value[0]) });
  };
  const handleChangeType = (value: string) => {
    setFilters({ ...filters, type: value });
  };

  return (
    <div className='p-6 bg-gray-800 text-white rounded-lg shadow-lg mb-10'>
      <h2 className='text-xl font-semibold mb-4'>Filter Movies & Series</h2>
      
      <div className='mb-6'>
        <h3 className='text-lg font-medium mb-2'>Type</h3>
        <Select defaultValue={filters.type} onValueChange={handleChangeType}>
          <SelectTrigger className='w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2'>
            <SelectValue placeholder='Select type' />
          </SelectTrigger>
          <SelectContent className='bg-gray-700 text-white border border-gray-600 rounded-md'>
            <SelectItem value={filterList[0]}>Movies</SelectItem>
            <SelectItem value={filterList[1]}>Series</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-2'>Release Year</h3>
        <div className='flex justify-between text-sm text-gray-300 mb-2'>
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>
        <Slider defaultValue={[minYear]} min={1980} max={maxYear} step={1} onValueChange={handleChange} className='mb-4' />
      </div>
    </div>
  );
}