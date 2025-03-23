import CastSlider from '@/components/Detail/Cast/CastSlider';
import HeroDetail from '@/components/Detail/HeroDetail';
import { fetchDetailMovie } from '@/lib/services';
import type { Metadata } from 'next/types';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getMovieDetails(type: string, id: string) {
  try {
    const movie = await fetchDetailMovie(type, id);

    if (!movie) {
      throw new Error('Movie not found');
    }

    return movie;
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: { params: Promise<{ type: string; id: string }> }): Promise<Metadata> {
  const { type, id } = await params;
  const movie = await getMovieDetails(type, id);

  return {
    title: movie?.title || movie?.name || 'Movie Details',
    description: movie?.overview || 'Movie details page',
    openGraph: {
      title: movie?.title || movie?.name,
      description: movie?.overview,
      images: movie?.backdrop_path ? [`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`] : [],
    },
  };
}

async function DetailMovie({ params }: { params: Promise<{ type: string; id: string }> }) {
  const { type, id } = await params;
  const movie = await getMovieDetails(type, id);

  return (
    <div>
      <HeroDetail movie={movie} />
      <div className='p-6 md:p-12 max-w-7xl mx-auto'>
        <h3 className='font-bold text-2xl mb-4'>Top Cast</h3>
        <CastSlider cast={movie.credits.cast} />
      </div>
    </div>
  );
}

export default DetailMovie;
