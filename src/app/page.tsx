import Filter from '@/components/Movies/Filter';
import MovieList from '@/components/Movies/MasonryComponent';
import MovieCarousel from '@/components/Movies/MovieCarousel';
import { fetchTrending } from '@/lib/services';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const dataCarousel = await fetchTrending();

  return (
    <main>
      <MovieCarousel data={dataCarousel} />
      <div className='p-6 md:p-12 max-w-7xl mx-auto'>
        <Filter />
        <MovieList />
      </div>
    </main>
  );
}
