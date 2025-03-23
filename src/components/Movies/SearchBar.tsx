'use client';

import { formatImg } from '@/lib/format';
import { useMovieStore } from '@/stores/movies-store';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Skeleton } from '../ui/skeleton';

export default function SearchBar() {
  const { movies, loading, searchQuery, setSearchQuery } = useMovieStore();
  const data = movies?.search?.slice(0, 5) || [];
  const isEmpty = data.length === 0 || data === null;
  const isLoading = loading.search;

  return (
    <div className='relative'>

      <Popover open={!isEmpty}>
        <PopoverTrigger asChild>
          <Input type='text' placeholder='Search movies...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='border rounded-lg p-2 w-full' />
        </PopoverTrigger>
        <PopoverContent className='w-full p-2 bg-white shadow-lg rounded-lg'>
          {isLoading && <Loading />}

          {!isEmpty &&
            !isLoading &&
            data.map((movie) => (
              <div key={movie.id} className='flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-md'>
                <Image src={formatImg(movie.poster_path)} alt={movie.title || movie.name || 'Movie Poster'} width={50} height={75} className='rounded-md' />
                <div>
                  <p className='font-semibold'>{movie.title || movie.name}</p>
                  <p className='text-sm text-gray-500'>{movie.first_air_date || movie.release_date}</p>
                  <p className='text-sm text-gray-500'>⭐ {movie.vote_average}</p>
                </div>
              </div>
            ))}

        </PopoverContent>
      </Popover>
    </div>
  );
}

function Loading() {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-2">
          <Skeleton className="w-[50px] h-[75px] rounded-md" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

