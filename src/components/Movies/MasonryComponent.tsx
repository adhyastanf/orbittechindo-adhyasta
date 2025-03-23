'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatImg } from '@/lib/format';
import { useMoviesQuery } from '@/lib/query';
import { useMovieStore } from '@/stores/movies-store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SkeletonMovies from '../Loading/LoadingMovies';

type Movie = {
  id: string;
  title?: string | undefined;
  name?: string | undefined;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

function MovieList() {
  const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } = useMoviesQuery();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <SkeletonMovies count={10} />;
  }

  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>{data?.pages.map((page) => page.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />))}</div>
      {isFetchingNextPage && <SkeletonMovies count={10} />}
      <div ref={ref} className='h-10 bg-transparent'></div>
    </div>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { filters } = useMovieStore();

  const type = filters.type === 'movie' ? 'movie' : 'tv'
  const imagePoster = movie.poster_path || movie.backdrop_path

  const isNullImage = (image : string) => {
    if (!image) {
      return (
        <div className='relative w-full h-full'>
          <div className='flex items-center justify-center h-full bg-gray-800 text-gray-500 text-sm '>No Image</div>
        </div>
      );
    }
  }

  return (
    <Link href={`/${type}/`.concat(movie.id)}>
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className='overflow-hidden bg-gray-900 text-white shadow-md'>
          <CardContent className='p-0 relative w-full h-[400px]'>
            {!isImageLoaded && <Skeleton className='absolute inset-0 w-full h-full rounded-lg' />}
            {!(imagePoster) && isNullImage(imagePoster || '')}
            <Image
              src={formatImg(imagePoster || '')}
              alt={movie.title || movie.name || 'unknown'}
              fill
              objectFit='cover'
              className={`object-cover object-top transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              loading='lazy'
            />
          </CardContent>
          <CardFooter className='p-3 text-sm font-semibold'>{movie.title || movie.name}</CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}

export default MovieList;
