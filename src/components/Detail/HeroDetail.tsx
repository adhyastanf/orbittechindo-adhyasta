import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatImg } from '@/lib/format';
import RatingChart from './DataVisualization/RatingChart';

interface Movie {
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
}

interface HeroProps {
  movie: Movie;
}

export default function HeroDetail({ movie }: HeroProps) {
  return (
    <section className='relative w-full text-white h-[800px]'>
      <HeroBackground backdrop_path={movie.backdrop_path} title={movie.title || movie.name || 'Unknown Title'} />
      <div className='relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 p-6 md:p-12 max-w-7xl mx-auto'>
        <MoviePoster poster_path={movie.poster_path} title={movie.title || movie.name || 'Unknown Title'} />
        <MovieDetails movie={movie} />
      </div>
    </section>
  );
}

function HeroBackground({ backdrop_path, title }: { backdrop_path?: string; title: string }) {
  return (
    <div className='absolute inset-0'>
      {backdrop_path ? (
        <Image src={formatImg(backdrop_path)} alt={title} fill className='object-cover brightness-50 object-top' priority />
      ) : (
        <div className='w-full h-full bg-gray-800 flex items-center justify-center text-white text-lg'>No Image Available</div>
      )}
    </div>
  );
}

function MoviePoster({ poster_path, title }: { poster_path?: string; title: string }) {
  return (
    <Card className='w-[180px] md:w-[220px] lg:w-[250px] overflow-hidden shadow-lg'>
      <CardContent className='p-0'>
        {poster_path ? (
          <Image src={formatImg(poster_path)} priority alt={title} width={250} height={375} className='object-cover rounded-lg' />
        ) : (
          <div className='w-[250px] h-[375px] bg-gray-700 flex items-center justify-center text-white text-sm'>No Poster</div>
        )}
      </CardContent>
    </Card>
  );
}

function MovieDetails({ movie }: { movie: Movie }) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'Unknown';

  return (
    <div className='flex-1 flex flex-col max-w-3xl'>
      <div className='flex gap-4 items-center'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>{movie.title || movie.name || 'Unknown Title'}</h1>
        <p className='text-xl md:text-2xl lg:text-3xl text-gray-300'>( {releaseYear} )</p>
      </div>

      <div className='mt-6 w-[350px]'>
        <RatingChart vote_average={movie.vote_average} vote_count={movie.vote_count} />
      </div>

      <div className='mt-4'>
        <p className='text-gray-400 font-semibold'>Overview</p>
        <p className='text-gray-200 text-sm md:text-base leading-relaxed'>{movie.overview || 'No overview available.'}</p>
      </div>

      <div className='flex flex-wrap gap-2 mt-4'>
        {movie.genres?.length ? (
          movie.genres.map((genre) => (
            <Badge key={genre.id} className='bg-red-500 text-xs md:text-sm px-3 py-1'>
              {genre.name}
            </Badge>
          ))
        ) : (
          <p className='text-gray-400 text-sm'>No genres available.</p>
        )}
      </div>
    </div>
  );
}
