import { fetchMovies } from '@/lib/services';
import { useMovieStore } from '@/stores/movies-store';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useMoviesQuery = () => {
    const { filters } = useMovieStore();
  return useInfiniteQuery({
    queryKey: [filters],
    queryFn: ({ pageParam = 1 }) => fetchMovies({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });
};
